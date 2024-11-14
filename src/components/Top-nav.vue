<template>
  <q-header
    class="bg-transparent q-mb-sm"
    flat
    v-if="info?.length || data?.length"
  >
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
      <q-route-tab
        to="/likes"
        name="likes"
        :label="`${info?.length} Likes`"
        class="q-ma-none q-pa-none"
        style="width: 50%"
      />
      <q-route-tab
        to="/likesent"
        name="likesent"
        :label="`${data?.length} Likes Sent`"
        class="q-ma-none q-pa-none"
        style="width: 50%"
      />
    </q-tabs>
  </q-header>
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
      <q-route-tab
        to="/likes"
        name="likes"
        :label="`${info?.length} Likes`"
        class="q-ma-none q-pa-none"
        style="width: 50%"
      />
      <q-route-tab
        to="/likesent"
        name="likesent"
        :label="`${data?.length} Likes Sent`"
        class="q-ma-none q-pa-none"
        style="width: 50%"
      />
    </q-tabs>
  </q-header>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { apiClient } from "app/Storage/api";

const tab = ref("likes");

const info = ref(null);
const data = ref(null);

const fetchInterests = async () => {
  try {
    const response = await apiClient.get("matches/");
    if (response.data.success) {
      info.value = response.data.results.docs;
      console.log(info.value.length);
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};

const fetchRequests = async () => {
  try {
    const response = await apiClient.get("matches/requests/");
    if (response.data.success) {
      data.value = response.data.results.docs;
      console.log(data.value.length);
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};
onMounted(fetchInterests);
onMounted(fetchRequests);
</script>

<style lang="scss" scoped></style>
