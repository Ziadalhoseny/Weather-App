<template>
  <div class="max-w-screen-md w-full py-6">
    <div
      class="mx-6 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"
    >
      <h2 class="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
        Hourly Forecast
      </h2>

      <div
        class="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50 transition-colors"
      >
        <div
          v-for="hour in hours"
          :key="hour.time_epoch"
          class="snap-center flex flex-col gap-3 items-center min-w-[80px] p-3 rounded-2xl bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg group"
        >
          <p
            class="whitespace-nowrap text-xs font-bold text-white/80 group-hover:text-white"
          >
            {{ formatHourTime(hour.currentTime) }}
          </p>
          <img
            class="w-12 h-12 object-contain drop-shadow group-hover:scale-110 transition-transform duration-300"
            :src="`https:${hour.condition.icon}`"
            :alt="hour.condition.text"
          />
          <p class="text-lg font-black text-white">
            {{ Math.round(hour.temp_c) }}°
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hours: {
    type: Array,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

const formatHourTime = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString("en-us", {
    hour: "numeric",
    timeZone: props.timezone,
  });
};
</script>
