<template>
  <div
    style="width: 90%; margin: 0 auto"
    class="q-pa-sm overflow-auto"
    v-if="otherPersons?.length > 0"
  >
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem"
    >
      <q-card
        v-for="(item, index) in otherPersons"
        :key="index"
        @click="
          () => {
            router.push({ path: '/start', query: { id: item.id } });
          }
        "
        style="
          object-fit: fill;
          width: 8rem;
          height: 10rem;
          border-radius: 1rem;
        "
      >
        <img
          :src="`${config.API_BASE_URL}/media/file/?file_path=${item.photos[0]?.saved_file_name}`"
          alt=".."
          style="object-fit: fill; width: 8rem; height: 10rem"
        />
        <div class="absolute-bottom text-subtitle2 text-start">
          <h6 class="text-white q-ma-sm text-weight-bold text-subtitle2">
            {{ item.full_name }}, {{ calculateAge(item.dob) }}
          </h6>
        </div>
      </q-card>
    </div>
  </div>
  <div v-if="otherPersons?.length === 0">
    <h6
      class="text-caption text-dark"
      style="
        width: 60%;
        margin: 0 auto;
        height: 20rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      Come back again to see all your activities
    </h6>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiClient } from "app/Storage/api";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/useUserStore";
import config from "src/config";

const matches = ref([]); // Array to hold match details
const otherPersons = ref([]); // Array to hold user profiles of matches
const router = useRouter();
const userData = useUserStore();

// Fetch match data for the logged-in user
const fetchMatches = async () => {
  try {
    const response = await apiClient.get("/matches/");
    if (response.data.success) {
      // Extract the list of matches
      const rawMatches = response.data.results.docs;

      // Map matches to determine IDs of the other persons
      matches.value = rawMatches.map((match) => {
        return match.match_1.id === userData.user.id
          ? match.match_2.id
          : match.match_1.id;
      });
    }
  } catch (error) {
    console.error("Error fetching match requests:", error);
  }
};

// Fetch user profiles for all matched IDs
const fetchMatchProfiles = async () => {
  try {
    otherPersons.value = [];

    // Fetch profiles for all matched IDs
    const profilePromises = matches.value.map(async (matchId) => {
      const response = await apiClient.get(
        `/matches/profile/?user_id=${matchId}`
      );
      return response.data.results;
    });

    // Resolve all profile promises
    otherPersons.value = await Promise.all(profilePromises);
  } catch (error) {
    console.error("Error fetching match profiles:", error);
  }
};

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Initialize component
onMounted(async () => {
  try {
    await userData.fetchUserData();
    await fetchMatches();
    await fetchMatchProfiles();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
</script>

<style lang="scss" scoped></style>
