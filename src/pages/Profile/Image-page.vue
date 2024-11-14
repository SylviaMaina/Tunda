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
      <router-link to="/profile">
        <q-icon color="dark" name="chevron_left" size="20px"
      /></router-link>

      <div style="width: 90%; margin: 0 auto">
        <h6
          class="no-margin no-padding text-weight-medium text-h6 text-center"
          style="font-weight: 600"
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
      style="height: 70vh; position: relative"
    >
      <q-carousel-slide
        v-for="(item, index) in info"
        :key="index"
        :name="index"
        :img-src="`http://212.47.72.98:3001/api/v1/media/file/?file_path=${item.saved_file_name}`"
        style="height: 70vh"
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
          size="16px"
          round
          text-color="black"
          icon="chevron_left"
          @click="$refs.carousel.previous()"
        />
        <q-btn
          flat
          size="16px"
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
import { apiClient } from "app/Storage/api";
import { Notify } from "quasar";
import { onMounted, ref } from "vue";

const info = ref(null);
const error = ref(null);
const slide = ref(1);

const fetchInterests = async () => {
  try {
    const response = await apiClient.get("media/");
    if (response.data.success) {
      // Set info to the docs array from the response data
      info.value = response.data.results.docs;
      console.log(response.data.results.docs);
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};

const remove = async (index) => {
  if (info.value[index]) {
    try {
      const response = await apiClient.delete("/profile/photos/", {
        data: {
          saved_file_name: info.value[index].saved_file_name,
        },
      });
      if (response.data.success) {
        Notify.create({
          type: "positive",
          message: "Photo deleted successfully",
        });
        info.value.splice(index, 1);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      Notify.create({
        type: "negative",
        message: "Unable to delete image.",
      });
    }
  }
};

onMounted(fetchInterests);
</script>

<style lang="scss" scoped>
:deep(.q-carousel__control) {
  position: relative;
  width: 7rem;
  display: flex;
  justify-content: space-between;
}
</style>
