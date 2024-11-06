<template>
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 1/5</h6>
        <h6 class="text-dark text-subtitle1">Skip</h6>
      </div>
      <q-linear-progress size="10px" value="0.2" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">
          What are your interests
        </h6>
        <h6 class="text-dark text-subtitle2">
          Meet people with similar interest
        </h6>
      </div>
      <div class="q-gutter-lg">
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
        <div>
          <h6 class="text-weight-bold text-subtitle1 q-py-sm">Category 2</h6>
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
        <div>
          <h6 class="text-weight-bold text-subtitle1 q-py-sm">Category 3</h6>
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
    </div>
    <div>
      <router-link to="/profession" style="text-decoration: none">
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

const model = ref(null);
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
</style>
