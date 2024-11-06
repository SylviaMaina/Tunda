<template>
  <div class="body">
    <div>
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">Edit profession</h6>
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
        size="0.9rem"
        no-caps
        style="width: 9.6rem; height: 2.5rem"
      />
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
  height: 80vh;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
