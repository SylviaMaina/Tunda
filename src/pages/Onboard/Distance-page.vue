<template>
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 4/5</h6>
        <h6 class="text-dark text-subtitle1">Skip</h6>
      </div>
      <q-linear-progress size="10px" value="0.8" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">
          Set your distance preference
        </h6>
        <h6 class="text-dark text-subtitle2">
          Set the maximum distance you would like your connection to be in
        </h6>
      </div>
      <div>
        <q-badge color="black"> Distance (Km) </q-badge>

        <q-slider
          v-model="value"
          :step="4"
          label
          :label-value="value + ' ' + 'Km'"
          label-always
          switch-label-side
          color="black"
          class="q-py-sm"
        />
      </div>
    </div>

    <div>
      <router-link to="/images" style="text-decoration: none">
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

const value = ref(0);
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
:deep(.q-badge) {
  background-color: white !important;
  font-size: 1rem;
  color: black;
}
</style>
