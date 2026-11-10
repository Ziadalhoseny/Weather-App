<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Preview Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are previewing this city, please click "+" icon to start tracking
        this city.
      </p>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">{{ formattedDate }} {{ formattedTime }}</p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp_c) }}&deg;
      </p>
      <p>Feels Like {{ Math.round(weatherData.current.feelslike_c) }}&deg;</p>
      <p class="capitalize">{{ weatherData.current.condition.text }}</p>
      <img
        :src="`https:${weatherData.current.condition.icon}`"
        :alt="weatherData.current.condition.text"
        class="w-[150px] h-auto"
      />
    </div>

    <hr class="border border-white opacity-10 w-full" />

    <HourlyForecast
      :hours="hourlyForecast"
      :timezone="weatherData.location.tz_id"
    />

    <hr class="border border-white opacity-10 w-full" />

    <WeeklyForecast :days="weeklyForecast" />

    <!-- remove city -->
    <div
      @click="removeCity"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HourlyForecast from "../components/weather/HourlyForecast.vue";
import WeeklyForecast from "../components/weather/WeeklyForecast.vue";
import { useSavedCities } from "../composables/useSavedCities";
import { useWeatherApi } from "../composables/useWeatherApi";

const route = useRoute();
const { getSavedCities, setSavedCities } = useSavedCities();
const { getForecast } = useWeatherApi();

const fetchWeatherData = async () => {
  try {
    const { data } = await getForecast(route.query.lat, route.query.lng);

    // Use UTC timestamps directly (seconds -> milliseconds)
    data.currentTime = data.location.localtime_epoch * 1000;

    if (data.forecast?.forecastday?.[0]?.hour) {
      data.forecast.forecastday[0].hour.forEach((hour) => {
        hour.currentTime = hour.time_epoch * 1000;
      });
    }

    await new Promise((res) => setTimeout(res, 700));

    return data;
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
    throw err;
  }
};

const weatherData = await fetchWeatherData();

const formattedDate = computed(() => {
  if (!weatherData?.currentTime) return "";
  return new Date(weatherData.currentTime).toLocaleDateString("en-us", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  });
});

const formattedTime = computed(() => {
  if (!weatherData?.currentTime) return "";
  return new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
    timeStyle: "short",
    timeZone: weatherData.location.tz_id, // Target city timezone
  });
});

const hourlyForecast = computed(() => {
  return weatherData.forecast?.forecastday?.[0]?.hour || [];
});

const weeklyForecast = computed(() => {
  return weatherData.forecast?.forecastday || [];
});

const router = useRouter();
const removeCity = () => {
  const cities = getSavedCities();
  const updatedCities = cities.filter((city) => city.id !== route.query.id);

  setSavedCities(updatedCities);

  router.push({
    name: "home",
  });
};
</script>
