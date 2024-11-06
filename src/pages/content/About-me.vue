<template style="width: screen; height: 100vh">
  <div class="" style="width: 95%; margin: 0 auto">
    <div
      style="
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      "
    >
      <div style="width: 100%; height: 5rem; margin-left: 0.5rem">
        <div class="row flex-center justify-between">
          <h6 class="text-black q-ma-sm text-weight-bold">Jane Kimani, 24</h6>
          <router-link to="/home" style="text-decoration: none">
            <div
              style="
                width: 2rem;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                border-radius: 100%;
              "
            >
              <q-icon color="black" name="close" size="20px" />
            </div>
          </router-link>
        </div>

        <div
          class="flex flex-center justify-between q-mt-sm"
          style="width: 70%"
        >
          <q-badge transparent color="grey" class="q-pa-sm" label="Cycling" />
          <q-badge transparent color="grey" class="q-pa-sm" label="Hiking" />
          <q-badge
            transparent
            color="grey"
            class="q-pa-sm"
            label="Sky diving"
          />
        </div>
      </div>
    </div>
    <div class="q-my-lg">
      <h6 class="q-ma-sm text-dark text-subtitle1">Bio</h6>
      <h6 class="q-ma-sm text-subtitle2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptates
        illo excepturi eligendi doloribus voluptatem odio explicabo, rerum non
        totam quae molestias numquam deleniti inventore ad unde sint ullam
        architecto quidem. Corrupti perspiciatis, veritatis ipsa commodi modi
        accusantium et vitae similique quia voluptas sunt voluptates consectetur
        in ipsam dolores minus, suscipit repellat nesciunt illo?
      </h6>
      <div>
        <h6 class="text-weight-bold text-subtitle1 q-py-sm">Category 1</h6>
        <div class="q-gutter-lg">
          <q-btn-toggle
            v-model="model"
            no-caps
            flat
            style="border: 1px solid gray"
            toggle-color="primary"
            :options="[{ label: 'Three', value: 'three' }]"
          />
          <q-btn-toggle
            v-model="model"
            no-caps
            flat
            style="border: 1px solid gray"
            toggle-color="primary"
            :options="[{ label: 'Fourteen', value: 'three' }]"
          />
          <q-btn-toggle
            v-model="model"
            no-caps
            flat
            style="border: 1px solid gray"
            toggle-color="primary"
            :options="[{ label: 'Three', value: 'three' }]"
          />
          <q-btn-toggle
            v-model="model"
            no-caps
            flat
            style="border: 1px solid gray"
            toggle-color="primary"
            :options="[{ label: 'Three', value: 'three' }]"
          />
          <q-btn-toggle
            v-model="model"
            no-caps
            flat
            style="border: 1px solid gray"
            toggle-color="primary"
            :options="[{ label: 'Three', value: 'three' }]"
          />
        </div>
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        left: 2rem;
        bottom: 2rem;
        position: absolute;
      "
    >
      <q-fab
        icon="close"
        color="white"
        text-color="black"
        padding="8px"
        class="q-mx-sm"
        @click="showNotif"
      >
      </q-fab>
      <q-fab
        size="25px"
        icon="favorite"
        color="primary"
        class="q-mx-sm"
        @click="showLike"
      ></q-fab>
      <q-fab icon="grade" color="info" text-color="secondary" padding="8px">
      </q-fab>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

const showNotif = () => {
  $q.notify({
    icon: "heart_broken",
    iconSize: "18rem",
    textColor: "red",
    color: "transparent",
    position: "center",
    timeout: 1000,
  });
};
const showLike = () => {
  $q.notify({
    icon: "favorite",
    iconSize: "18rem",
    textColor: "red",
    color: "transparent",
    position: "center",
    timeout: 2500,
    classes: "pulsate-icon",
  });
};
</script>

<style lang="scss" scoped></style>
