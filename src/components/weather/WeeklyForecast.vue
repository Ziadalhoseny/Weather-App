<template>
  <div class="max-w-screen-md w-full py-6">
    <div
      class="mx-6 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"
    >
      <h2 class="text-lg font-extrabold text-white mb-4">7 Day Forecast</h2>

      <div class="flex flex-col gap-3">
        <div
          v-for="day in days"
          :key="day.date_epoch"
          class="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all duration-300 shadow-sm"
        >
          <p class="flex-1 text-sm font-bold text-white">
            {{ formatDayName(day.date_epoch) }}
          </p>

          <div class="flex items-center gap-2 flex-1 justify-center">
            <img
              class="w-10 h-10 object-contain drop-shadow"
              :src="`https:${day.day.condition.icon}`"
              :alt="day.day.condition.text"
            />
          </div>

          <div
            class="flex gap-4 flex-1 justify-end text-sm text-white font-semibold"
          >
            <span class="font-black"
              >H: {{ Math.round(day.day.maxtemp_c) }}°</span
            >
            <span class="text-white/60"
              >L: {{ Math.round(day.day.mintemp_c) }}°</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  days: {
    type: Array,
    required: true,
  },
});

const formatDayName = (epoch) => {
  if (!epoch) return "";
  return new Date(epoch * 1000).toLocaleDateString("en-us", {
    weekday: "long",
  });
};
</script>
