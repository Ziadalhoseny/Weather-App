<template>
  <teleport to="body">
    <transition name="model-outer">
      <div
        v-show="modelActive"
        class="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center px-8 z-50"
      >
        <transition name="model-inner">
          <div
            v-if="modelActive"
            class="p-4 bg-white self-start mt-32 w-full max-w-screen-md rounded-lg"
          >
            <slot></slot>
            <button
              @click="$emit('close')"
              class="text-white bg-weather-primary mt-8 py-2 px-6 rounded-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
defineEmits(["close"]);
defineProps({
  modelActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.model-outer-enter-active,
.model-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.model-outer-enter-from,
.model-outer-leave-to {
  opacity: 0;
}

.model-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.model-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.model-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.model-inner-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
