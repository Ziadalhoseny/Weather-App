const STORAGE_KEY = "savedCities";

export const useSavedCities = () => {
  const hasSavedCities = () => Boolean(localStorage.getItem(STORAGE_KEY));

  const getSavedCities = () =>
    JSON.parse(localStorage.getItem(STORAGE_KEY));

  const setSavedCities = (cities) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));

  return { hasSavedCities, getSavedCities, setSavedCities };
};
