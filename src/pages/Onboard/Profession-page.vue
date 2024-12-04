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
        <h6 class="text-dark text-subtitle1">Step 4/7</h6>
        <router-link to="/looking" style="text-decoration: none; color: black">
          <h6 class="text-dark text-subtitle1">Skip</h6></router-link
        >
      </div>
      <q-linear-progress size="10px" value="0.6" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6 class="q-py-sm no-margin" style="font-size: 22px; font-weight: 700">
          Tell us about your profession
        </h6>
        <h6
          class="text-dark no-padding no-margin"
          style="font-size: 13px; font-weight: 400"
        >
          Meet people with similar interest
        </h6>
      </div>
      <div class="q-gutter-lg">
        <q-select
          outlined
          clearable
          v-model="model"
          :options="options"
          label="Profession"
        />
      </div>
    </div>
    <div>
      <q-btn
        label="Next"
        type="submit"
        color="primary"
        size="13px"
        @click="Profession"
        no-caps
        style="width: 100%; margin: 0 auto; height: 2.5rem"
      />
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { Loading } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const model = ref(null);
const error = ref(null);
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
  "Secretary",
  "Pharmacist",
  "Florist",
  "Model",
  "Student",
  "Optician",
  "Police oficer",
  "Scientist",
  "Teacher",
];

const Profession = async () => {
  Loading.show();
  try {
    const res = await apiClient.patch("/profile/update/", {
      profession: model.value,
    });
    if (res.data.success) {
      Loading.hide();
      router.push("/looking");
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
  height: 45rem;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
