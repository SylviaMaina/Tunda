<template>
  <div
    class="q-ma-md"
    style="
      height: 2rem;
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
    v-for="contact in threads"
    :key="contact.id"
  >
    <Router-link to="/chat" style="text-decoration: none">
      <q-icon color="dark" name="o_chevron_left" size="20px" />
    </Router-link>

    <q-avatar size="2rem" class="q-ml-sm">
      <img
        :src="`http://212.47.72.98:3001/api/v1/media/file/?file_path=${
          contact.sender_id.id === userData.user.id
            ? contact.receiver_id?.profile_photo
            : contact.sender_id?.profile_photo
        }`"
        alt="User Avatar"
        style="object-fit: cover"
      />
    </q-avatar>

    <div
      style="
        width: 90%;
        display: flex;
        height: 2rem;
        flex-direction: column;
        align-items: start;
        margin-left: 0.5rem;
        justify-content: center;
      "
    >
      <h6
        class="no-margin no-padding"
        style="font-size: 11px; font-weight: 600; line-height: normal"
      >
        {{
          contact.sender_id.id === userData.user.id
            ? contact.receiver_id?.full_name || "Unknown User"
            : contact.sender_id?.full_name || "Unknown User"
        }}
      </h6>

      <h6
        class="no-margin text-green-5 no-padding"
        style="font-size: 11px; font-weight: 600; line-height: normal"
      >
        online
      </h6>
    </div>
  </div>

  <!-- Message area -->
  <div class="q-pa-md row justify-center">
    <div style="width: 90%; height: 75vh; overflow-y: auto; overflow-x: hidden">
      <q-chat-message
        v-for="msg in messages"
        :key="msg.id"
        :text="[msg.message]"
        :stamp="formatDate(msg.createdAt)"
        :bg-color="msg.sender_id === userData.user?.id ? 'primary' : 'warning'"
        :text-color="msg.sender_id === userData.user?.id ? 'white' : 'black'"
        :sent="msg.sender_id === currentUser.id"
      />
      <!-- Show typing indicator if the other user is typing -->
      <div v-if="isTyping" class="text-grey-6 text-caption">Typing...</div>
    </div>
  </div>

  <!-- Input area -->
  <div
    style="
      width: 90vw;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <q-input
      outlined
      class="full-width"
      v-model="newMessage"
      placeholder="Type a message"
      @focus="handleTyping"
      @keydown.enter="sendMessage"
      ><template v-slot:prepend
        ><q-btn icon="attach_file" flat dense @click="triggerFileInput"></q-btn>

        <q-input
          type="file"
          v-model="fileInput"
          @change="handleFileChange"
          style="display: none"
          multiple
        />
      </template>
      <q-btn icon="send" color="primary" flat dense @click="sendMessage"></q-btn
    ></q-input>
  </div>
  <div v-if="previews?.length > 0" class="file-previews">
    <div v-for="(file, index) in previews" :key="index" class="file-preview">
      <q-avatar>
        <img :src="file.previewUrl" alt="File preview" />
      </q-avatar>
      <p>{{ file.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { io } from "socket.io-client";
import { apiClient } from "app/Storage/api";
import { useUserStore } from "src/stores/useUserStore";
import AuthSession from "app/Storage/AuthSession";
import axios from "axios";
import { useRoute } from "vue-router";

const $q = useQuasar();
const previews = ref([]);
const messages = ref([]);
const newMessage = ref("");
const fileInput = ref(null);
const isTyping = ref(false);
const currentUser = ref("");
const currentThread = ref("");
const threads = ref([]);
const token = AuthSession.getToken();
const socket = ref(null);
const route = useRoute();
const info = ref(null);
const matchId = ref(null);

const userData = useUserStore();

// Trigger file input for attachment
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Load all threads for the user
const loadThreads = async () => {
  try {
    const response = await apiClient.get("messages/threads/", {
      headers: { Authorization: token },
    });
    const results = response.data.results;

    threads.value = results.docs.map((thread) => {
      const otherPersonId =
        thread.sender_id.id === userData.user.id
          ? thread.receiver_id.id
          : thread.sender_id.id;

      // Set info.value to the ID of the other person
      if (!info.value) {
        info.value = { id: otherPersonId }; // Set the ID to info.value initially
      }

      return {
        ...thread,
        otherPersonId,
      };
    });

    currentThread.value = threads.value[0];
  } catch (error) {
    console.error("Error loading threads:", error);
  }
};
// Fetch user interests and match details
const fetchMatch = async () => {
  // Ensure info.value is populated before proceeding
  if (!info.value?.id) {
    console.error("info.value is not set yet.");
    return;
  }

  try {
    const response = await apiClient.get("matches/");
    if (response.data.success) {
      const matches = response.data.results.docs;
      const matchingMatch = matches.find(
        (match) =>
          (match?.match_1?.id === info.value?.id &&
            match?.match_2?.id === userData.user?.id) ||
          (match?.match_1?.id === userData.user?.id &&
            match?.match_2?.id === info.value.id)
      );

      console.log(matches);

      if (matchingMatch) {
        matchId.value = matchingMatch.id;
      }
    }
  } catch (error) {
    console.error("Error fetching match requests:", error);
  }
};

// Initialize Socket.IO
const initializeSocket = () => {
  if (socket.value) return;
  socket.value = io("http://212.47.72.98:3001", {
    path: "/soc",
    transports: ["websocket", "polling"],
    auth: { token },
  });

  socket.value.on("new-message", () => loadMessages());
  socket.value.on("typing", (data) => {
    if (data.to === userData.user.id) {
      isTyping.value = true;
      setTimeout(() => (isTyping.value = false), 3000);
    }
  });
};

// Handle typing event
const handleTyping = () => {
  if (!info.value || !userData.user || !socket.value) {
    console.error("Missing data for typing event.");
    return;
  }

  const to = info.value?.id;

  socket.value.emit("typing", {
    thread_id: currentThread.value?.id || null,
    receiver_id: currentThread.value?.receiver_id,
    to,
  });
};

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files && files?.length) {
    // Process each selected file
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.value.push({
          file,
          previewUrl: reader.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    });
  }
};

// Send a message
const sendMessage = async () => {
  if (!newMessage.value.trim() && previews.value?.length === 0) {
    return; // Don't send empty messages
  }

  if (!matchId.value) {
    console.error("Match ID is missing.");
    return;
  }

  const payload = {
    thread_id: currentThread.value?.id || null,
    match_id: matchId.value,
    sender_id: currentUser.value.id,
    receiver_id: info.value.id,
    message: newMessage.value,
  };

  const formData = new FormData();
  formData.append("json_payload", JSON.stringify(payload));

  // Add files to the formData
  previews.value.forEach((preview, index) => {
    formData.append(`photo_${index}`, preview.file);
  });
  const token = AuthSession.getToken();

  try {
    const response = await axios.post(
      "http://212.47.72.98:3001/api/v1/messages/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: ` ${token}`,
        },
      }
    );
    newMessage.value = "";
    fileInput.value = null;
    previews.value = []; // Reset file previews after sending
    loadMessages(); // Refresh messages
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Load the existing messages
const loadMessages = async () => {
  try {
    const response = await apiClient.get("messages/", {
      headers: { Authorization: token },
    });
    messages.value = response.data.results.docs;
  } catch (error) {
    console.error("Error loading messages:", error);
    $q.notify({ message: "Failed to load messages.", color: "negative" });
  }
};

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(async () => {
  await userData.fetchUserData();
  currentUser.value = userData.user;
  await loadThreads();
  await fetchMatch();
  loadMessages();
  initializeSocket();
});

onBeforeUnmount(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
});
</script>

<style lang="scss" scoped>
:deep(.q-message-text) {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  width: 18rem;
  margin-bottom: 1rem;
  padding: 10px;
}
:deep(.q-message-text--received) {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 0rem;
  width: 18rem;
  padding: 10px;
  margin-bottom: 1rem;
}
:deep(.q-field__control) {
  padding: 0;
  height: 2.5rem;
  display: flex;
  align-items: center;
}
.file-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.file-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-preview img {
  max-width: 80px;
  max-height: 80px;
}
:deep(.q-message-stamp) {
  text-align: right;
  font-size: 0.6rem;
}
</style>
