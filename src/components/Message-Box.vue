<template>
  <q-footer elevated>
    <q-toolbar bg-color="white">
      <q-input
        bg-color="white"
        class="full-width q-ma-sm"
        outlined
        autogrow
        label="Message"
      >
        <template v-slot:prepend>
          <q-btn round dense flat color="dark" icon="sentiment_satisfied" />
        </template>
        <template v-slot:append>
          <q-btn round dense flat color="dark" icon="attach_file" />
        </template>
      </q-input>
    </q-toolbar>
  </q-footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
