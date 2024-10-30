<template>
  <div class="body">
    <div>
      <img src="../../assets/Asset 1 1.png" alt="Tunda" class="profile" />
    </div>
    <div class="desc">
      <div class="flex justify-between column">
        <h6 class="text-h4 text-weight-bold no-margin q-mb-xl">
          Justo vel arcu sitwer
        </h6>
        <h6 class="text-subtitle2 text-weight-regular q-mt-md">
          Lorem ipsum dolor sit amet consectetur. Justo vel vulputate arcu sit.
          Lobortis neque potenti ultrices volutpat neque massa.
        </h6>
      </div>
      <router-link to="/login" style="text-decoration: none">
        <q-btn
          unelevated
          no-caps
          size="18px"
          color="primary"
          class="q-px-none q-py-none"
          >Get started
          <q-icon color="white" name="keyboard_arrow_right" size="20px"
        /></q-btn>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.body {
  max-height: 100vh;
}

.profile {
  width: 24rem;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc {
  width: 80%;
  height: 15.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  text-align: left;
}
.q-btn {
  width: 50%;
}
</style>
