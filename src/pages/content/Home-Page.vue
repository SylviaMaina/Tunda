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
    <q-icon color="black" name="o_tune" size="40px" @click="filter = true" />
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
        bottom: 8%;
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      "
    >
      <div style="width: 90%; height: 5rem; margin-left: 0.5rem">
        <div class="row flex-center justify-between">
          <h6 class="text-white q-ma-sm text-weight-bold">Jane Kimani, 24</h6>
          <router-link to="/about" style="text-decoration: none">
            <div
              style="
                width: 2rem;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                border-radius: 100%;
                background: #ffffff29;
              "
            >
              <q-icon name="more_vert" color="white" size="1.2rem" />
            </div>
          </router-link>
        </div>
        <div
          class="flex flex-center justify-between q-mt-sm"
          style="width: 70%"
        >
          <q-badge transparent color="info" class="q-pa-sm" label="Cycling" />
          <q-badge transparent color="info" class="q-pa-sm" label="Hiking" />
          <q-badge
            transparent
            color="info"
            class="q-pa-sm"
            label="Sky diving"
          />
        </div>
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
        @click="showNotif"
      >
      </q-fab>
      <q-fab
        size="25px"
        icon="favorite"
        color="primary"
        class="q-mx-sm"
        @click="showLike"
      >
      </q-fab>
      <q-fab icon="grade" color="info" text-color="secondary" padding="8px">
      </q-fab>
    </div>
    <q-dialog v-model="filter" position="bottom">
      <q-card style="width: 90%; height: 70%; margin: 0 auto" class="q-px-sm">
        <div
          style="
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>
            <h6 class="no-margin no-padding text-weight-bold">Filter</h6>
          </div>
        </div>
        <div>
          <h6 class="text-dark text-subtitle1 q-py-sm">Location</h6>
          <q-input
            style="width: 100%"
            outlined
            class="text-dark"
            placeholder="Search"
          >
            <template v-slot:prepend>
              <q-icon name="o_search" class="q-pl-sm" />
            </template>
          </q-input>
        </div>
        <div style="height: 6rem; width: 90%; margin: 0 auto; margin-top: 2rem">
          <q-badge color="black"> Distance (Km) </q-badge>

          <q-slider
            v-model="value"
            :step="4"
            label
            :label-value="value + ' ' + 'Km'"
            label-always
            switch-label-side
            color="primary"
            class="q-py-sm"
          />
        </div>
        <div style="height: 6rem; width: 90%; margin: 0 auto; margin-top: 2rem">
          <q-badge color="black"> Age </q-badge>

          <q-range
            v-model="standard"
            :min="0"
            :max="100"
            label
            :label-value="value + ' ' + 'years'"
            label-always
            switch-label-side
            color="primary"
            class="q-py-sm"
          />
        </div>
        <div>
          <h6 class="text-weight-bold text-subtitle1 q-py-sm">Interested In</h6>
          <div class="q-gutter-lg row flex-center">
            <q-btn-toggle
              v-model="model"
              no-caps
              flat
              style="
                border: 1px solid gray;
                width: 6rem;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              toggle-color="primary"
              :options="[{ slot: 'one', value: 'three' }]"
            >
              <template v-slot:one>
                <q-icon size="26px" name="female" color="primary" /> </template
            ></q-btn-toggle>
            <q-btn-toggle
              v-model="model"
              no-caps
              flat
              style="
                border: 1px solid gray;
                width: 6rem;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              toggle-color="primary"
              :options="[{ slot: 'two', value: 'three' }]"
            >
              <template v-slot:two>
                <q-icon size="26px" name="male" color="primary" /> </template
            ></q-btn-toggle>
            <q-btn-toggle
              v-model="model"
              no-caps
              flat
              style="
                border: 1px solid gray;
                width: 6rem;
                display: flex;
                align-items: center;
              "
              toggle-color="primary"
              :options="[{ slot: 'three', value: 'three' }]"
            >
              <template v-slot:three>
                <q-icon
                  size="26px"
                  name="agender"
                  color="primary"
                  class="text-center"
                /> </template
            ></q-btn-toggle>
          </div>
        </div>
        <div
          style="display: flex; justify-content: space-between; width: 100%"
          class="q-my-lg"
        >
          <q-btn
            label="Clear All"
            type="submit"
            color="grey"
            size="15px"
            no-caps
            style="width: 40%"
          />
          <q-btn
            label="Apply"
            type="submit"
            color="primary"
            size="15px"
            no-caps
            style="width: 40%"
          /></div
      ></q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const filter = ref(false);
const value = ref(0);
const standard = ref({ min: 18, max: 100 });
const model = ref(null);
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

<style lang="scss" scoped>
:deep(.q-field__control) {
  padding: 0;
  height: 3rem;
  display: flex;
  align-items: center;
}
:deep(.q-badge) {
  background-color: white !important;
  font-size: 0.9rem;
  color: black;
}
@keyframes pulsate {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulsate-icon {
  animation: pulsate 1s infinite;
}
</style>
