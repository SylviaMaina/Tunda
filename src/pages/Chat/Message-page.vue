<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-black" style="background-color: #f5f3f3">
      <div
        class="q-ma-md"
        style="
          height: 2rem;
          width: 80%;
          display: flex;
          position: relative;
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
            :src="`${config.API_BASE_URL}/media/file/?file_path=${
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
            style="font-size: 13px; font-weight: 600; line-height: normal"
          >
            {{
              contact.sender_id.id === userData.user.id
                ? contact.receiver_id?.full_name || "Unknown User"
                : contact.sender_id?.full_name || "Unknown User"
            }}
          </h6>

          <h6
            class="no-margin text-green-5 no-padding"
            style="font-size: 13px; font-weight: 600; line-height: normal"
          >
            online
          </h6>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <div
        style="
          height: 50rem;
          display: flex;
          position: relative;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
        "
        class="q-pa-sm"
      >
        <!-- Message area -->
        <div style="width: 90%; overflow-y: auto; overflow-x: hidden">
          <q-chat-message
            class="message-input-container"
            v-for="msg in messages"
            :key="msg.id"
            :stamp="formatDate(msg.createdAt)"
            :bg-color="
              msg.sender_id === userData.user?.id ? 'primary' : 'warning'
            "
            :text-color="
              msg.sender_id === userData.user?.id ? 'white' : 'black'
            "
            :sent="msg.sender_id === currentUser.id"
          >
            <!-- Render text if available -->
            <template v-if="msg.message">
              <div class="message-text">{{ msg.message }}</div>
            </template>

            <!-- Render images if available -->
            <template v-if="msg.files && msg.files.length">
              <div
                class="message-images"
                v-for="(photo, index) in msg.files"
                :key="index"
              >
                <q-img
                  :src="`${config.API_BASE_URL}/media/file/?file_path=${photo.saved_file_name}`"
                  class="message-image"
                  style="max-width: 100%; margin-top: 8px"
                />
              </div>
            </template>
          </q-chat-message>

          <div v-if="isTyping" class="text-grey-6 text-caption">Typing...</div>
        </div>

        <!-- Input area -->
        <div
          style="
            width: 100%;
            margin: 0 auto;
            position: sticky;
            background: #f5f3f3;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: space-between;
          "
          class="q-pa-md"
        >
          <!-- Previews in Message Input -->
          <div v-if="previews?.length > 0" class="file-previews">
            <div
              v-for="(file, index) in previews"
              :key="index"
              class="file-preview"
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 6rem;
                  height: 5rem;
                  padding-left: 0.8rem;
                  position: relative;
                "
              >
                <img
                  :src="file.previewUrl"
                  alt="File preview"
                  style="
                    width: 4rem;
                    height: 3rem;
                    border-radius: 0.5rem;
                    object-fit: cover;
                  "
                />
                <div
                  @click="cancelFile(index)"
                  style="position: absolute; top: 0; right: 0"
                >
                  <q-icon name="o_delete" class="text-black" size="20px" />
                </div>
              </div>
            </div>
          </div>
          <q-input
            outlined
            class="full-width textField"
            v-model="newMessage"
            placeholder="Type a message"
            @focus="handleTyping"
            @keydown.enter="sendMessage"
          >
            <template v-slot:prepend>
              <q-btn
                icon="attach_file"
                flat
                dense
                @click="showUploadDialog = true"
              ></q-btn>
            </template>
            <q-btn
              icon="send"
              :color="newMessage || previews.length ? 'primary' : 'grey'"
              :disable="!(newMessage.trim() || previews.length)"
              flat
              dense
              @click="sendMessage"
            ></q-btn>
          </q-input>
        </div>
      </div>
    </q-page-container>
    <!-- Popup Dialog for File Upload -->
    <q-dialog v-model="showUploadDialog" persistent>
      <q-card
        class="q-pa-md"
        style="
          width: 24rem;
          height: 30rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div class="text-h6 q-mb-md">Attach Files</div>
        <div class="file-input-container">
          <q-file
            :model-value="files"
            @update:model-value="updateFiles"
            multiple
            append
          >
            <q-icon name="o_cloud" size="5rem" color="dark" />
            <h6 class="text-dark text-weight-bold">Click to upload</h6>
            <h6
              class="text-dark text-center text-subtitle1 no-caps text-weight-thin"
            >
              Supported formats: JPG, JPEG, PNG | Max size: 2MB
            </h6>
          </q-file>
        </div>
        <div
          v-for="(file, index) in files"
          :key="file.name"
          class="file-preview"
        >
          <q-chip class="full-width q-my-xs" square @remove="cancelFile(index)">
            <div style="display: flex; align-items: center">
              <q-avatar>
                <img :src="getFilePreviewUrl(file)" alt="File preview" />
              </q-avatar>

              <div class="ellipsis relative-position">
                {{ file.name }}
              </div>

              <q-tooltip>
                {{ file.name }}
              </q-tooltip>
            </div>
            <q-avatar @click="cancelFile(index)">
              <q-icon name="o_delete" class="text-black" size="24px" />
            </q-avatar>
          </q-chip>
        </div>

        <div class="q-gutter-sm q-mt-md flex justify-end">
          <q-btn
            flat
            no-caps
            label="Cancel"
            color="secondary"
            @click="closeDialog"
          />
          <q-btn
            color="primary"
            label="Attach"
            icon="o_cloud"
            @click="finalizeFiles"
            no-caps
          />
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { io } from "socket.io-client";
import { apiClient } from "app/Storage/api";
import { useUserStore } from "src/stores/useUserStore";
import AuthSession from "app/Storage/AuthSession";
import { config } from "src/boot/http";

const $q = useQuasar();
const previews = ref([]);
const messages = ref([]);
const newMessage = ref("");
const fileInput = ref(null);
const files = ref([]);
const isTyping = ref(false);
const currentUser = ref("");
const currentThread = ref("");
const threads = ref([]);
const token = AuthSession.getToken();
const socket = ref(null);
const info = ref(null);
const matchId = ref(null);
const showUploadDialog = ref(false);

const userData = useUserStore();

const getFilePreviewUrl = (file) => {
  return URL.createObjectURL(file); // Generate the preview URL for the file
};

// Update selected files
const updateFiles = (selectedFiles) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  const validFiles = Array.from(selectedFiles).filter((file) =>
    validTypes.includes(file.type)
  );

  if (validFiles.length !== selectedFiles.length) {
    $q.notify({
      message: "Some files were not supported and have been rejected.",
      color: "negative",
    });
  }

  files.value = validFiles;
};

// Finalize file selection
const finalizeFiles = () => {
  previews.value = files.value.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
    name: file.name,
  }));
  showUploadDialog.value = false;
};

// Function to cancel individual file
function cancelFile(index) {
  files.value.splice(index, 1);

  previews.value.splice(index, 1);

  if (previews.value[index] && previews.value[index].previewUrl) {
    URL.revokeObjectURL(previews.value[index].previewUrl);
  }
}

// Close dialog
const closeDialog = () => {
  files.value = [];
  previews.value = [];
  showUploadDialog.value = false;
};

// Trigger file input for attachment
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Load all threads for the user
const loadThreads = async () => {
  try {
    const response = await apiClient.get("/messages/threads/", {
      headers: { Authorization: token },
    });
    const results = response.data.results;

    threads.value = results.docs.map((thread) => {
      const otherPersonId =
        thread.sender_id.id === userData.user.id
          ? thread.receiver_id.id
          : thread.sender_id.id;

      if (!info.value) {
        info.value = { id: otherPersonId };
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
  if (!info.value?.id) {
    console.error("info.value is not set yet.");
    return;
  }

  try {
    const response = await apiClient.get("/matches/");
    if (response.data.success) {
      const matches = response.data.results.docs;
      const matchingMatch = matches.find(
        (match) =>
          (match?.match_1?.id === info.value?.id &&
            match?.match_2?.id === userData.user?.id) ||
          (match?.match_1?.id === userData.user?.id &&
            match?.match_2?.id === info.value.id)
      );

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
  socket.value = io(`${config.API_BASE_URL}`, {
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

// Send a message
const sendMessage = async () => {
  if (!newMessage.value.trim() && previews.value.length === 0) {
    return;
  }

  const payload = {
    thread_id: currentThread.value?.id || null,
    match_id: matchId.value,
    sender_id: currentUser.value.id,
    receiver_id: info.value.id,
    message: newMessage.value.trim(),
  };

  const formData = new FormData();
  formData.append("json_payload", JSON.stringify(payload));

  // Attach files if any are selected.
  previews.value.forEach((preview, index) => {
    formData.append(`photo_${index}`, preview.file);
  });

  try {
    const res = await fetch(`${config.API_BASE_URL}/messages/`, {
      method: "POST",
      headers: {
        Authorization: ` ${token}`,
      },
      body: formData,
    });

    // Reset state after sending.
    newMessage.value = "";
    previews.value = [];
    fileInput.value = null;
    loadMessages(); // Refresh messages.
  } catch (error) {
    console.error("Error sending message:", error);
    $q.notify({ message: "Failed to send message.", color: "negative" });
  }
};

// Load the existing messages
const loadMessages = async () => {
  try {
    const response = await apiClient.get("/messages/", {
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
.message-input-container {
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

  :deep(.q-message-stamp) {
    text-align: right;
    font-size: 0.6rem;
  }

  :deep(.q-field__control-container) {
    border: 2px dashed gray;
    width: 100%;
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
.file-input-container {
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

  :deep(.q-message-stamp) {
    text-align: right;
    font-size: 0.6rem;
  }

  :deep(.q-field__control-container) {
    border: 2px dashed gray;
    width: 100%;
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
:deep(.q-chip) {
  border: 1px solid #00a881;
  background: #f0faf8;
  height: 5rem;
  font-size: medium;
  padding-left: 1.4rem;
}
:deep(.q-chip__content) {
  display: flex;
  justify-content: space-between;
}
.textField {
  padding: 0;
  height: 2.5rem;
  display: flex;
  align-items: center;
}

.file-previews {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.file-preview {
  position: relative;
  display: flex;
  align-items: center;
}

.file-preview img {
  max-width: 80px;
  max-height: 80px;
}
.message-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.message-image {
  border-radius: 8px;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}
</style>
