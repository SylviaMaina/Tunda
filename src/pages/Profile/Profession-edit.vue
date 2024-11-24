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
      <div class="q-py-md">
        <h6 class="q-py-sm" style="font-size: 18px; font-weight: 600">
          Edit profession
        </h6>
      </div>
      <div class="q-gutter-lg">
        <q-select
          outlined
          clearable
          v-model="model"
          :options="options"
          :label="userData.user.profession"
        />
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
      />
      <q-btn
        label="Update details"
        type="submit"
        color="primary"
        @click="Profession"
        size="0.9rem"
        no-caps
        style="width: 9.6rem; height: 2.5rem"
      />
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { Loading } from "quasar";
import { useUserStore } from "src/stores/useUserStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const model = ref(null);
const options = [
  "Engineer",
  "Lawyer",
  "Accoutant",
  "Architect",
  "Electrician",
  "Chef",
  "Software Developer",
  "Dentist",
  "Butcher",
  "Physician",
  "Economist",
  "Dietitians and nutritionists",
  "Bartender",
  "Designer",
  "Artist",
  "SEcretary",
  "Pharmacist",
  "Florist",
  "Model",
  "Student",
  "Optician",
  "Police oficer",
  "Scientist",
  "Teacher",
];
const userData = useUserStore();
const error = ref(null);

onMounted(() => {
  userData.fetchUserData();
});

const Profession = async () => {
  Loading.show();
  try {
    const res = await apiClient.patch("/profile/update/", {
      profession: model.value,
    });
    if (res.data.success) {
      Loading.hide();
      router.push("/profile");
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
  height: 40rem;
  width: 95%;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
