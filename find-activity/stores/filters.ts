import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFiltersStore = defineStore('filters', () => {
  const specialOffer = ref(false);
  const priceRange = ref('');
  const rating = ref('');
  const sortOrder = ref('');

  function setFilter(
    key: 'specialOffer' | 'priceRange' | 'rating' | 'sortOrder',
    value: string | boolean
  ) {
    switch (key) {
      case 'specialOffer':
        specialOffer.value = value as boolean;
        break;
      case 'priceRange':
        priceRange.value = value as string;
        break;
      case 'rating':
        rating.value = value as string;
        break;
      case 'sortOrder':
        sortOrder.value = value as string;
        break;
    }
  }

  function resetFilters() {
    specialOffer.value = false;
    priceRange.value = '';
    rating.value = '';
    sortOrder.value = '';
  }

  return {
    specialOffer,
    priceRange,
    rating,
    sortOrder,
    setFilter,
    resetFilters,
  };
});