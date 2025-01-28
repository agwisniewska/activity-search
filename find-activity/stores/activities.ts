import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Activity } from '~/types/activity';

interface Results {
  items: Activity[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export const useActivitiesStore = defineStore('activities', () => {
  const resultsByKey = ref(new Map<string, { data: Results; expiry: number }>());

  const totalCount = ref(0);
  const pageSize = ref(10);

  function generateKey(searchQuery: string, page: number) {
    return JSON.stringify({ searchQuery, page });
  }

  function setResults(key: string, data: Results, ttl: number = 300) {
    const expiry = Date.now() + ttl * 1000;
    resultsByKey.value.set(key, { data, expiry });
  }

  function getResults(key: string) {
    const entry = resultsByKey.value.get(key);
    if (entry && entry.expiry > Date.now()) {
      return entry.data;
    } else {
      resultsByKey.value.delete(key);
      return null;
    }
  }

  function clearCache(keys: string[] = []) {
    if (keys.length === 0) {
      resultsByKey.value.clear();
    } else {
      keys.forEach((key) => resultsByKey.value.delete(key));
    }
  }

  const cacheSize = computed(() => resultsByKey.value.size);

  return {
    resultsByKey,
    totalCount,
    pageSize,
    generateKey,
    setResults,
    getResults,
    clearCache,
    cacheSize,
  };
});