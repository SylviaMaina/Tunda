<template>
  <div
    style="
      width: 90%;
      margin: 0 auto;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <div
      style="
        width: 50%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div
        style="
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: start;
        "
      >
        <h6 class="no-margin no-padding text-weight-medium text-h6">Chats</h6>
      </div>
    </div>
    <q-icon color="dark" name="o_chat" size="20px" />
  </div>
  <div class="q-px-sm">
    <q-input
      style="width: 100%"
      outlined
      class="text-dark"
      placeholder="Search"
    >
      <template v-slot:prepend>
        <q-icon name="o_search" class="q-pl-sm" />
      </template>
    </q-input>
  </div>
  <q-list>
    <router-link to="message" style="text-decoration: none; color: #000">
      <q-item
        v-for="contact in offline"
        :key="contact.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-item-label>
            <q-icon name="sell" class="q-pl-sm" color="dark" />
            <q-chip color="primary" text-color="white" class="q-pa-sm">
              5
            </q-chip></q-item-label
          >
        </q-item-section>
      </q-item></router-link
    >
  </q-list>
</template>

<script setup>
const offline = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg",
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    email: "wstapforth5@pcworld.com",
    avatar: "avatar6.jpg",
  },
];

const setup = () => {
  offline;
};
</script>

<style lang="scss" scoped></style>
