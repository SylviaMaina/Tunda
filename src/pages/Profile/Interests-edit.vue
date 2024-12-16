<template>
  <div class="body" v-if="userData?.user">
    <div class="" style="overflow-y: auto; height: 42rem">
      <div>
        <h6 class="q-py-sm" style="font-size: 18px; font-weight: 600">
          Your Interests
        </h6>
        <div
          style="
            height: max-content;
            display: grid;
            grid-area: auto;
            grid-template-columns: repeat(3, 8rem);
          "
        >
          <div v-for="category in userData.user.interests" :key="category.name">
            <div class="q-gutter-md q-mb-md">
              <q-btn-toggle
                v-for="interest in category.interests.filter(
                  (item) => item.selected
                )"
                :key="interest.value"
                v-model="interest.selected"
                no-caps
                size="12.5px"
                flat
                style="
                  border: 1px solid #ff6f61;
                  height: 2.5rem;
                  color: #ff6f61;
                  width: 6.5rem;
                "
                toggle-color="primary"
                :options="[{ label: interest.label, value: interest.value }]"
              />
            </div>
          </div>
        </div>
      </div>
      <h6 style="font-size: 18px; font-weight: 600">Select other interests</h6>
      <div
        class="q-my-sm"
        v-for="item in userData.user.interests"
        :key="item.name"
      >
        <div>
          <h6 class="q-py-sm" style="font-size: 18px; font-weight: 600">
            {{ item.name }}
          </h6>
          <div
            style="display: grid; grid-template-columns: repeat(3, 7rem)"
            class="q-gutter-md"
          >
            <div v-for="content in item.interests" :key="content.label">
              <q-btn
                :flat="!isSelected(item.name, content.value)"
                :color="
                  isSelected(item.name, content.value) ? 'primary' : 'gray'
                "
                @click="toggleSelection(item.name, content.value)"
                size="12.5px"
                style="border: 1px solid gray; height: 2.5rem; width: 6.5rem"
                no-caps
              >
                {{ content.label }}
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      style="
        display: flex;
        justify-content: space-between;
        width: 94%;
        padding-top: 1rem;
      "
    >
      <q-btn
        label="Discard changes"
        type="submit"
        size="0.9rem"
        no-caps
        flat
        class="q-mr-sm"
        style="width: 9.6rem; height: 2.5rem; border: 1px solid grey"
        @click="discardChanges"
      />
      <q-btn
        label="Update details"
        type="submit"
        color="primary"
        size="0.9rem"
        no-caps
        style="width: 9.6rem; height: 2.5rem"
        @click="updateInterests"
      />
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { Loading, useQuasar } from "quasar";
import { useUserStore } from "src/stores/useUserStore";
import { onMounted } from "vue";
import { ref } from "vue";

const selectedInterests = ref({});
const userData = useUserStore();
const interest = ref([]);
const error = ref(null);
const $q = useQuasar();

onMounted(async () => {
  await userData.fetchUserData();
  interest.value = userData.user.interests;
});

const discardChanges = () => {
  userData.fetchUserData();
};

const isSelected = (category, value) => {
  return selectedInterests.value[category]?.includes(value);
};

const toggleSelection = (category, value) => {
  if (!selectedInterests.value[category]) {
    selectedInterests.value[category] = [];
  }
  const index = selectedInterests.value[category].indexOf(value);
  if (index === -1) {
    selectedInterests.value[category].push(value); // Add value if not selected
  } else {
    selectedInterests.value[category].splice(index, 1); // Remove value if selected
  }
};

// Prepare payload for submission
const updateInterests = async () => {
  Loading.show();
  try {
    const interestsPayload = {
      interests: interest.value.map((item) => ({
        name: item.name,
        interests: item.interests.map((content) => ({
          label: content.label,
          value: content.value,
          selected: isSelected(item.name, content.value),
        })),
      })),
    };

    const res = await apiClient.patch("/profile/update/", interestsPayload);

    if (res.data.success) {
      Loading.hide();
      $q.notify({
        color: "green",
        textColor: "white",
        message: "Interests have been updated successfully!",
        icon: "check_circle",
        position: "top",
        timeout: 2000,
      });
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
</script>

<style lang="scss" scoped>
.body {
  height: 40rem;
  width: 95%;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
