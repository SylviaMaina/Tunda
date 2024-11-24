<template>
  <div class="q-pa-sm">
    <div
      style="
        width: 100%;
        margin: 0 auto;
        height: 5rem;
        display: flex;
        align-items: center;
      "
    >
      <router-link to="/profile">
        <q-icon color="dark" name="chevron_left" size="20px"
      /></router-link>

      <div style="width: 90%; margin: 0 auto">
        <h6 class="no-margin no-padding text-weight-medium text-h6 text-center">
          Subscribe to premium
        </h6>
      </div>
    </div>
    <div class="body">
      <div
        style="
          width: 95%;
          margin: 0 auto;
          border: 1px solid grey;
          height: 30rem;
          border-radius: 0.5rem;
          padding: 1rem;
        "
      >
        <q-badge rounded color="primary" class="q-pa-sm"> Best plan </q-badge>
        <h6 class="text-h6 no-padding no-margin">Premium plan</h6>
        <h6
          class="text-dark no-padding no-margin"
          style="font-size: 0.8rem; line-height: 1.5rem"
        >
          Enjoy complete access to all our premium features at a low price
        </h6>
        <div class="row justify-between q-pa-sm">
          <h6
            class="text-h6 text-primary no-padding no-margin"
            style="line-height: 1.5rem"
          >
            $10
            <span class="text-subtitle1 text-dark no-padding no-margin"
              >/ month</span
            >
          </h6>
          <h6
            class="text-h6 text-primary no-padding no-margin"
            style="line-height: 1.5rem"
          >
            $99
            <span class="text-subtitle1 text-dark no-padding no-margin"
              >/ Anually</span
            >
          </h6>
        </div>
        <ul
          style="list-style-type: disc; line-height: 1.8rem"
          class="no-margin q-px-lg"
        >
          <li>Lorem ipsum, dolor sit amet conse ctetur adipisicing elit.</li>
          <li>Lorem ipsum, dolor sit amet conse ctetur adipisicing elit.</li>
          <li>Lorem ipsum, dolor sit amet conse ctetur adipisicing elit.</li>
          <li>Lorem ipsum, dolor sit amet conse ctetur adipisicing elit.</li>
        </ul>
      </div>
      <div>
        <router-link to="/payment" style="text-decoration: none">
          <q-btn
            label="Select plan"
            type="submit"
            color="primary"
            no-caps
            style="width: 99%; margin: 0 auto; height: 2.5rem"
          />
        </router-link>
      </div>
      <div>
        <h6 class="text-subtitle2 flex flex-center">
          Terms and conditions of use
        </h6>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.body {
  height: 45rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
