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
        height: 5rem;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <Router-link to="chat" style="text-decoration: none">
        <q-icon color="dark" name="o_chevron_left" size="40px"
      /></Router-link>

      <q-avatar v-for="contact in offline" :key="contact.id">
        <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
      </q-avatar>

      <div
        style="
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: start;
          margin-left: 1rem;
        "
      >
        <h6 class="no-margin no-padding text-weight-bold text-subtitle1">
          Jane Doe_32
        </h6>

        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <div
            style="
              width: 0.5rem;
              height: 0.5rem;
              background: green;
              border-radius: 100%;
              margin-right: 0.2rem;
            "
          ></div>
          <h6 class="no-margin text-green-5 text-subtitle2">online</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        bg-color="primary"
        text-color="white"
        sent
      />
      <q-chat-message
        :text="['doing fine, how r you?']"
        stamp="7 minutes ago"
        bg-color="grey"
        text-color="white"
      />
    </div>
  </div>
</template>

<script setup>
const offline = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg",
  },
];
</script>

<style lang="scss" scoped>
:deep(.q-message-text) {
  border-radius: 1rem;
  width: 20rem;
  margin-bottom: 1rem;
}
</style>
