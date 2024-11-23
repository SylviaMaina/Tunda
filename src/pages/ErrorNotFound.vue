<template>
  <div class="fullscreen text-center q-pa-md flex flex-center relative">
    <img
      src="../assets/Asset 1 1.png"
      alt="page not found"
      style="opacity: 0.2"
    />
    <div class="absolute">
      <h6 style="font-size: 4vh; font-weight: 700" class="q-pa-md">Oops!</h6>

      <h6 class="text-caption text-dark q-pa-md">
        We cannot find the page you are looking for
      </h6>

      <q-btn
        text-color="primary"
        unelevated
        flat
        to="/home"
        icon="eva-arrow-back-outline"
        label="Go back"
        style="height: 2.5rem; font-size: 18px"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "ErrorNotFound",
});
</script>
