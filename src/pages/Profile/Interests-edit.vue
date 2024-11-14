<template>
  <div class="body" v-if="userData?.user">
    <div class="" style="overflow-y: auto; height: 80vh">
      <div>
        <h6 class="text-weight-bold text-subtitle1 q-py-sm">Your Interests</h6>
        <div
          style="
            height: 20vh;
            display: grid;
            grid-template-columns: repeat(3, 7.8rem);
          "
        >
          <div v-for="category in userData.user.interests" :key="category.name">
            <div class="q-gutter-md q-mb-md">
              <q-btn-toggle
                v-for="interest in category.interests.slice(0, 1)"
                :key="interest.value"
                v-model="interest.selected"
                no-caps
                flat
                style="border: 1px solid gray; height: 2.5rem"
                toggle-color="primary"
                :options="[{ label: interest.label, value: interest.value }]"
              />
            </div>
          </div>
        </div>
      </div>
      <h6>Select othe interests</h6>
      <div class="q-my-sm" v-for="item in interest" :key="item.name">
        <div>
          <h6 class="text-weight-bold text-subtitle1 q-py-sm">
            {{ item.name }}
          </h6>
          <div
            style="display: grid; grid-template-columns: repeat(3, 7rem)"
            class="q-gutter-md"
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

    <div style="display: flex; justify-content: space-between; width: 94%">
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
import { useUserStore } from "src/stores/useUserStore";
import { onMounted } from "vue";
import { ref } from "vue";

const userData = useUserStore();
const interest = ref([]);

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

onMounted(() => {
  userData.fetchUserData();
});

const discardChanges = () => {
  userData.fetchUserData();
};

const updateInterests = async () => {
  const updatedInterests = userData.user.interests.map((category) => {
    return {
      name: category.name,
      interests: category.interests.filter((interest) => interest.selected),
    };
  });

  try {
    const res = await apiClient.patch("/profile/update/", {
      interests: updatedInterests,
    });

    if (res.data.success) {
      console.log("Interests updated successfully");
    } else {
      console.error(res.data.message || "Error updating interests");
    }
  } catch (err) {
    console.error("Failed to update interests:", err);
  }
};
</script>

<style lang="scss" scoped>
.body {
  height: 80vh;
  width: 95vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
