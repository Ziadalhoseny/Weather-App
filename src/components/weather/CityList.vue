<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations add, To start tracking a location, Search in the field above.
  </p>
</template>

<script setup>
import CityCard from "./CityCard.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSavedCities } from "../../composables/useSavedCities";
import { useWeatherApi } from "../../composables/useWeatherApi";

const savedCities = ref([]);
const { hasSavedCities, getSavedCities } = useSavedCities();
const { getCurrentWeather } = useWeatherApi();

const getCities = async () => {
  if (hasSavedCities()) {
    savedCities.value = getSavedCities();
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(getCurrentWeather(city.coords.lat, city.coords.lng));
  });

  const weatherData = await Promise.all(requests);

  await new Promise((res) => setTimeout(res, 700));

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
