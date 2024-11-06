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
          Support
        </h6>
      </div>
    </div>
    <div class="q-px-sm">
      <h6 class="text-primary text-h5 q-py-sm">Contact Us</h6>
    </div>
    <ul style="list-style-type: disc; line-height: 2rem">
      <li>Monday to Friday from 08:00 to 17:00</li>
      <li>
        All weekend and public holiday queries are attended to the next working
        day.
      </li>
    </ul>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Call</q-item-label>
          <q-item-label caption lines="2">+254 700 111222</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="call" color="dark" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Email</q-item-label>
          <q-item-label caption lines="2">support@example.com</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="mail" color="dark" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
