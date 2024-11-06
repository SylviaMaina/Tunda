<template>
  <div class="q-pa-md">
    <h6 class="text-weight-bold text-h5 q-py-sm">Create an account</h6>
    <h6 class="text-dark text-subtitle2">Please provide your bio data...</h6>
  </div>
  <div class="body">
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
      <q-input
        outlined
        type="password"
        placeholder="Please enter"
        label="Password"
      />
      <q-input
        outlined
        type="password"
        placeholder="Please enter"
        label="Confirm password"
      />

      <q-checkbox
        v-model="right"
        label="I understand and agree to all  Terms and Conditions, Policies"
      />
      <div>
        <router-link to="/interests" style="text-decoration: none">
          <q-btn
            label="Next"
            type="submit"
            color="primary"
            style="width: 100%; margin: 0 auto"
          />
        </router-link>
      </div>
    </q-form>
    <div>
      <h6 class="text-subtitle2 flex flex-center">
        Already have an account?<span
          class="q-ml-sm text-weight-bold text-subtitle2 text-black"
          ><router-link to="signup" style="text-decoration: none"
            >Sign in</router-link
          ></span
        >
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const model = ref(null);
const left = ref(true);

const options = ["Female", "Male"];
</script>

<style lang="scss" scoped>
.body {
  height: 88vh;
  width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
