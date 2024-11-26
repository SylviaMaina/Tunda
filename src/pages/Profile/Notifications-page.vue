<template>
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
    "
  >
    <router-link to="/profile">
      <q-icon color="dark" name="chevron_left" size="20px"
    /></router-link>

    <div style="width: 90%; margin: 0 auto">
      <h6
        class="no-margin no-padding text-center"
        style="font-size: 18px; font-weight: 600"
      >
        Notifications
      </h6>
    </div>
  </div>
  <div v-if="notifs.length > 0">
    <q-list class="q-mx-sm" v-for="(items, index) in notifs" :key="index">
      <router-link
        :to="items.route"
        style="text-decoration: none; color: #000"
        @click="OpenNotif(items.id)"
        ><q-item-label
          header
          :style="{ opacity: items.seen === false ? 1 : 0.5 }"
          >{{ formatDate(items.createdAt) }}</q-item-label
        >
        <q-item class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="../../assets/Rectangle.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ items.message.title }}</q-item-label>
            <q-item-label caption lines="1">{{
              items.message.body
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption v-if="items.seen === false">
              <div
                style="
                  width: 0.5rem;
                  height: 0.51rem;
                  border-radius: 100%;
                  background-color: #ff6f61;
                "
              ></div
            ></q-item-label>
            <div
              class="text-dark q-ma-sm hover-effect"
              @click="DeleteNotif(items.id)"
            >
              <q-icon name="delete" size="20px" />
            </div>
          </q-item-section> </q-item
      ></router-link>
    </q-list>
  </div>
  <div
    v-if="notifs?.length === 0"
    style="
      width: 80%;
      margin: 0 auto;
      height: 20rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <h6 class="text-caption text-black text-weight-bold">
      No new notifications yet
    </h6>
    <h6 class="text-caption text-dark">
      Come back again to see all your activities
    </h6>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import AuthSession from "app/Storage/AuthSession";
import { onMounted, ref } from "vue";

const notifs = ref([]);
const currentThread = ref("");
const token = AuthSession.getToken();
const error = ref(null);

// Load all notifs for the user
const loadNotifs = async () => {
  try {
    const response = await apiClient.get("/notifications/", {
      headers: { Authorization: token },
    });
    const results = response.data.results;

    notifs.value = results.docs;

    console.log(notifs.value);

    currentThread.value = notifs.value[0];
  } catch (error) {
    console.error("Error loading messages:", error);
  }
};
// open a notification
const OpenNotif = async (id) => {
  try {
    const response = await apiClient.patch("/notifications/seen/", {
      id: id,
    });
  } catch (error) {
    console.error("Error loading messages:", error);
  }
};

const DeleteNotif = async (id) => {
  try {
    const response = await apiClient.delete("/notifications/", {
      id: id,
    });
  } catch (error) {
    console.error("Error loading messages:", error);
  }
};

const formatDate = (date) => {
  if (!date) return "Invalid date";

  const inputDate = new Date(date); // Parse ISO 8601 string
  const today = new Date();

  // Check if the date is today
  const isToday =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate();

  // Format date: "Oct 05, 2024"
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);

  return isToday ? `Today, ${formattedDate}` : formattedDate;
};

onMounted(loadNotifs);
</script>

<style lang="scss" scoped>
.hover-effect {
  opacity: 0;
  transition: opacity 0.3s;
}
.hover-effect:hover {
  opacity: 1;
}
</style>
