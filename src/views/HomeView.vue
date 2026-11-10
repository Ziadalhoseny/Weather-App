<template>
  <main class="my-container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="geoapifySearchResults"
        class="absolute w-full bg-weather-secondary text-white shadow-md py-2 px-1 top-[66px] rounded-md"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && geoapifySearchResults.length === 0">
          No results match your query, please try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in geoapifySearchResults"
            :key="searchResult.properties.place_id"
            @click="previewCity(searchResult)"
            class="py-2 px-2 cursor-pointer hover:bg-black/20 rounded"
          >
            {{ searchResult.properties.formatted }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <cityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import CityList from "../components/weather/CityList.vue";
import CityCardSkeleton from "../components/weather/CityCardSkeleton.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGeoapifyApi } from "../composables/useGeoapifyApi";

const { searchCities } = useGeoapifyApi();

const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.properties.formatted.split(",");
  router.push({
    name: "cityView",
    params: {
      state: state ? state.trim() : "",
      city: city ? city.trim() : "",
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const geoapifySearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim() !== "") {
      try {
        const response = await searchCities(searchQuery.value);

        geoapifySearchResults.value = response.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    geoapifySearchResults.value = null;
  }, 300);
};
</script>
