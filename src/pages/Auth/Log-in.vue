<template>
  <q-banner
    v-if="error"
    class="bg-negative text-red flex justify-between q-ma-sm border-red-9"
    style="border: 1px solid red"
  >
    <q-icon name="error" class="cursor-pointer text-red-8" size="1.5rem" />
    {{
      error ||
      "Something went wrong, please try again or reach out to customer support"
    }}
    <q-icon name="close" color="red" size="1.2rem" @click="dismissError" />
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
          <h6 class="no-margin text-subtitle1 text-weight-normal">
            Email / Mobile number
          </h6>
          <q-input
            v-model="info"
            outlined
            stack-label
            required
            :type="inputType"
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
              (val) => (val && val.length > 0) || 'field cannot be blank',
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
          color="primary"
          size="16px"
          @click="HandleLogin"
          >Log in
        </q-btn>
      </q-form>
    </div>
    <div>
      <h6 class="text-subtitle2 flex flex-center">
        Don't have an account?<span
          class="q-ml-sm text-weight-bold text-subtitle2"
          ><router-link to="signup" style="text-decoration: none"
            >Create account</router-link
          ></span
        >
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Loading } from "quasar";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const email = ref("");
const phone_number = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();
const isPwd = ref("password");
const info = ref("");
const inputType = computed(() => (email.value ? "email" : "tel"));

const HandleLogin = async () => {
  Loading.show();
  try {
    const response = await fetch("/src/assets/Data.json");
    const data = await response.json();

    const trimmedInput = info.value.trim();
    const trimmedPassword = password.value;

    // User lookup logic
    const user = data.find(
      (u) =>
        (u.email === trimmedInput ||
          u.phone_number.toString() === trimmedInput) &&
        u.password === trimmedPassword
    );

    if (user) {
      console.log("Log in success");
      router.push("/home");
    } else {
      error.value = "Invalid email / phone number or password";
      console.log(error.value);
    }
  } catch (error) {
    console.error("Error:", error);
    error.value =
      "Something went wrong, please try again or reach out to customer support";
  } finally {
    Loading.hide();
  }
};
const dismissError = () => {
  error.value = null;
  Loading.hide();
};
</script>

<style lang="scss" scoped>
h2 {
  color: #ff6f61;
}
.body {
  height: 100vh;
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
