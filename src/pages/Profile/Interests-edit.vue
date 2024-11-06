<template>
  <div class="body">
    <div class="q-gutter-sm">
      <div>
        <h6 class="text-weight-bold text-subtitle1 q-py-sm">Your Interests</h6>
        <div class="q-gutter-sm">
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
      <div class="">
        <h6 class="text-weight-bold text-subtitle1 q-py-sm">
          Select other interests
        </h6>
      </div>
      <div>
        <h6 class="text-weight-bold text-subtitle2 q-py-sm">Category 1</h6>
        <div class="q-gutter-sm">
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
        <h6 class="text-weight-bold text-subtitle2 q-py-sm">Category 2</h6>
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

    <div style="display: flex; justify-content: space-between; width: 94%">
      <q-btn
        label="Discard changes"
        type="submit"
        size="0.9rem"
        no-caps
        flat
        class="q-mr-sm"
        style="width: 9.6rem; height: 2.5rem; border: 1px solid grey"
      />
      <q-btn
        label="Update details"
        type="submit"
        color="primary"
        size="0.9rem"
        no-caps
        style="width: 9.6rem; height: 2.5rem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const model = ref(null);
</script>

<style lang="scss" scoped>
.body {
  height: 80vh;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
