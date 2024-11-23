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
  <div class="body">
    <div>
      <div class="flex justify-between q-mt-lg">
        <h6 class="text-dark text-subtitle1">Step 5/7</h6>
        <router-link to="/distance" style="text-decoration: none; color: black">
          <h6 class="text-dark text-subtitle1">Skip</h6></router-link
        >
      </div>
      <q-linear-progress size="10px" value="0.8" class="q-mt-sm" rounded />
      <div class="q-py-md">
        <h6
          class="q-py-sm no-padding no-margin"
          style="font-size: 22px; font-weight: 700"
        >
          What are you looking for
        </h6>
        <h6
          class="text-dark no-padding no-margin"
          style="font-size: 13px; font-weight: 400"
        >
          Meet people with similar interest
        </h6>
      </div>

      <div style="height: 80%" class="full-width">
        <q-btn-toggle
          v-for="option in options"
          :key="option.value"
          v-model="model"
          class="q-my-lg"
          style="
            border-radius: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
          toggle-text-color="black"
          no-caps
          toggle-color="accent"
          :options="[{ value: option.value, slot: option.value }]"
        >
          <template v-slot:[option.value]>
            <div
              style="
                padding: 0.5rem;
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
                justify-content: space-between;
              "
            >
              <q-icon
                right
                name="eva-heart-outline"
                size="2.5rem"
                color="white"
                class="q-pa-sm bg-primary"
                style="border-radius: 2rem"
              />
              <div
                class="text-start q-ml-sm"
                style="
                  display: flex;
                  width: 90%;
                  flex-direction: column;
                  align-items: start;
                  justify-content: space-between;
                "
              >
                <h6>{{ option.label }}</h6>
                <h6 class="text-subtitle1">{{ option.subtitle }}</h6>
              </div>
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>

    <div>
      <q-btn
        label="Next"
        type="submit"
        color="primary"
        @click="Looking"
        size="13px"
        no-caps
        style="width: 100%; margin: 0 auto; height: 2.5rem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Loading } from "quasar";
import { useRouter } from "vue-router";
import { apiClient } from "app/Storage/api";

const model = ref("");
const router = useRouter();
const error = ref(null);

const options = [
  { label: "Love", value: "love", subtitle: "I am not here to play" },
  { label: "Fun", value: "fun", subtitle: "I am here for fun" },
  { label: "Friends", value: "friends", subtitle: "I am here for friendship" },
];

const Looking = async () => {
  Loading.show();
  try {
    const selectedOption = options.find(
      (option) => option.value === model.value
    );

    if (!selectedOption) {
      throw new Error("No option selected");
    }

    const lookingForPayload = {
      looking_for: [
        { label: selectedOption.label, value: selectedOption.value },
      ],
    };
    const res = await apiClient.patch("/profile/update/", lookingForPayload);

    if (res.data.success) {
      Loading.hide();
      router.push("/distance");
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
:deep(.q-btn) {
  padding: 0;
}
</style>
