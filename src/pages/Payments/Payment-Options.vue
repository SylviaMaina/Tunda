<template>
  <div class="q-pa-sm">
    <div
      style="
        width: 100%;
        margin: 0 auto;
        height: 5rem;
        display: flex;
        align-items: center;
      "
    >
      <router-link to="/profile">
        <q-icon color="dark" name="chevron_left" size="20px"
      /></router-link>

      <div style="width: 90%; margin: 0 auto">
        <h6 class="no-margin no-padding text-weight-medium text-h6 text-center">
          Payment options
        </h6>
      </div>
    </div>
    <div class="body">
      <router-link to="/premium" style="text-decoration: none; color: black">
        <div class="bg-primary q-pa-sm" style="border-radius: 1rem">
          <q-badge rounded class="q-pa-sm bg-white text-primary q-ma-sm">
            Premium plan
          </q-badge>
          <div class="row justify-between q-pa-sm">
            <h6
              class="text-h6 text-white no-padding no-margin"
              style="line-height: 1.5rem"
            >
              $10
              <span class="text-caption text-white no-padding no-margin"
                >/ month</span
              >
            </h6>
            <h6
              class="text-h6 text-white no-padding no-margin"
              style="line-height: 1.5rem"
            >
              $99
              <span class="text-caption text-white no-padding no-margin"
                >/ Anually</span
              >
            </h6>
          </div>
          <h6 class="text-caption text-white q-pa-sm">
            Enjoy complete access to all our premium features at a low price
          </h6>
        </div>
      </router-link>
      <div
        class="q-pa-sm q-mt-md"
        style="height: 30rem; border-top: 1px solid #808080"
      >
        <h6>Select Payment Option</h6>
        <q-option-group :options="options" type="radio" v-model="group" />
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
          label="Confirm Payment"
          type="submit"
          color="primary"
          size="0.9rem"
          no-caps
          style="width: 9.6rem; height: 2.5rem"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const group = ref(null);

const options = [
  { label: "Mobile payment", value: "bat" },
  { label: "Paypal", value: "friend", color: "green" },
  { label: "Card", value: "upload", color: "red" },
];
</script>

<style lang="scss" scoped>
:deep(.q-radio) {
  border: 1px solid #808080;
  width: 100%;
  height: 4rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}
.body {
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
