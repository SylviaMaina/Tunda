<template>
  <q-banner
    v-if="error"
    class="bg-negative text-red q-ma-sm"
    style="border: 1px solid red"
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      "
    >
      <q-icon
        name="error"
        class="cursor-pointer text-red-8 q-mr-sm"
        size="1.5rem"
      />
      <div>
        {{
          error ||
          "Something went wrong, please try again or reach out to customer support"
        }}
      </div>

      <q-icon name="close" color="red" size="1.2rem" @click="dismissError" />
    </div>
  </q-banner>
  <div class="body">
    <div class="">
      <h6 class="q-py-sm no-margin" style="font-size: 22px; font-weight: 700">
        Create an account
      </h6>
      <h6 class="text-dark text-subtitle2" style="font-size: 13px">
        Please provide your bio data...
      </h6>
    </div>
    <div class="q-my-lg">
      <q-form class="q-gutter-md">
        <q-input
          outlined
          required
          label="Full Name"
          type="text"
          v-model="full_name"
          placeholder="Please enter"
        />
        <q-input outlined type="email" label="Email" v-model="email" />
        <q-input
          outlined
          label="Mobile Number"
          type="tel"
          v-model="phone_number"
          placeholder="Please enter"
        />
        <q-select outlined :options="options" label="Gender" v-model="gender" />
        <q-input outlined type="date" label="DoB" v-model="dob" />
        <q-input
          outlined
          required
          type="password"
          v-model="password"
          :error="!isValid"
          placeholder="Please enter"
          label="Password"
        >
          <template v-slot:error>
            Please use minimum 8 characters.
          </template></q-input
        >

        <q-input
          outlined
          required
          placeholder="Please enter"
          label="Confirm password"
          v-model="confirm_password"
          :error="!matches"
        >
          <template v-slot:error>
            Please make sure passwords match.
          </template></q-input
        >

        <q-checkbox
          v-model="right"
          label="I understand and agree to all  Terms and Conditions, Policies"
        />
        <div>
          <q-btn
            label="Next"
            type="submit"
            color="primary"
            size="13px"
            @click="register"
            style="width: 100%; margin: 0 auto; height: 2.5rem"
          />
        </div>
      </q-form>
    </div>
    <div>
      <h6 class="text-subtitle2 flex flex-center">
        Already have an account?<span
          class="q-ml-sm text-weight-bold text-subtitle2 text-black"
          ><router-link to="/login" style="text-decoration: none; color: black"
            >Sign in</router-link
          ></span
        >
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Geolocation } from "@capacitor/geolocation";
import { Notify } from "quasar";

const options = ["female", "male"];
const email = ref("");
const phone_number = ref("");
const full_name = ref("");
const dob = ref("");
const gender = ref(options.value);
const password = ref("");
const confirm_password = ref("");
const right = ref(false);
const router = useRouter();
const error = ref(null);

const isValid = computed(() => password.value?.length >= 8);
const matches = computed(() => password.value === confirm_password.value);

const getLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const locationString = `[${latitude}, ${longitude}]`;
    localStorage.setItem("Location", locationString);
    console.log("Location saved", locationString);
  } catch (error) {
    console.error("Geolocation permission denied or unavailable:", error);
    Notify.create({
      type: "negative",
      message: "Unable to retrieve location. Please enable location services.",
    });
  }
};

const register = async () => {
  const formattedDob = new Date(dob.value).toISOString().split("T")[0];

  try {
    const res = await axios.post(
      "http://212.47.72.98:3001/api/v1/users/register/",
      {
        email: email.value,
        phone_number: phone_number.value,
        full_name: full_name.value,
        gender: gender.value,
        dob: formattedDob,
        password: password.value,
        confirm_password: confirm_password.value,
      }
    );

    // Check if registration was successful
    if (res.data.success) {
      console.log("Registration Successful");
      router.push("/login");
    } else {
      error.value = res.data.message || "Error registering";
    }
  } catch (err) {
    // Set error message if registration fails
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Registration failed:", err);
  }
};

const dismissError = () => {
  error.value = null;
  Loading.hide();
};

onMounted(getLocation);
</script>

<style lang="scss" scoped>
.body {
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
:deep(.q-field__control) {
  padding: 1rem;
  height: 3rem;
  display: flex;
  align-items: center;
}
:deep(.q-placeholder) {
  font-size: 13px;
}
</style>
