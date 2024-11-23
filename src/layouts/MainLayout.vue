<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view :user="user" />
      <Footernav />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Footernav from "../components/Footer-nav.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/useUserStore";

const user = ref(null);
const userData = useUserStore();

onMounted(async () => {
  await userData.fetchUserData();
  user.value = userData.user;
});
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
