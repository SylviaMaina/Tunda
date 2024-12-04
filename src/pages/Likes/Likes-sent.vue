<template>
  <div style="width: 90%; margin: 0 auto" class="q-pa-sm overflow-auto">
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem"
    >
      <q-card
        v-for="(item, index) in data"
        :key="index"
        style="width: 8rem; height: 10rem; border-radius: 1rem"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiClient } from "app/Storage/api";
import { config } from "src/boot/http";

const info = ref([]);
const data = ref([]);

const fetchInterests = async () => {
  try {
    const response = await apiClient.get("/matches/requests/");
    if (response.data.success) {
      info.value = response.data.results.docs;
      await fetchMatchDetails(info.value);
    }
  } catch (error) {
    console.error("Error fetching match requests:", error);
  }
};

const fetchMatchDetails = async (matchRequests) => {
  try {
    const matchIds = matchRequests.map((request) => request.initiator._id);

    const matchDetailsResponses = await Promise.all(
      matchIds.map(async (id) => {
        const response = await apiClient.get(`/matches/profile/?user_id=${id}`);
        return response.data.success ? response.data.results : null;
      })
    );

    const matchedUsers = matchDetailsResponses.filter((user) => user !== null);

    data.value = matchedUsers;
  } catch (error) {
    console.error("Error fetching match details:", error);
  }
};

onMounted(fetchInterests);

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
</script>

<style lang="scss" scoped></style>
