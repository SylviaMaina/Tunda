<template>
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 5/5</h6>
        <h6 class="text-dark text-subtitle1">Skip</h6>
      </div>
      <q-linear-progress size="10px" value="1.0" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">Upload images</h6>
        <h6 class="text-dark text-subtitle2">
          Let people see whom they are talking to
        </h6>
      </div>
      <div class="q-gutter-md">
        <q-file
          :model-value="files"
          @update:model-value="updateFiles"
          multiple
          append
          :clearable="files"
        >
          <q-icon name="o_cloud" @click.stop.prevent size="5rem" color="dark" />
          <h6 class="text-dark text-weight-bold">Click to upload</h6>
          <h6
            class="text-dark text-center text-subtitle1 no-caps text-weight-thin"
          >
            Supported formats: JPG, JPEG, PNG | Max size: 2MB
          </h6>
        </q-file>
        <div v-for="(file, index) in files" :key="file.name">
          <q-chip
            class="full-width q-my-xs"
            :removable="isUploading && uploadProgress[index].percent < 1"
            square
            @remove="cancelFile(index)"
          >
            <q-avatar>
              <q-icon :name="uploadProgress[index].icon" />
            </q-avatar>

            <div class="ellipsis relative-position">
              {{ file.name }}
            </div>

            <q-tooltip>
              {{ file.name }}
            </q-tooltip>
          </q-chip>
        </div>
      </div>
    </div>
    <div>
      <router-link to="/home" style="text-decoration: none">
        <q-btn
          label="Next"
          type="submit"
          color="primary"
          size="20px"
          no-caps
          style="width: 100%; margin: 0 auto"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";

const model = ref(null);
const files = ref(null);
const uploadProgress = ref([]);
const uploading = ref(null);

// Cleanup function to clear timeout
function cleanUp() {
  clearTimeout(uploading.value);
}

// Function to update upload progress
function updateUploadProgress() {
  let done = true;

  uploadProgress.value = uploadProgress.value.map((progress) => {
    if (progress.percent === 1 || progress.error === true) {
      return progress;
    }

    const percent = Math.min(1, progress.percent + Math.random() / 10);
    const error = percent < 1 && Math.random() > 0.95;

    if (!error && percent < 1 && done === true) {
      done = false;
    }

    return {
      ...progress,
      error,
      color: error === true ? "red-2" : "green-2",
      percent,
    };
  });

  uploading.value = !done ? setTimeout(updateUploadProgress, 300) : null;
}

onBeforeUnmount(cleanUp);

// Computed properties
const isUploading = computed(() => uploading.value !== null);
const canUpload = computed(() => files.value !== null);

// Cancel a specific file upload
function cancelFile(index) {
  uploadProgress.value[index] = {
    ...uploadProgress.value[index],
    error: true,
    color: "orange-2",
  };
}

// Update files when new files are selected
function updateFiles(newFiles) {
  files.value = newFiles;
  uploadProgress.value = (newFiles || []).map((file) => ({
    error: false,
    color: "green-2",
    percent: 0,
    icon:
      file.type.indexOf("video/") === 0
        ? "movie"
        : file.type.indexOf("image/") === 0
        ? "photo"
        : file.type.indexOf("audio/") === 0
        ? "audiotrack"
        : "insert_drive_file",
  }));
}

// Start the upload and initialize progress tracking
function upload() {
  cleanUp();

  const allDone = uploadProgress.value.every(
    (progress) => progress.percent === 1
  );

  uploadProgress.value = uploadProgress.value.map((progress) => ({
    ...progress,
    error: false,
    color: "green-2",
    percent: allDone === true ? 0 : progress.percent,
  }));

  updateUploadProgress();
}
</script>

<style lang="scss" scoped>
.body {
  height: 88vh;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
:deep(.q-chip) {
  border: 1px solid #00a881;
  background: #f0faf8;
  height: 5rem;
  font-size: medium;
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
</style>
