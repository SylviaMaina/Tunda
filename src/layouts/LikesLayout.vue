<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <TopNav />
      <router-view />
      <Footernav />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import TopNav from "../components/Top-nav.vue";
import Footernav from "../components/Footer-nav.vue";
</script>

<style scoped>
.background-circle {
  position: absolute;
  top: -5%;
  left: -3rem;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: rgba(231, 199, 37, 0.12); /* Adjust color as needed */
}
.profile-pic {
  width: 2rem;
  height: 2rem;
  background: transparent;
  border-radius: 50%;
}
</style>
