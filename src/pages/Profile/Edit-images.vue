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

  <div class="body">
    <div v-if="userData?.user">
      <div class="">
        <h6 class="q-py-sm" style="font-size: 18px; font-weight: 600">
          Gallery
        </h6>
      </div>
    </div>

    <div class="gallery-container">
      <div class="q-gutter-sm gallery-grid">
        <q-card v-for="(item, index) in info" :key="index" class="my-card">
          <q-img
            :src="`${config.API_BASE_URL}/media/file/?file_path=${item.saved_file_name}`"
            alt="Image"
            style="object-fit: cover; width: 10rem; height: 10rem"
            @click="() => router.push('/image')"
          />
        </q-card>
      </div>
    </div>

    <!-- Separate Upload Button -->
    <div class="upload-button-container">
      <q-btn
        color="primary"
        icon="o_image"
        round
        @click="showUploadDialog = true"
      />
    </div>

    <!-- Popup Dialog for Image Upload -->
    <q-dialog v-model="showUploadDialog" persistent>
      <q-card class="q-pa-md" style="width: 95vw">
        <div class="text-h6 q-mb-md">Upload Images</div>

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
        <div v-for="(file, index) in files" :key="file.name">
          <q-chip class="full-width q-my-xs" square @remove="cancelFile(index)">
            <div style="display: flex; align-items: center">
              <q-avatar>
                <q-icon name="o_cloud" size="24px" />
              </q-avatar>

              <div class="ellipsis relative-position">
                {{ file.name }}
              </div>

              <q-tooltip>
                {{ file.name }}
              </q-tooltip>
            </div>

            <q-avatar @click="cancelFile">
              <q-icon name="o_delete" class="text-black" size="24px" />
            </q-avatar>
          </q-chip>
        </div>

        <div class="q-gutter-sm q-mt-md flex justify-end">
          <q-btn flat label="Cancel" color="secondary" @click="closeDialog" />
          <q-btn
            color="primary"
            label="Upload"
            icon="cloud_upload"
            @click="uploadFiles"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Loading,
  QBanner,
  QIcon,
  QFile,
  QDialog,
  QBtn,
  QCard,
  Notify,
} from "quasar";
import { apiClient } from "app/Storage/api";
import { useUserStore } from "src/stores/useUserStore";
import AuthSession from "app/Storage/AuthSession";
import axios from "axios";
import config from "src/config";

const router = useRouter();
const files = ref([]);
const userData = useUserStore();
const error = ref(null);
const info = ref([]);
const showUploadDialog = ref(false);

const fetchInterests = async () => {
  try {
    const response = await apiClient.get("/media/");
    if (response.data.success) {
      info.value = response.data.results.docs;
      console.log(response.data.results);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = "Failed to load gallery items. Please try again.";
  }
};

onMounted(fetchInterests);
onMounted(() => {
  userData.fetchUserData();
});

// Function to update files array
function updateFiles(newFiles) {
  files.value = newFiles;
}

// Function to cancel individual file
function cancelFile(index) {
  files.value.splice(index, 1);
}

// Function to upload files to the server
async function uploadFiles() {
  Loading.show();
  if (files.value?.length === 0) {
    return;
  }

  const formData = new FormData();

  files.value.forEach((file, index) => {
    formData.append(`photo_${index}`, file);
  });

  try {
    const token = AuthSession.getToken();

    const res = await axios.patch(
      `${config.API_BASE_URL}/profile/photos/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: ` ${token}`,
        },
      }
    );
    if (response.data.success) {
      Loading.hide();
      Notify.create({
        type: "positive",
        message: "Photo deleted successfully",
      });
      info.value.splice(index, 1);
    }
  } catch (error) {
    Loading.hide();
    console.error("Error deleting image:", error);
    Notify.create({
      type: "negative",
      message: "Unable to delete image.",
    });
  }
}

const closeDialog = () => {
  showUploadDialog.value = false;
  files.value = [];
};

const dismissError = () => {
  error.value = null;
  Loading.hide();
};
</script>

<style lang="scss" scoped>
.body {
  height: 42rem;
  width: 95vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.gallery-container {
  height: 40rem;
  margin: 0 auto;
  overflow-y: auto;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.my-card {
  width: 10rem;
  height: 10rem;
}

.upload-button-container {
  display: flex;
  justify-content: center;
  width: 94%;
  margin-bottom: 1rem;
}

.upload-file-input {
  width: 2.6rem;
  height: 2.5rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
}

.upload-icon {
  width: 2.6rem;
  height: 2.5rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  background-color: #ff6f61;
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
:deep(.q-field__input) {
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
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
:deep(.q-field__input) {
  width: 100%;
}
:deep(.q-field__native) {
  opacity: 0;
}
</style>
