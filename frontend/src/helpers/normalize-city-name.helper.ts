export const normalizeCityName = (name: string) => {
  return name.trim().normalize('NFD').replace(/\p{Diacritic}/gu, "").toUpperCase();
};
