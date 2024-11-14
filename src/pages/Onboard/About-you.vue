<template>
  <q-banner
    v-if="error"
    class="bg-negative text-red q-ma-sm"
    style="border: 1px solid #ffe4e4"
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      "
    >
      <q-icon
        name="error"
        class="cursor-pointer text-red-8 q-mr-sm"
        size="1.5rem"
      />
      <diV>
        {{
          error ||
          "Something went wrong, please try again or reach out to customer support"
        }}</diV
      >

      <q-icon name="close" color="red" size="1.2rem" @click="dismissError" />
    </div>
  </q-banner>
  <div class="body">
    <div>
      <div class="q-py-md">
        <h6 class="text-weight-bold text-h5 q-py-sm">
          Tell us a little about yourself
        </h6>
        <h6 class="text-dark text-subtitle2">
          Let people who you are and find people with similar character
        </h6>
      </div>
      <div class="q-gutter-lg">
        <q-input outlined clearable v-model="model" placeholder="Start typing">
          <template v-slot:append>
            <q-icon name="o_send" @click="Profession" /> </template
        ></q-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { Loading } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const model = ref(null);
const error = ref(null);

const Profession = async () => {
  Loading.show();
  try {
    const res = await apiClient.patch("/profile/update/", {
      bio: model.value,
    });
    if (res.data.success) {
      Loading.hide();
      router.push("/interests");
    } else {
      error.value = res.data.message || "Error updating interests";
    }
  } catch (err) {
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Update failed:", err);
    Loading.hide();
  }
};
const dismissError = () => {
  error.value = null;
  Loading.hide();
};
</script>

<style lang="scss" scoped>
.body {
  height: 88vh;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
