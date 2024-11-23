<template>
  <q-footer class="bg-transparent" flat>
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
      active-color="primary"
      style="display: flex; justify-content: space-between"
      flat
      class="bg-transparent text-grey-8 shadow-2"
    >
      <q-route-tab
        to="/home"
        name="home"
        icon="eva-home-outline"
        icon-size="2rem"
        class="q-ma-none q-pa-none"
      />
      <q-route-tab
        to="/chat"
        name="chat"
        icon="eva-message-circle-outline"
        icon-size="2rem"
        class="q-ma-none q-pa-none"
      />
      <q-route-tab
        to="/likes"
        name="favorite"
        icon="eva-heart-outline"
        icon-size="2rem"
        class="q-ma-none q-pa-none"
      />
      <q-route-tab
        to="/profile"
        name="person"
        icon="eva-person-outline"
        icon-size="2rem"
        class="q-ma-none q-pa-none"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("home");
</script>

<style lang="scss" scoped></style>
