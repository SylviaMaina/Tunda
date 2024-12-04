<template>
  <div class="q-ma-sm q-pa-sm" style="width: 100%; margin: 0 auto">
    <div
      style="
        width: 100%;
        height: 8rem;
        display: flex;
        justify-content: space-between;
      "
      v-if="info"
    >
      <div style="width: 100%; height: 5rem">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 2.5rem;
            width: 100%;
          "
        >
          <h6
            class="text-black q-ma-sm"
            style="font-size: 18px; font-weight: 600"
          >
            {{ info?.full_name }}, {{ calculateAge(info.dob) }}
          </h6>

          <div
            @click="
              () => {
                router.push({ path: '/start', query: { id: info.id } });
              }
            "
            style="
              width: 2rem;
              height: 2rem;
              display: flex;
              align-items: center;
              border-radius: 100%;
            "
          >
            <q-icon color="black" name="close" size="20px" />
          </div>
        </div>

        <div
          class="q-gutter-sm q-mb-sm q-ml-xs"
          style="
            width: 100%;
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(3, 6.8rem);
          "
        >
          <div v-for="category in info.interests" :key="category.name">
            <div
              v-for="interest in category.interests.slice(0, 1)"
              :key="interest.label"
            >
              <q-badge
                transparent
                color="info"
                class="q-pa-sm ellipsis-2-lines"
                :label="interest.label"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-my-lg">
      <h6 class="q-ma-sm text-dark text-subtitle1">Bio</h6>
      <h6 class="q-ma-sm text-subtitle2">
        {{ info?.bio }}
      </h6>
    </div>
    <div class="q-pa-sm overflow-auto" v-if="info">
      <div
        style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem"
      >
        <q-card
          v-for="(match, index) in info.photos"
          :key="index"
          style="
            object-fit: cover;
            width: 8rem;
            height: 10rem;
            border-radius: 1rem;
          "
        >
          <img
            :src="`${config.API_BASE_URL}/media/file/?file_path=${match?.saved_file_name}`"
            alt=".."
            style="object-fit: cover; width: 8rem; height: 10rem"
          />
        </q-card>
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        left: 2rem;
        bottom: 8rem;
        position: absolute;
      "
    >
      <q-fab
        icon="message"
        color="primary"
        text-color="white"
        round
        size="20px"
        class="q-mx-sm"
        @click="
          () => {
            router.push({ path: '/threads/view', query: { id: info.id } });
          }
        "
      >
      </q-fab>
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { config } from "src/boot/http";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const info = ref(null);
const error = ref(null);
const router = useRouter();
const userId = route.query.id;

// Function to fetch matches
const getMatch = async () => {
  try {
    const response = await apiClient.get(`/matches/profile/?user_id=${userId}`);

    const users = response.data.results;

    info.value = users;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

// Fetch user data on mount
onMounted(async () => {
  await getMatch();
});
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
</script>

<style lang="scss" scoped>
:deep(.q-field__control) {
  padding: 0;
  height: 2.5rem;
  display: flex;
  align-items: center;
}
:deep(.q-badge) {
  background-color: white !important;
  font-size: 0.9rem;
  color: black;
}
@keyframes pulsate {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulsate-icon {
  animation: pulsate 1s infinite;
}
</style>
