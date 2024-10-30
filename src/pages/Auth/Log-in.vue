<template>
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
            v-model="email"
            outlined
            stack-label
            type="email"
            placeholder="Please enter"
          />
        </div>
        <div>
          <h6 class="no-margin text-subtitle1 text-weight-normal">Password</h6>
          <q-input
            v-model="password"
            outlined
            stack-label
            placeholder="Please enter"
          />
          <h6 class="text-subtitle2 no-padding q-mt-lg">Forgot password?</h6>
        </div>

        <q-btn unelevated no-caps color="primary" size="16px">Log in </q-btn>
      </q-form>
    </div>
    <div>
      <h6 class="text-subtitle2 flex flex-center">
        Don't have an account?<span
          class="q-ml-sm text-weight-bold text-subtitle2"
          >Create account</span
        >
      </h6>
    </div>
  </div>
</template>

<script setup></script>

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
</style>
