<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/common/SiteNavigation.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 400ms ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
