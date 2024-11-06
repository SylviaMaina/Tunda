<template>
  <div class="body">
    <div class="q-py-sm">
      <div>
        <h6 class="text-weight-medium text-h6 q-py-sm">Personal details</h6>
      </div>
      <q-form class="q-gutter-lg">
        <q-input
          outlined
          label="Full Name"
          type="text"
          placeholder="Please enter"
        />
        <q-input outlined type="email" label="Email" />
        <q-input
          outlined
          label="Mobile Number"
          type="tel"
          placeholder="Please enter"
        />
        <q-select outlined :options="options" label="Gender" />
        <q-input outlined type="date" label="DoB" />
      </q-form>
    </div>

    <div
      style="display: flex; justify-content: space-between; width: 94%"
      class="q-my-lg"
    >
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

<script setup></script>

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
