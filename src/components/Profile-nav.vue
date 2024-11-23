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
      <h6
        class="no-margin no-padding text-center"
        style="font-weight: 600; font-size: 18px"
      >
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
    inline-label
    flat
    class="text-grey-8 q-pa-sm"
    style="width: 100%; background-color: #eeeeee"
  >
    <q-route-tab
      to="/personal"
      name="Pesonal details"
      label="Personal details"
      class="q-ma-xs q-pa-sm"
    />
    <q-route-tab
      to="/editbio"
      name="Bio details"
      label="Bio details"
      class="q-ma-xs q-pa-sm"
    />
    <q-route-tab
      to="/editinterests"
      name="Interests"
      label="Interests"
      class="q-ma-xs q-pa-sm"
    />
    <q-route-tab
      to="/editprofession"
      name="Profession"
      label="Profession"
      class="q-ma-xs q-pa-sm"
    />
    <q-route-tab
      to="/editimages"
      name="Images"
      label="Images"
      class="q-ma-xs q-pa-sm"
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
  padding: 0.2rem;
}
</style>
