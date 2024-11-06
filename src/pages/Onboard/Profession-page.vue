<template>
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 2/5</h6>
        <h6 class="text-dark text-subtitle1">Skip</h6>
      </div>
      <q-linear-progress size="10px" value="0.4" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">
          Tell us about your profession
        </h6>
        <h6 class="text-dark text-subtitle2">
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
      <router-link to="/looking" style="text-decoration: none">
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
import { ref } from "vue";
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
];
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
