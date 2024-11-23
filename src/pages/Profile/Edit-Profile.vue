<template>
  <div class="body" v-if="userData?.user">
    <div class="q-py-sm">
      <div>
        <h6 class="text-weight-medium text-h6 q-py-sm">Personal details</h6>
      </div>
      <q-form class="q-gutter-lg">
        <q-input
          outlined
          v-model="full_name"
          label="Full_name"
          type="text"
          placeholder="Please enter"
        />
        <q-input outlined type="email" label="E-mail" v-model="email" />
        <q-input
          outlined
          label="phone_number"
          type="tel"
          v-model="phone_number"
          placeholder="Please enter"
        />
        <q-select outlined :options="options" label="Gender" v-model="gender" />
        <q-input outlined type="date" label="Date of birth" />
      </q-form>
    </div>

    <div
      style="display: flex; justify-content: space-between; width: 100%"
      class="q-my-lg"
    >
      <q-btn
        label="Discard changes"
        type="submit"
        size="0.9rem"
        no-caps
        flat
        class="q-mr-sm"
        style="width: 9.6rem; height: 2.5rem; border: 1px solid grey"
      />
      <router-link to="/profile" style="text-decoration: none; color: black">
        <q-btn
          label="Update details"
          type="submit"
          color="primary"
          @click="EditProfile"
          size="0.9rem"
          no-caps
          style="width: 9.6rem; height: 2.5rem"
      /></router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "src/stores/useUserStore";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { apiClient } from "app/Storage/api";

const router = useRouter();
const userData = useUserStore();
const options = ["female", "male"];
const email = ref("");
const phone_number = ref("");
const full_name = ref("");
const dob = ref("");
const gender = ref("");

onMounted(() => {
  userData.fetchUserData().then(() => {
    if (userData.user) {
      email.value = userData.user.email;
      phone_number.value = userData.user.phone_number;
      full_name.value = userData.user.full_name;
      dob.value = userData.user.dob;
      gender.value = userData.user.gender;
    }
  });
});

const EditProfile = async () => {
  const payload = {};
  if (email.value !== userData.user.email) payload.email = email.value;
  if (phone_number.value !== userData.user.phone_number)
    payload.phone_number = phone_number.value;
  if (full_name.value !== userData.user.full_name)
    payload.full_name = full_name.value;
  if (gender.value !== userData.user.gender) payload.gender = gender.value;
  if (dob.value !== userData.user.dob) {
    payload.dob = new Date(dob.value).toISOString().split("T")[0];
  }

  try {
    const res = await apiClient.patch(
      "http://212.47.72.98:3001/api/v1/profile/update/",
      payload
    );
    if (res.data.success) {
      console.log("Update Successful");
      router.push({ path: "/profile" });
    } else {
      console.error(res.data.message || "Error updating profile");
    }
  } catch (err) {
    console.error("Update failed:", err);
  }
};
</script>

<style lang="scss" scoped>
.body {
  height: 80vh;
  width: 90vw;
  margin: 0 auto;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
:deep(.q-field__control) {
  height: 2.8rem;
  font-size: 14px;
}
</style>
