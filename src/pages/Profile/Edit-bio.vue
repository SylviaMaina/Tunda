<template>
  <q-banner
    v-if="error"
    class="bg-negative text-red q-ma-sm"
    style="border: 1px solid red"
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
      <div>
        {{
          error ||
          "Something went wrong, please try again or reach out to customer support"
        }}
      </div>

      <q-icon name="close" color="red" size="1.2rem" @click="dismissError" />
    </div>
  </q-banner>
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
        Edit bio
      </h6>
    </div>
  </div>
  <div class="body" v-if="userData.user">
    <div>
      <q-form class="q-gutter-lg">
        <q-input
          v-model="model"
          outlined
          type="text"
          :placeholder="userData.user.bio"
        >
          <template v-slot:append>
            <q-icon name="o_send" class="cursor-pointer" @click="EditBio" />
          </template>
        </q-input>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "app/Storage/api";
import { Loading } from "quasar";
import { useUserStore } from "src/stores/useUserStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const userData = useUserStore();
const model = ref("");

const error = ref(null);

const EditBio = async () => {
  Loading.show();
  try {
    const res = await apiClient.patch("/profile/update/", {
      bio: model.value,
    });
    if (res.data.success) {
      Loading.hide();
      router.push("/profile");
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

onMounted(() => {
  userData.fetchUserData();
});
</script>

<style lang="scss" scoped>
.body {
  height: 45rem;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
