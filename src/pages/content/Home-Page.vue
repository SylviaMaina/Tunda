<template style="width: screen; height: 100vh">
  <div
    style="
      width: 90%;
      margin: 0 auto;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <div
      style="
        width: 50%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <q-icon color="black" name="o_location_on" size="40px" />
      <div
        style="
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: start;
        "
      >
        <h6 class="no-margin no-padding text-weight-bold">Location</h6>
        <h6 class="no-margin text-dark text-subtitle2">Nairobi,Kenya</h6>
      </div>
    </div>
    <q-icon color="dark" name="o_notifications" size="40px" />
  </div>
  <div
    style="
      width: 90%;
      margin: 0 auto;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <q-input style="width: 80%" outlined class="text-dark" placeholder="Search">
      <template v-slot:prepend>
        <q-icon name="o_search" class="q-pl-sm" />
      </template>
    </q-input>
    <q-icon color="black" name="o_tune" size="40px" />
  </div>
  <div style="width: 90vw; margin: 0 auto; height: 60vh; position: relative">
    <img
      src="src\assets\Rectangle.png"
      alt=".."
      style="
        height: 100%;
        width: 100%;
        margin: 0 auto;
        object-fit: cover;
        border-radius: 2rem;
      "
    />
    <div
      style="
        position: absolute;
        bottom: -10%;
        width: 70%;
        height: 10rem;
        left: 0.5rem;
      "
    >
      <h6 class="text-white q-ma-sm">Jane Kimani, 24</h6>
      <div class="flex flex-center justify-between">
        <q-badge transparent color="info" class="q-pa-sm" label="Cycling" />
        <q-badge transparent color="info" class="q-pa-sm" label="Hiking" />
        <q-badge transparent color="info" class="q-pa-sm" label="Sky diving" />
      </div>
    </div>
    <div
      style="
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        bottom: -2rem;
        position: absolute;
      "
    >
      <q-fab
        icon="close"
        color="white"
        text-color="black"
        padding="8px"
        class="q-mx-sm"
      >
      </q-fab>
      <q-fab size="25px" icon="favorite" color="primary" class="q-mx-sm">
      </q-fab>
      <q-fab icon="grade" color="info" text-color="secondary" padding="8px">
      </q-fab>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
:deep(.q-field__control) {
  padding: 0;
  height: 3rem;
  display: flex;
  align-items: center;
}
</style>
