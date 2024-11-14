<template>
  <div
    style="width: 90%; height: 78vh; margin: 0 auto"
    class="q-pa-sm overflow-auto"
    v-if="data?.length > 0"
  >
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem"
    >
      <q-card
        v-for="(match, index) in data"
        :key="index"
        class="my-card"
        @click="() => router.push(`/start/${match.id}`)"
      >
        <img
          :src="`http://212.47.72.98:3001/api/v1/media/file/?file_path=${match.photos[0]?.saved_file_name}`"
          alt=".."
        />
        <div class="absolute-bottom text-subtitle2 text-start">
          <h6 class="text-white q-ma-sm text-weight-bold text-subtitle2">
            {{ match.full_name }}, 24
          </h6>
        </div>
      </q-card>
    </div>
  </div>
  <div v-if="data?.length === 0">
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

const info = ref([]);
const data = ref([]);
const router = useRouter();

const fetchInterests = async () => {
  try {
    const response = await apiClient.get("matches/");
    if (response.data.success) {
      info.value = response.data.results.docs;
      await fetchMatchDetails(info.value);
      console.log(info.value);
    }
  } catch (error) {
    console.error("Error fetching match requests:", error);
  }
};

const fetchMatchDetails = async (matchRequests) => {
  try {
    const matchIds = matchRequests.map((request) => request.matched_by);

    const matchDetailsResponses = await Promise.all(
      matchIds.map(async (id) => {
        const response = await apiClient.get(`matches/profile/?user_id=${id}`);
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
</script>
<style lang="scss" scoped></style>
