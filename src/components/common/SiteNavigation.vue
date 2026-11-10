<template>
  <header class="sticky top-0 z-50 bg-weather-primary shadow-lg">
    <nav
      class="my-container flex flex-col sm:flex-row gap-4 items-center py-6 text-white"
    >
      <router-link :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </router-link>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          @click="toggleModel"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <BaseModel :modelActive="modelActive" @close="toggleModel">
        <div class="text-black">
          <h1 class="text-2xl mb-1 font-bold">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl font-medium">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl font-medium">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be an option to
            delete the city.
          </p>
        </div>
      </BaseModel>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";

import BaseModel from "../UI/BaseModel.vue";
import { useSavedCities } from "../../composables/useSavedCities";

const savedCities = ref([]);
const { hasSavedCities, getSavedCities, setSavedCities } = useSavedCities();
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (hasSavedCities()) {
    savedCities.value = getSavedCities();
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  setSavedCities(savedCities.value);

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modelActive = ref(null);
const toggleModel = () => {
  modelActive.value = !modelActive.value;
};
</script>
