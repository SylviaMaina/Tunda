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
      height: 6rem;
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
      <q-icon color="black" name="o_location_on" size="32px" />
      <div
        style="
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: start;
        "
      >
        <h6
          class="no-margin no-padding text-weight-bold"
          style="font-size: 18px"
        >
          Location
        </h6>
        <h6 class="no-margin text-dark text-subtitle2">
          {{ city }}, <span>{{ country }}</span>
        </h6>
      </div>
    </div>
    <router-link to="/notifications">
      <q-icon color="dark" name="o_notifications" size="32px"
    /></router-link>
  </div>
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
    <q-input style="width: 90%" outlined class="text-dark" placeholder="Search">
      <template v-slot:prepend>
        <q-icon name="o_search" class="q-pl-sm" />
      </template>
    </q-input>
    <q-icon color="black" name="o_tune" size="36px" @click="filter = true" />
  </div>
  <div
    style="width: 90vw; margin: 0 auto; height: 32rem; position: relative"
    v-if="info?.length > 0 && info[0].photos && info[0].photos?.length > 0"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <img
      :src="`${config.API_BASE_URL}/media/file/?file_path=${info[0].photos[0].saved_file_name}`"
      alt=".."
      style="
        height: 100%;
        width: 100%;
        margin: 0 auto;
        object-fit: cover;
        border-radius: 2rem;
      "
    />
    <div
      style="
        position: absolute;
        bottom: 8%;
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      "
      v-for="(data, index) in info"
      :key="index"
    >
      <div
        style="
          width: 90%;
          height: 5rem;
          margin-left: 0.5rem;
          margin-bottom: 3rem;
        "
      >
        <div class="row flex-center justify-between">
          <h6 class="text-white q-ma-sm text-weight-bold">
            {{ data.full_name }}, {{ calculateAge(data.dob) }}
          </h6>
        </div>

        <div
          class="q-gutter-sm"
          style="
            width: 70%;
            display: grid;
            grid-template-columns: repeat(3, 6.8rem);
          "
        >
          <div v-for="category in data.interests" :key="category.name">
            <div
              v-for="interest in category.interests.slice(0, 1)"
              :key="interest.label"
            >
              <q-badge
                transparent
                color="info"
                class="q-pa-sm ellipsis-2-lines"
                :label="interest.label"
              />
            </div>
          </div>
        </div>
        <!-- Link to User Profile -->
        <router-link :to="`/about/${data.id}`" style="text-decoration: none">
          <div
            style="
              width: 2rem;
              height: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              right: 1rem;
              bottom: -1rem;
              position: absolute;
              background: #ffffff29;
            "
          >
            <q-icon name="more_vert" color="white" size="1.2rem" />
          </div>
        </router-link>
      </div>
    </div>

    <div
      style="
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        bottom: -2rem;
        position: absolute;
      "
    >
      <q-fab
        icon="close"
        color="white"
        text-color="black"
        padding="8px"
        class="q-mx-sm"
        @click="showNotif"
      >
      </q-fab>
      <q-icon
        size="2.5rem"
        name="eva-heart-outline"
        color="white"
        style="background: #ff6f61; border-radius: 100%"
        class="q-pa-sm q-mx-sm"
        @click="showLike"
      />
      <q-fab icon="grade" color="info" text-color="secondary" padding="8px">
      </q-fab>
    </div>
    <q-dialog v-model="filter" position="bottom">
      <q-card
        style="
          width: 90%;
          height: 80%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid blue;
        "
        class="q-px-sm"
      >
        <div style="height: 60%">
          <div
            style="
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div>
              <h6 class="no-margin no-padding text-weight-bold">Filter</h6>
            </div>
          </div>
          <div>
            <h6 class="text-dark text-subtitle1 q-py-sm">Location</h6>
            <q-input
              style="width: 100%"
              outlined
              class="text-dark"
              placeholder="Search"
              v-model="location"
            >
              <template v-slot:prepend>
                <q-icon name="o_search" class="q-pl-sm" />
              </template>
            </q-input>
          </div>
          <div
            style="height: 6rem; width: 90%; margin: 0 auto; margin-top: 2rem"
          >
            <q-badge color="black"> Distance (Km) </q-badge>

            <q-slider
              v-model="distance"
              :step="4"
              label
              :label-value="distance + ' ' + 'Km'"
              label-always
              switch-label-side
              color="primary"
              class="q-py-sm"
            />
          </div>
          <div
            style="height: 6rem; width: 90%; margin: 0 auto; margin-top: 2rem"
          >
            <q-badge color="black"> Age </q-badge>

            <q-range
              v-model="age"
              :min="0"
              :max="100"
              label
              :label-value="age + ' ' + 'years'"
              label-always
              switch-label-side
              color="primary"
              class="q-py-sm"
            />
          </div>
          <div>
            <h6 class="text-weight-bold text-subtitle1 q-py-sm">
              Interested In
            </h6>
            <div class="q-gutter-lg row flex-center">
              <q-btn-toggle
                v-model="gender"
                no-caps
                flat
                style="
                  border: 1px solid gray;
                  width: 6rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5rem;
                "
                toggle-color="primary"
                :options="[{ slot: 'one', value: 'female' }]"
              >
                <template v-slot:one>
                  <q-icon
                    size="26px"
                    name="female"
                    color="primary"
                  /> </template
              ></q-btn-toggle>
              <q-btn-toggle
                v-model="gender"
                no-caps
                flat
                style="
                  border: 1px solid gray;
                  width: 6rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5rem;
                "
                toggle-color="primary"
                :options="[{ slot: 'two', value: 'male' }]"
              >
                <template v-slot:two>
                  <q-icon size="26px" name="male" color="primary" /> </template
              ></q-btn-toggle>
              <q-btn-toggle
                v-model="gender"
                no-caps
                flat
                style="
                  border: 1px solid gray;
                  width: 6rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5rem;
                "
                toggle-color="primary"
                :options="[{ slot: 'three', value: 'all' }]"
              >
                <template v-slot:three>
                  <q-icon
                    size="26px"
                    name="o_radio_button_unchecked"
                    color="primary"
                  /> </template
              ></q-btn-toggle>
            </div>
          </div>
        </div>

        <div
          style="display: flex; justify-content: space-between; width: 100%"
          class="q-my-lg"
        >
          <q-btn
            label="Clear All"
            type="submit"
            color="grey"
            size="15px"
            @click="clearFilters"
            no-caps
            style="width: 40%; height: 2.5rem"
          />
          <q-btn
            label="Apply"
            type="submit"
            color="primary"
            size="15px"
            no-caps
            @click="applyFilters"
            style="width: 40%; height: 2.5rem"
          /></div
      ></q-card>
    </q-dialog>
  </div>
  <div v-if="info?.length === 0">
    <h6
      class="text-caption text-dark"
      style="
        width: 60%;
        margin: 0 auto;
        height: 20rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      Come back again to see all new people to match with
    </h6>
    <q-dialog v-model="filter" position="bottom">
      <q-card
        style="
          width: 90%;
          height: 80%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid blue;
        "
        class="q-px-sm"
      >
        <div style="height: 60%">
          <div
            style="
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div>
              <h6 class="no-margin no-padding text-weight-bold">Filter</h6>
            </div>
          </div>
          <!-- Display Selected Filters -->
          <div>
            <h6 class="text-weight-bold text-dark q-my-sm">
              Selected Filters:
            </h6>
            <div class="q-gutter-sm row">
              <q-badge v-if="location" color="primary" class="q-pa-sm">{{
                location
              }}</q-badge>
              <q-badge v-if="distance" color="teal" class="q-pa-sm"
                >Distance: {{ distance }} Km</q-badge
              >
              <q-badge
                v-if="age.min !== 18 || age.max !== 100"
                color="purple"
                class="q-pa-sm"
                >Age: {{ age.min }} - {{ age.max }}</q-badge
              >
              <q-badge v-if="gender" color="pink" class="q-pa-sm"
                >Gender: {{ gender }}</q-badge
              >
              <q-badge
                v-if="
                  !location &&
                  !distance &&
                  age.min === 18 &&
                  age.max === 100 &&
                  !gender
                "
                color="grey"
                class="q-pa-sm"
                >No filters applied</q-badge
              >
            </div>
          </div>
          <!-- Location Filter -->
          <div>
            <h6 class="text-dark text-subtitle1 q-py-sm">Location</h6>
            <q-input
              style="width: 100%"
              outlined
              class="text-dark"
              placeholder="Search"
              v-model="location"
            >
              <template v-slot:prepend>
                <q-icon name="o_search" class="q-pl-sm" />
              </template>
            </q-input>
          </div>
          <!-- Distance Filter -->
          <div
            style="height: 6rem; width: 90%; margin: 0 auto; margin-top: 2rem"
          >
            <q-badge color="black">Distance (Km)</q-badge>
            <q-slider
              v-model="distance"
              :step="4"
              label
              :label-value="distance + ' Km'"
              label-always
              switch-label-side
              color="primary"
              class="q-py-sm"
            />
          </div>
          <!-- Age Filter -->
          <div
            style="height: 6rem; width: 90%; margin: 0 auto; margin-top: 2rem"
          >
            <q-badge color="black">Age</q-badge>
            <q-range
              v-model="age"
              :min="18"
              :max="100"
              label
              :label-value="age.min + ' - ' + age.max + ' years'"
              label-always
              switch-label-side
              color="primary"
              class="q-py-sm"
            />
          </div>
          <!-- Gender Filter -->
          <div>
            <h6 class="text-weight-bold text-subtitle1 q-py-sm">
              Interested In
            </h6>
            <div class="q-gutter-lg row flex-center">
              <q-btn-toggle
                v-model="gender"
                no-caps
                flat
                style="
                  border: 1px solid gray;
                  width: 6rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5rem;
                "
                toggle-color="primary"
                :options="[{ slot: 'one', value: 'female' }]"
              >
                <template v-slot:one>
                  <q-icon size="26px" name="female" color="primary" />
                </template>
              </q-btn-toggle>
              <q-btn-toggle
                v-model="gender"
                no-caps
                flat
                style="
                  border: 1px solid gray;
                  width: 6rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5rem;
                "
                toggle-color="primary"
                :options="[{ slot: 'two', value: 'male' }]"
              >
                <template v-slot:two>
                  <q-icon size="26px" name="male" color="primary" />
                </template>
              </q-btn-toggle>
              <q-btn-toggle
                v-model="gender"
                no-caps
                flat
                style="
                  border: 1px solid gray;
                  width: 6rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5rem;
                "
                toggle-color="primary"
                :options="[{ slot: 'three', value: 'all' }]"
              >
                <template v-slot:three>
                  <q-icon
                    size="26px"
                    name="o_radio_button_unchecked"
                    color="primary"
                  />
                </template>
              </q-btn-toggle>
            </div>
          </div>
        </div>
        <!-- Actions -->
        <div
          style="display: flex; justify-content: space-between; width: 100%"
          class="q-my-lg"
        >
          <q-btn
            label="Clear All"
            type="submit"
            color="grey"
            size="15px"
            @click="clearFilters"
            no-caps
            style="width: 40%; height: 2.5rem"
          />
          <q-btn
            label="Apply"
            type="submit"
            color="primary"
            size="15px"
            no-caps
            @click="applyFilters"
            style="width: 40%; height: 2.5rem"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loading, useQuasar } from "quasar";
import { apiClient } from "app/Storage/api";
import AuthSession from "app/Storage/AuthSession";
import { config } from "src/boot/http";
import axios from "axios";

const filter = ref(false);
const distance = ref(50);
const age = ref({ min: 18, max: 100 });
const gender = ref(null);
const $q = useQuasar();
const location = ref(null);
const city = ref(null);
const country = ref(null);
const currentIndex = ref(0);
const touchStart = ref(0);
const touchEnd = ref(0);
const error = ref(null);
const info = ref([]);

// Method to fetch reverse geocoding details
const fetchCityAndCountry = async () => {
  const storedLocation = JSON.parse(localStorage.getItem("Location"));
  if (!storedLocation) {
    console.error("No location found in localStorage");
    return { city: "Unknown", country: "Unknown" };
  }

  const [latitude, longitude] = storedLocation;
  const accessToken = config.MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.features.length > 0) {
      const features = response.data.features;
      const placeContext = features.find((f) => f.place_type.includes("place"));
      const countryContext = features.find((f) =>
        f.place_type.includes("country")
      );

      city.value = placeContext?.text || "Unknown City";
      country.value = countryContext?.text || "Unknown Country";
      return { city, country };
    } else {
      console.error("No results found for the given coordinates.");
      return { city: "Unknown", country: "Unknown" };
    }
  } catch (error) {
    console.error("Error fetching reverse geocoding data from Mapbox:", error);
    return { city: "Error", country: "Error" };
  }
};

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const getMatch = async () => {
  const savedFilters = JSON.parse(localStorage.getItem("filters"));
  const minAge = savedFilters?.age?.min ?? 18;
  const maxAge = savedFilters?.age?.max ?? 100;
  const maxDistance = savedFilters?.distance ?? 0;
  const setGender = savedFilters?.gender ?? null;

  try {
    const response = await apiClient.get(
      `/matches/find/?coordinates=${AuthSession.getLocation()}&max_match_distance_km=${maxDistance}&gender=${setGender}&min_age=${minAge}&max_age=${maxAge}`
    );
    info.value = response.data.results.docs;
  } catch (error) {
    console.error("Error:", error);
    $q.notify({
      color: "negative",
      message: "Failed to fetch matches. Please try again later.",
      position: "top",
    });
  }
};

// Store filters in localStorage whenever they are updated
const updateFilters = () => {
  localStorage.setItem(
    "filters",
    JSON.stringify({
      distance: distance.value,
      age: age.value,
      gender: gender.value,
    })
  );
};

// Retrieve filters from localStorage if they exist
const retrieveFilters = () => {
  const savedFilters = JSON.parse(localStorage.getItem("filters"));
  if (savedFilters) {
    distance.value = savedFilters.distance || 0;
    age.value = savedFilters.age || { min: 18, max: 100 };
    gender.value = savedFilters.gender || null;
  }
};

// Apply filters and retrieve new data
const applyFilters = () => {
  updateFilters();
  getMatch();

  $q.notify({
    color: "green",
    textColor: "white",
    message: "Filters have been applied!",
    icon: "check_circle",
    position: "top",
    timeout: 2000,
  });

  filter.value = false;
};

// Clear all filters
const clearFilters = () => {
  localStorage.removeItem("filters");
  distance.value = 0;
  age.value = { min: 18, max: 100 };
  gender.value = null;
  location.value = ""; // Assuming location is used somewhere
  getMatch();
  $q.notify({
    color: "red",
    textColor: "white",
    message: "Filters have been cleared!",
    icon: "clear",
    position: "top",
    timeout: 2000,
  });
  filter.value = false;
};

const handleTouchStart = (event) => {
  touchStart.value = event.changedTouches[0].screenX;
};

const handleTouchEnd = (event) => {
  touchEnd.value = event.changedTouches[0].screenX;
  const swipeDistance = touchStart.value - touchEnd.value;

  if (swipeDistance > 50) {
    showNotif();
    nextItem();
  } else if (swipeDistance < -50) {
    showLike();
    nextItem();
  }
};

const nextItem = () => {
  if (currentIndex.value < info.value?.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const showNotif = async () => {
  try {
    const matchId = info.value[currentIndex.value]?.id;
    if (!matchId) throw new Error("Match ID not found");
    const response = await apiClient.post("/matches/request/", {
      person_to_match: matchId,
    });
    if (response.data.success) {
      $q.notify({
        icon: "heart_broken",
        iconSize: "18rem",
        textColor: "red",
        color: "transparent",
        position: "center",
        timeout: 500,
      });
    } else {
      error.value = res.data.message || "Error registering";
    }
  } catch (err) {
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Registration failed:", err);
    Loading.hide();
  }
};

const showLike = async () => {
  const matchId = info.value[currentIndex.value]?.id;

  try {
    const response = await apiClient.post("/matches/request/", {
      person_to_match: matchId,
    });
    if (response.data.success) {
      $q.notify({
        icon: "favorite",
        iconSize: "18rem",
        textColor: "red",
        color: "transparent",
        position: "center",
        timeout: 500,
        classes: "pulsate-icon",
      });
    } else {
      error.value = res.data.message || "Error registering";
    }
  } catch (err) {
    Loading.hide();
    error.value =
      err.response?.data?.message?.en ||
      "Something went wrong, please try again or reach out to customer support";
    console.error("Registration failed:", err);
  }
};

onMounted(async () => {
  await getMatch();
  retrieveFilters();
  await fetchCityAndCountry();
});

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const dismissError = () => {
  error.value = null;
  Loading.hide();
};
</script>

<style lang="scss" scoped>
:deep(.q-field__control) {
  padding: 0;
  height: 2.5rem;
  display: flex;
  align-items: center;
}
:deep(.q-badge) {
  background-color: white !important;
  font-size: 0.9rem;
  color: black;
}
@keyframes pulsate {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulsate-icon {
  animation: pulsate 1s infinite;
}
</style>
