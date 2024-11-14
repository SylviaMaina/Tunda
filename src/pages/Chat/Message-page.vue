<template>
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
        height: 5rem;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
      v-if="info"
    >
      <Router-link to="/chat" style="text-decoration: none">
        <q-icon color="dark" name="o_chevron_left" size="40px" />
      </Router-link>

      <!-- Show avatar for offline contacts -->
      <q-avatar>
        <img
          :src="`http://212.47.72.98:3001/api/v1/media/file/?file_path=${info.photos[0].saved_file_name}`"
        />
      </q-avatar>

      <div
        style="
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: start;
          margin-left: 1rem;
        "
      >
        <h6 class="no-margin no-padding text-weight-bold text-subtitle1">
          {{ info.full_name }}
        </h6>

        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <div
            style="
              width: 0.5rem;
              height: 0.5rem;
              background: green;
              border-radius: 100%;
              margin-right: 0.2rem;
            "
          ></div>
          <h6 class="no-margin text-green-5 text-subtitle2">online</h6>
        </div>
      </div>
    </div>
  </div>

  <!-- Message area -->
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px; height: 75vh">
      <q-chat-message
        v-for="msg in messages"
        :key="msg.id"
        :text="[msg.text]"
        :stamp="formatDate(msg.createdAt)"
        :bg-color="msg.sender_id === currentUser.id ? 'primary' : 'grey'"
        text-color="white"
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
  <div v-if="previews.length > 0" class="file-previews">
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
const userId = route.path.split("/").pop();
const info = ref(null);
const matchId = ref(null);

const userData = useUserStore();

// Trigger file input for attachment
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Fetch match info for the user
const getMatch = async () => {
  try {
    const response = await apiClient.get(`matches/profile/?user_id=${userId}`);
    info.value = response.data.results;
    console.log("Receiver info:", info.value);
    await fetchInterests();
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

// Fetch user interests and match details
const fetchInterests = async () => {
  try {
    const response = await apiClient.get("matches/");
    if (response.data.success) {
      const matches = response.data.results.docs;
      const matchingMatch = matches.find(
        (match) =>
          (match?.match_1?.id === info.value.id &&
            match?.match_2?.id === userData.user?.id) ||
          (match?.match_1?.id === userData.user?.id &&
            match?.match_2?.id === info.value.id)
      );

      if (matchingMatch) {
        matchId.value = matchingMatch.id;
        console.log("Match ID:", matchId.value);
      } else {
        console.log("No matching match found.");
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

  const to =
    info.value?.id === userData.user.id
      ? currentThread.value?.userData.user.id
      : currentThread.value?.info.value?.id;

  socket.value.emit("typing", {
    thread_id: this.current_thread?.id,
    receiver_id: this.current_thread?.receiver_id,
    to,
  });
};

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files && files.length) {
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
  if (!newMessage.value.trim() && previews.value.length === 0) {
    console.log("No message or file to send");
    return; // Don't send empty messages
  }

  if (!matchId.value) {
    console.error("Match ID is missing.");
    return;
  }

  const payload = {
    thread_id: currentThread.value.id,
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

  try {
    const response = await apiClient.post("messages/", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
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

// Load all threads for the user
const loadThreads = async () => {
  try {
    const response = await apiClient.get("messages/threads/", {
      headers: { Authorization: token },
    });

    console.log("Threads response:", response);

    if (response.data.success && response.data.results.docs.length > 0) {
      threads.value = response.data.results.docs;
      currentThread.value = threads.value[0];
      console.log("Loaded threads:", threads.value);
    } else {
      threads.value = [];
      currentThread.value = null;
      console.log("No threads available.");
    }
  } catch (error) {
    console.error("Error loading threads:", error);
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
  await fetchInterests();
  currentUser.value = userData.user;
  await getMatch();
  loadThreads();
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
  border-radius: 1rem;
  width: 20rem;
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
</style>
