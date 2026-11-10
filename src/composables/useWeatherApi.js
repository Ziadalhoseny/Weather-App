import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.weatherapi.com/v1";

export const useWeatherApi = () => {
  const getCurrentWeather = (latitude, longitude) =>
    axios.get(
      `${API_URL}/current.json?key=${API_KEY}&q=${latitude},${longitude}`,
    );

  const getForecast = (latitude, longitude) =>
    axios.get(
      `${API_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7`,
    );

  return { getCurrentWeather, getForecast };
};
