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
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 3/7</h6>
        <router-link
          to="/profession"
          style="text-decoration: none; color: black"
        >
          <h6 class="text-dark text-subtitle1">Skip</h6></router-link
        >
      </div>

      <q-linear-progress size="10px" value="0.5" class="q-mt-sm" rounded />

      <div class="q-py-md">
        <h6
          class="q-py-sm no-padding no-margin"
          style="font-size: 22px; font-weight: 700"
        >
          What are your interests
        </h6>
        <h6
          class="text-dark no-padding no-margin"
          style="font-size: 13px; font-weight: 400"
        >
          Meet people with similar interests
        </h6>
      </div>
      <div style="overflow-y: auto; overflow-x: hidden; height: 58vh">
        <div class="q-my-sm" v-for="item in interest" :key="item.name">
          <div>
            <h6 class="text-weight-bold text-subtitle1 q-py-sm">
              {{ item.name }}
            </h6>
            <div
              style="display: grid; grid-template-columns: repeat(3, 8rem)"
              class="q-gutter-sm"
            >
              <div v-for="content in item.interests" :key="content.label">
                <q-btn-toggle
                  v-model="content.selected"
                  no-caps
                  size="13px"
                  flat
                  style="
                    border: 1px solid gray;
                    height: 2.5rem;
                    width: max-content;
                  "
                  toggle-color="primary"
                  :options="[{ label: content.label, value: content.value }]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-btn
        label="Next"
        type="submit"
        color="primary"
        size="13px"
        @click="submitInterests"
        no-caps
        style="width: 100%; margin: 0 auto; height: 2.5rem"
      />
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Loading } from "quasar";

const error = ref(null);
const interest = ref([]);
const router = useRouter();

// Fetch interests from the API
const fetchInterests = async () => {
  try {
    const response = await apiClient.get("profile/selections/?type=interests");
    if (response.data.success) {
      interest.value = response.data.results.map((item) => ({
        ...item,
        interests: item.interests.map((content) => ({
          ...content,
          selected: content.selected || false,
        })),
      }));
      console.log(response.data.results);
    }
  } catch (error) {
    console.error("Error fetching interests:", error);
  }
};

onMounted(fetchInterests);

// Submit interests to the backend
const submitInterests = async () => {
  Loading.show();
  try {
    const interestsPayload = {
      interests: interest.value.map((item) => ({
        name: item.name,
        interests: item.interests.map((content) => ({
          label: content.label,
          value: content.value,
          selected: content.selected,
        })),
      })),
    };

    const res = await apiClient.patch("/profile/update/", interestsPayload);

    if (res.data.success) {
      Loading.hide();
      router.push("/profession");
    } else {
      error.value = res.data.message || "Error updating interests";
    }
  } catch (err) {
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Update failed:", err);
    Loading.hide();
  }
};

const dismissError = () => {
  error.value = null;
  Loading.hide();
};
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
</style>
