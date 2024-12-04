<template>
  <div class="q-mx-md">
    <div
      style="
        width: 100%;
        margin: 0 auto;
        height: 5rem;
        display: flex;
        align-items: center;
      "
    >
      <router-link to="/editimages">
        <q-icon color="dark" name="chevron_left" size="20px"
      /></router-link>

      <div style="width: 90%; margin: 0 auto">
        <h6
          class="no-margin no-padding text-center"
          style="font-size: 18px; font-weight: 600"
        >
          Gallery
        </h6>
      </div>
    </div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      ref="carousel"
      infinite
      style="height: 38rem; position: relative"
    >
      <q-carousel-slide
        v-for="(item, index) in userData.user?.photos"
        :key="index"
        :name="index"
        :img-src="`${config.API_BASE_URL}/media/file/?file_path=${item.saved_file_name}`"
        style="height: 38rem"
        alt=".."
      />
    </q-carousel>
    <div
      style="
        display: flex;
        justify-content: space-between;
        height: 4rem;
        align-items: center;
      "
    >
      <div class="q-gutter-xs">
        <q-btn
          flat
          size="16px"
          round
          text-color="black"
          icon="o_delete"
          @click="remove(slide)"
        />
      </div>
      <q-carousel-control>
        <q-btn
          flat
          size="20px"
          round
          text-color="black"
          icon="chevron_left"
          @click="$refs.carousel.previous()"
        />
        <q-btn
          flat
          size="20px"
          round
          text-color="black"
          icon="chevron_right"
          @click="$refs.carousel.next()"
        />
      </q-carousel-control>
    </div>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { config } from "src/boot/http";
import { useUserStore } from "src/stores/useUserStore";
import { onMounted, ref } from "vue";
import AuthSession from "app/Storage/AuthSession";

const slide = ref(1);
const userData = useUserStore();

const remove = async (index) => {
  const fileName = userData.user.photos[index]?.saved_file_name;

  if (!fileName) {
    Notify.create({
      type: "negative",
      message: "Photo not found.",
    });
    return;
  }

  try {
    console.log("Deleting photo:", fileName);
    const token = AuthSession.getToken();

    // Use the fetch API
    const response = await fetch(`${config.API_BASE_URL}/profile/photos/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
      body: JSON.stringify({
        saved_file_name: fileName,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      Notify.create({
        type: "positive",
        message: "Photo deleted successfully",
      });
      userData.user.photos.splice(index, 1);
    } else {
      throw new Error(data.message || "Failed to delete photo.");
    }
  } catch (error) {
    console.error("Error deleting image:", error.message || error);
    Notify.create({
      type: "negative",
      message: "Unable to delete image.",
    });
  }
};

onMounted(async () => {
  await userData.fetchUserData();
});
</script>

<style lang="scss" scoped>
:deep(.q-carousel__control) {
  position: relative;
  width: 7rem;
  display: flex;
  justify-content: space-between;
}
</style>
