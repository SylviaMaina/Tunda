<template>
  <div class="q-ma-sm q-pa-sm" style="width: 95%; margin: 0 auto">
    <div
      style="
        width: 100%;
        height: 8rem;
        display: flex;
        justify-content: space-evenly;
      "
      v-if="user"
    >
      <div style="width: 100%; height: 5rem">
        <div class="row flex-center justify-between">
          <h6
            class="text-black q-ma-sm"
            style="font-size: 18px; font-weight: 600"
          >
            {{ user?.full_name }}, {{ calculateAge(user.dob) }}
          </h6>
          <router-link to="/home" style="text-decoration: none">
            <div
              style="
                width: 2rem;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                border-radius: 100%;
              "
            >
              <q-icon color="black" name="close" size="20px" />
            </div>
          </router-link>
        </div>

        <div
          class="q-gutter-sm q-mb-sm q-ml-xs"
          style="
            width: 90%;
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(3, 6.8rem);
          "
        >
          <div v-for="category in user.interests" :key="category.name">
            <div
              v-for="interest in category.interests.slice(0, 1)"
              :key="interest.label"
            >
              <q-badge
                transparent
                style="color: black; background-color: rgba(0, 0, 0, 0.16)"
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
        {{ user?.bio }}
      </h6>
    </div>
    <div class="q-pa-sm overflow-auto" v-if="user">
      <div
        style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem"
      >
        <q-card
          v-for="(match, index) in user.photos"
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
        bottom: 2rem;
        position: absolute;
      "
    >
      <q-fab
        icon="close"
        color="white"
        text-color="black"
        padding="8px"
        class="q-mx-sm"
        @click="showNotif"
      >
      </q-fab>
      <q-fab
        size="25px"
        icon="favorite"
        color="primary"
        class="q-mx-sm"
        @click="showLike"
      ></q-fab>
      <q-fab icon="grade" color="info" text-color="secondary" padding="8px">
      </q-fab>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { apiClient } from "app/Storage/api";
import config from "src/config";

const $q = useQuasar();

const showNotif = () => {
  $q.notify({
    icon: "heart_broken",
    iconSize: "18rem",
    textColor: "red",
    color: "transparent",
    position: "center",
    timeout: 1000,
  });
};

const showLike = () => {
  $q.notify({
    icon: "favorite",
    iconSize: "18rem",
    textColor: "red",
    color: "transparent",
    position: "center",
    timeout: 2500,
    classes: "pulsate-icon",
  });
};

const route = useRoute();
const user = ref(null);
const userId = route.query.id;

// Function to fetch matches
const getMatch = async () => {
  try {
    const response = await apiClient.get(`matches/profile/?user_id=${userId}`);

    const users = response.data.results;

    console.log(users);

    user.value = users;
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

<style lang="scss" scoped></style>
