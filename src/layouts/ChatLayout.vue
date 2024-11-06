<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-page-container>
      <router-view />
      <MessageBox />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MessageBox from "../components/Message-box.vue";
</script>

<style scoped>
:deep(.q-layout__section--marginal) {
  background: white;
  height: 6rem;
}
</style>
