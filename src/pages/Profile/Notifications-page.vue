<template>
  <div
    style="
      width: 90%;
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
        Notifications
      </h6>
    </div>
  </div>
  <div>
    <q-list class="q-mx-sm">
      <q-item-label header>Today, Oct 05, 2024</q-item-label>
      <q-item class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="../../assets/Rectangle.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Jane doe liked your profile</q-item-label>
          <q-item-label caption lines="1">15 minutes ago</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list class="q-mx-sm">
      <q-item-label header>Yesterday, Oct 04, 2024</q-item-label>
      <q-item class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="../../assets/Rectangle.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Jane doe liked your profile</q-item-label>
          <q-item-label caption lines="1">15 minutes ago</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
