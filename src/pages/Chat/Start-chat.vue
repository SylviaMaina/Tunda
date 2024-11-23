<template style="width: screen; height: 100vh">
  <q-banner
    v-if="error"
    class="bg-negative text-red q-ma-sm"
    style="border: 1px solid red"
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      "
    >
      <q-icon
        name="error"
        class="cursor-pointer text-red-8 q-mr-sm"
        size="1.5rem"
      />
      <div>
        {{
          error ||
          "Something went wrong, please try again or reach out to customer support"
        }}
      </div>

      <q-icon name="close" color="red" size="1.2rem" @click="dismissError" />
    </div>
  </q-banner>
  <div
    style="
      width: 90%;
      margin: 0 auto;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <div
      style="
        width: 50%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <q-icon color="black" name="o_location_on" size="40px" />
      <div
        style="
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: start;
        "
      >
        <h6 class="no-margin no-padding text-weight-bold">Location</h6>
        <h6 class="no-margin text-dark text-subtitle2">Nairobi,Kenya</h6>
      </div>
    </div>
    <q-icon color="dark" name="o_notifications" size="40px" />
  </div>
  <div
    style="
      width: 90%;
      margin: 0 auto;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <q-input style="width: 80%" outlined class="text-dark" placeholder="Search">
      <template v-slot:prepend>
        <q-icon name="o_search" class="q-pl-sm" />
      </template>
    </q-input>
    <q-icon color="black" name="o_tune" size="40px" @click="filter = true" />
  </div>
  <div style="width: 90vw; margin: 0 auto; height: 60vh; position: relative">
    <img
      :src="`http://212.47.72.98:3001/api/v1/media/file/?file_path=${info?.photos[0].saved_file_name}`"
      alt=".."
      style="
        height: 100%;
        width: 100%;
        margin: 0 auto;
        object-fit: cover;
        border-radius: 2rem;
      "
    />
    <div
      style="
        position: absolute;
        bottom: 8%;
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      "
      v-if="info"
    >
      <div
        style="
          width: 90%;
          height: 5rem;
          margin-left: 0.5rem;
          margin-bottom: 3rem;
        "
      >
        <div class="row flex-center justify-between">
          <h6 class="text-white q-ma-sm text-weight-bold">
            {{ info.full_name }}, {{ calculateAge(info?.dob) }}
          </h6>
        </div>

        <div
          class="q-gutter-sm"
          style="
            width: 70%;
            display: grid;
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
        <router-link :to="`/about/${info.id}`" style="text-decoration: none">
          <div
            style="
              width: 2rem;
              height: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              right: 1rem;
              bottom: -1rem;
              position: absolute;
              background: #ffffff29;
            "
          >
            <q-icon name="more_vert" color="white" size="1.2rem" />
          </div>
        </router-link>
      </div>
    </div>

    <div
      style="
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        bottom: -2rem;
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
  <div v-if="info?.length === 0">
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
      Come back again to see all new people to match with
    </h6>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
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
    const response = await apiClient.get(`matches/profile/?user_id=${userId}`);

    const users = response.data.results;

    console.log(users);

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
