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
    <div>
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
        <!-- Country Dropdown -->
        <div class="phone-number-input-container">
          <q-select
            borderless
            dense
            class=""
            v-model="selectedCountry"
            :options="countryOptions"
            @update:model-value="onCountryChange"
            option-value="value"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <div class="">
                  <img
                    :src="`https://flagcdn.com/${scope.opt.value?.toLowerCase()}.svg`"
                    style="max-width: 30px"
                  />
                </div>
                <q-item-section class="address-location-options">
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">
              <div class="">
                <img
                  :src="`https://flagcdn.com/${scope.opt.value?.toLowerCase()}.svg`"
                  style="
                    max-width: 40px;
                    height: 40px;
                    padding: 0.4rem;
                    border-radius: rem;
                    object-fit: cover;
                  "
                />
              </div>
            </template>
          </q-select>
          <q-input
            borderless
            label="Mobile Number"
            type="tel"
            v-model="phone_number"
            :mask="phoneMask"
            class="q-pa-none"
            placeholder="Enter phone number"
          >
          </q-input>
        </div>

        <q-select outlined :options="options" label="Gender" v-model="gender" />

        <q-input outlined type="date" label="DoB" v-model="dob" :max="maxDob" />

        <q-input
          outlined
          required
          :type="isPwd ? 'password' : 'text'"
          v-model="password"
          :error="!isValid"
          placeholder="Please enter"
          label="Password"
        >
          <template v-slot:error> Please use minimum 8 characters. </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          outlined
          required
          placeholder="Please enter"
          :type="isPwd ? 'password' : 'text'"
          label="Confirm password"
          v-model="confirm_password"
          :error="!matches"
        >
          <template v-slot:error> Please make sure passwords match. </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-checkbox
          v-model="right"
          label="I understand and agree to all Terms and Conditions, Policies"
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
        Already have an account?
        <span class="q-ml-sm text-weight-bold text-subtitle2 text-black">
          <router-link to="/login" style="text-decoration: none; color: black">
            Sign in
          </router-link>
        </span>
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Geolocation } from "@capacitor/geolocation";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Notify } from "quasar";
import { config } from "src/boot/http";

const options = ["female", "male"];
const email = ref("");
const phone_number = ref("");
const full_name = ref("");
const dob = ref("");
const gender = ref(options.value);
const password = ref("");
const confirm_password = ref("");
const isPwd = ref("password");
const right = ref(false);
const router = useRouter();
const countryOptions = [
  { label: "Kenya", value: "KE" },
  { label: "Uganda", value: "UG" },
  { label: "Tanzania", value: "TZ" },
  { label: "Rwanda", value: "RW" },
  { label: " Burundi", value: "BI" },
  { label: "South Sudan", value: "SS" },
  { label: "United States", value: "US" },
];
const selectedCountry = ref({ label: "Kenya", value: "KE" });
const error = ref(null);

const getLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const locationString = `[${latitude}, ${longitude}]`;
    localStorage.setItem("Location", locationString);
  } catch (error) {
    console.error("Geolocation permission denied or unavailable:", error);
    Notify.create({
      type: "negative",
      message: "Unable to retrieve location. Please enable location services.",
    });
  }
};

const phoneMask = computed(() => {
  switch (selectedCountry.value?.value) {
    case "KE": // Kenya
      return "+254 (###) ###-###";
    case "UG": // Uganda
      return "+256 (###) ###-###";
    case "TZ": // Tanzania
      return "+255 (###) ###-###";
    case "RW": // Rwanda
      return "+250 (###) ###-###";
    case "BI": // Burundi
      return "+257 (###) ###-###";
    case "SS": // South Sudan
      return "+211 (###) ###-###";
    default:
      return "+1 (###) ###-####"; // Default to the US
  }
});

const onCountryChange = (countryCode) => {
  phone_number.value = "";
  const phoneNumber = parsePhoneNumberFromString(
    phone_number.value,
    countryCode
  );
  if (phoneNumber) {
    phone_number.value = phoneNumber.formatInternational();
  }
};
const isValid = computed(() => password.value?.length >= 8);
const matches = computed(() => password.value === confirm_password.value);

// Calculate the max allowed date for the date of birth (18 years ago)
const maxDob = computed(() => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split("T")[0];
});

const register = async () => {
  const formattedDob = new Date(dob.value).toISOString().split("T")[0];

  try {
    const res = await axios.post(`${config.API_BASE_URL}/users/register/`, {
      email: email.value,
      phone_number: phone_number.value,
      full_name: full_name.value,
      gender: gender.value,
      dob: formattedDob,
      password: password.value,
      confirm_password: confirm_password.value,
    });

    if (res.data.success) {
      router.push("/login");
    } else {
      error.value = res.data.message || "Error registering";
    }
  } catch (err) {
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Registration failed:", err);
  }
};

const dismissError = () => {
  error.value = null;
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
.phone-number-input-container {
  border: 0.05rem solid darkgray;
  border-radius: 0.2rem;
  display: flex;
}
.phone-number-input-container:focus-within {
  border: 2px solid $primary;
}
</style>
