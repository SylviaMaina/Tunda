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
    <div class="full-width">
      <div class="head">
        <div
          style="
            height: 7.25rem;
            width: 7.25rem;
            border-radius: 100%;
            background: linear-gradient(to bottom, #ff6f61, #ffc0cb);
          "
        ></div>
        <h2 class="text-h4 no-margin no padding">Tunda</h2>
      </div>
      <q-form
        class="q-mx-lg q-my-lg flex column justify-between"
        style="height: 20rem; width: 11/12"
      >
        <div>
          <h6 class="no-margin text-subtitle1 text-weight-normal">Email</h6>
          <q-input
            v-model="email"
            outlined
            stack-label
            placeholder="Please enter"
          />
        </div>
        <div>
          <h6 class="no-margin text-subtitle1 text-weight-normal">Password</h6>
          <q-input
            v-model="password"
            outlined
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              (val) => (val && val?.length > 0) || 'field cannot be blank',
            ]"
            stack-label
            placeholder="Please enter"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>
          <h6 class="text-subtitle2 no-padding q-mt-lg">Forgot password?</h6>
        </div>

        <q-btn
          unelevated
          no-caps
          style="height: 2.5rem"
          color="primary"
          size="13px"
          @click="HandleLogin"
          >Log in
        </q-btn>
      </q-form>
    </div>
    <div>
      <h6 class="text-subtitle2 flex flex-center q-my-lg">
        Don't have an account?<span
          class="q-ml-sm text-weight-bold text-subtitle2"
          ><router-link to="/signup" style="text-decoration: none; color: black"
            >Create account</router-link
          ></span
        >
      </h6>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loading, Notify } from "quasar";
import { useRouter } from "vue-router";
import AuthSession from "../../../Storage/AuthSession";
import { useUserStore } from "src/stores/useUserStore";
import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";
import config from "src/config";

const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();
const isPwd = ref("password");

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

const HandleLogin = async () => {
  Loading.show();
  try {
    const res = await axios.post(`${config.API_BASE_URL}/users/login/`, {
      email: email.value,
      password: password.value,
    });
    if (res.data.success) {
      Loading.hide();
      AuthSession.saveSession(res.data);
      console.log("Log in success");
    } else {
      error.value = res.data.message || "Error registering";
    }
    if (userData?.user?.email_confirmed === true) {
      router.push("/home");
    } else {
      router.push("/verify");
    }
  } catch (err) {
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Login failed:", error.value);
    Loading.hide();
  }
};
const dismissError = () => {
  error.value = null;
  Loading.hide();
};

const userData = useUserStore();

onMounted(async () => {
  getLocation();
  await userData.fetchUserData();
});
</script>

<style lang="scss" scoped>
h2 {
  color: #ff6f61;
}
.body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.head {
  height: 10.25rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.q-banner__content) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
