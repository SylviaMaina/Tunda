<template>
  <q-header class="bg-transparent q-mb-sm" flat>
    <div
      style="
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0 auto;
      "
    >
      <h6 class="no-margin q-pa-sm text-weight-medium text-h6 text-black">
        Likes
      </h6>
    </div>

    <q-tabs
      indicator-color="transparent"
      text-color="black"
      active-class="text-black bg-info"
      v-model="tab"
      no-caps
      flat
      class="bg-transparent text-grey-8 shadow-2"
      style="width: 100%"
    >
      <q-tab
        to="/likes"
        name="likes"
        label="10 Likes"
        class="q-ma-none q-pa-none"
        style="width: 50%"
      />
      <q-tab
        to="/likesent"
        name="likesent"
        label="4 Likes Sent"
        class="q-ma-none q-pa-none"
        style="width: 50%"
      />
    </q-tabs>
  </q-header>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("likes");
</script>

<style lang="scss" scoped></style>
