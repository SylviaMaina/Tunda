<template>
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 3/5</h6>
        <h6 class="text-dark text-subtitle1">Skip</h6>
      </div>
      <q-linear-progress size="10px" value="0.6" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">
          What are you looking for
        </h6>
        <h6 class="text-dark text-subtitle2">
          Meet people with similar interest
        </h6>
      </div>
      <div style="height: 80%" class="full-width">
        <q-btn-toggle
          v-model="model"
          class="no-padding no-margin"
          style="
            border-radius: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
          no-caps
          toggle-color="accent"
          :options="[{ value: 'three', slot: 'three' }]"
        >
          <template v-slot:three>
            <div
              style="
                padding: 0.5rem;
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
                justify-content: space-between;
              "
            >
              <q-icon
                right
                name="o_favorite"
                size="2.5rem"
                color="white"
                class="q-pa-sm bg-primary"
                style="border-radius: 2rem"
              />

              <div
                class="text-start q-ml-sm"
                style="
                  display: flex;
                  width: 90%;
                  flex-direction: column;
                  align-items: start;
                  justify-content: space-between;
                "
              >
                <h6>Love</h6>
                <h6 class="text-subtitle1">I am not here to play</h6>
              </div>
            </div>
          </template>
        </q-btn-toggle>
        <q-btn-toggle
          v-model="model"
          class="q-my-lg"
          style="
            border-radius: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
          no-caps
          toggle-color="accent"
          :options="[{ value: 'four', slot: 'three' }]"
        >
          <template v-slot:three>
            <div
              style="
                padding: 0.5rem;
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
                justify-content: space-between;
              "
            >
              <q-icon
                right
                name="o_favorite"
                size="2.5rem"
                color="white"
                class="q-pa-sm bg-primary"
                style="border-radius: 2rem"
              />
              <div
                class="text-start q-ml-sm"
                style="
                  display: flex;
                  width: 90%;
                  flex-direction: column;
                  align-items: start;
                  justify-content: space-between;
                "
              >
                <h6>Fun</h6>
                <h6 class="text-subtitle1">I am here for fun</h6>
              </div>
            </div>
          </template>
        </q-btn-toggle>
        <q-btn-toggle
          v-model="model"
          class="q-my-lg"
          style="
            border-radius: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
          no-caps
          toggle-color="accent"
          :options="[{ value: 'three', slot: 'three' }]"
        >
          <template v-slot:three>
            <div
              style="
                padding: 0.5rem;
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
                justify-content: space-between;
              "
            >
              <q-icon
                right
                name="o_favorite"
                size="2.5rem"
                color="white"
                class="q-pa-sm bg-primary"
                style="border-radius: 2rem"
              />

              <div
                class="text-start q-ml-sm"
                style="
                  display: flex;
                  width: 90%;
                  flex-direction: column;
                  align-items: start;
                  justify-content: space-between;
                "
              >
                <h6>Friends</h6>
                <h6 class="text-subtitle1">I am here for fun</h6>
              </div>
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>
    <div>
      <router-link to="/distance" style="text-decoration: none">
        <q-btn
          label="Next"
          type="submit"
          color="primary"
          size="20px"
          no-caps
          style="width: 100%; margin: 0 auto"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const model = ref("three");
</script>

<style lang="scss" scoped>
.body {
  height: 88vh;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
:deep(.q-btn) {
  padding: 0;
}
</style>
