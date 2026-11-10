import axios from "axios";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const useGeoapifyApi = () => {
  const searchCities = (query) =>
    axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query,
      )}&type=city&apiKey=${API_KEY}`,
    );

  return { searchCities };
};
