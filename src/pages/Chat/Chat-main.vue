<template>
  <div
    style="
      width: 90%;
      margin: 0 auto;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <div
      style="
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: start;
      "
    >
      <h6
        class="no-margin no-padding"
        style="font-size: 18px; font-weight: 600"
      >
        Chats
      </h6>
    </div>
    <q-icon color="dark" name="eva-message-circle-outline" size="20px" />
  </div>
  <div class="q-pa-md">
    <q-input
      style="width: 100%"
      outlined
      class="text-dark"
      placeholder="Search"
    >
      <template v-slot:prepend>
        <q-icon name="o_search" class="q-pl-sm" />
      </template>
    </q-input>
  </div>
  <q-list class="q-pa-sm">
    <div v-for="contact in threads" :key="contact.id">
      <router-link
        :to="{ path: '/threads/view', query: { id: contact.id } }"
        style="text-decoration: none; color: #000"
      >
        <q-item class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img
                :src="`${config.API_BASE_URL}/media/file/?file_path=${
                  contact.sender_id.id === user?.id
                    ? contact.receiver_id?.profile_photo
                    : contact.sender_id?.profile_photo
                }`"
                alt="User Avatar"
                style="object-fit: cover"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{
                contact.sender_id.id === user?.id
                  ? contact.receiver_id?.full_name || "Unknown User"
                  : contact.sender_id?.full_name || "Unknown User"
              }}</q-item-label
            >
            <q-item-label caption lines="1">{{
              contact.last_message?.message || "No message"
            }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              {{ formatTimestamp(contact.updatedAt) }}
            </q-item-label>
            <q-item-label>
              <q-icon name="sell" class="q-pl-sm" color="dark" />
            </q-item-label>
          </q-item-section> </q-item
      ></router-link>
    </div>
  </q-list>
  <div v-if="threads?.length === 0">
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
      No chats started
    </h6>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import AuthSession from "app/Storage/AuthSession";
import { config } from "src/boot/http";
import { onMounted, ref } from "vue";
import { format, isToday, isYesterday } from "date-fns";

const threads = ref([]);
const token = AuthSession.getToken();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return format(date, "h:mm: a");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "d-MM-yyyy");
  }
};

// Load all threads for the user
const loadThreads = async () => {
  try {
    const response = await apiClient.get("/messages/threads/", {
      headers: { Authorization: token },
    });
    const results = response.data.results;

    threads.value = results.docs.map((thread) => ({
      ...thread,
      otherPerson:
        thread.sender_id.id === props.user?.id
          ? thread.receiver_id.id
          : thread.sender_id.id,
    }));
  } catch (error) {
    console.error("Error loading messages:", error);
  }
};

onMounted(async () => {
  await loadThreads();
});
</script>

<style lang="scss" scoped>
:deep(.q-field__control) {
  padding: 0;
  height: 2.5rem;
  display: flex;
  align-items: center;
}
</style>
