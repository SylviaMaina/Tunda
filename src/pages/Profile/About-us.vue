<template>
  <div class="q-mx-md">
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
          About us
        </h6>
      </div>
    </div>
    <div class="q-py-md">
      <h6 class="text-grey-5 text-subtitle2">Last updated Oct 01, 2024</h6>
    </div>
    <h6 class="text-primary text-h5 q-py-sm">About us</h6>
    <q-scroll-area style="height: 70vh">
      <div v-for="n in 100" :key="n" class="q-py-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
