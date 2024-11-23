<template>
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 7/7</h6>
        <router-link to="/home" style="text-decoration: none; color: black">
          <h6 class="text-dark text-subtitle1">Skip</h6></router-link
        >
      </div>
      <q-linear-progress size="10px" value="1.0" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6
          class="q-py-sm no-padding no-margin"
          style="font-size: 22px; font-weight: 700"
        >
          Upload images
        </h6>
        <h6
          class="text-dark no-padding no-margin"
          style="font-size: 13px; font-weight: 400"
        >
          Let people see whom they are talking to
        </h6>
      </div>
      <div class="q-gutter-md">
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
      </div>
    </div>
    <div>
      <q-btn
        label="Next"
        type="submit"
        @click="uploadFiles"
        color="primary"
        size="13px"
        no-caps
        style="width: 100%; margin: 0 auto; height: 2.5rem"
      />
    </div>
  </div>
</template>

<script setup>
import AuthSession from "app/Storage/AuthSession";
import axios from "axios";
import { Loading } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const files = ref([]);
const error = ref(null);
const router = useRouter();

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
      "http://212.47.72.98:3001/api/v1/profile/photos/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: ` ${token}`,
        },
      }
    );
    if (res.data.success) {
      Loading.hide();
      router.push("/home");
    }
    files.value = [];
  } catch (err) {
    Loading.hide();
    console.error("Error uploading files", err);
    error.value = err.response?.data?.message || "Error uploading files";
  }
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
