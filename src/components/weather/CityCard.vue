<template>
  <div
    class="flex items-center justify-between py-5 px-6 bg-weather-secondary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-weather-primary/30 group"
  >
    <!-- Left Side: City Info -->
    <div class="flex flex-col flex-1 gap-1">
      <h2
        class="text-2xl sm:text-3xl font-bold tracking-wide text-white group-hover:text-weather-primary transition-colors"
      >
        {{ city.city }}
      </h2>
      <h3 class="text-sm sm:text-base text-gray-400 font-medium">
        {{ city.state }}
      </h3>
    </div>

    <!-- Right Side: Weather Temp & Feels like -->
    <div class="flex flex-col items-end gap-1">
      <p class="text-3xl sm:text-4xl font-extrabold text-white">
        {{ Math.floor(city.weather.current.temp_c) }}&degC
      </p>

      <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
        <span>Feels like</span>
        <span class="font-semibold text-gray-200">
          {{ Math.floor(city.weather.current.feelslike_c) }}&deg
        </span>
      </div>

      <!-- Optional: Weather condition text if available -->
      <span
        v-if="city.weather.current.condition"
        class="text-xs text-weather-primary font-medium mt-0.5"
      >
        {{ city.weather.current.condition.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>
