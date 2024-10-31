<template>
  <q-footer class="bg-transparent" flat>
    <q-tabs class="bg-transparent">
      <q-item to="/home" class="q-ma-none q-pa-none">
        <q-tab
          name="Home"
          icon="o_home"
          class="text-primary bg-transparent"
          size="20px"
      /></q-item>

      <q-tab
        name="chat"
        icon="o_chat_bubble"
        size="20px"
        class="text-grey-8 bg-transparent"
      />

      <q-tab
        name="favorite"
        icon="o_favorite"
        size="20px"
        class="text-grey-8 bg-transparent"
      />

      <q-tab
        name="person"
        icon="o_person"
        size="20px"
        class="text-grey-8 bg-transparent"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
