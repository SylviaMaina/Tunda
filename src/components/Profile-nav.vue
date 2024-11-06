<template>
  <div
    style="
      width: 90%;
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
        Edit profile
      </h6>
    </div>
  </div>
  <q-tabs
    indicator-color="transparent"
    text-color="black"
    active-class="text-black"
    v-model="tab"
    no-caps
    flat
    class="bg-grey-5 text-grey-8"
    style="width: 100%"
  >
    <q-route-tab
      to="/personal"
      name="Pesonal details"
      label="Personal details"
      class="q-ma-none q-pa-none"
    />
    <q-route-tab
      to="/editinterests"
      name="Interests"
      label="Interests"
      class="q-ma-none q-pa-none"
    />
    <q-route-tab
      to="/editprofession"
      name="Profession"
      label="Profession"
      class="q-ma-none q-pa-none"
    />
  </q-tabs>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("personal");
</script>

<style lang="scss" scoped>
:deep(.q-tab--active) {
  background: white;
  margin: 0.2rem;
  padding: 0;
}
</style>
