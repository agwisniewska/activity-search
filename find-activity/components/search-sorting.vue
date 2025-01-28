<template>
  <div class="flex items-end mb-4">
    <div class="flex flex-col mr-4">
      <label for="sort-order" class="text-sm text-gray-700">Sort By</label>
      <select
        id="sort-order"
        v-model="filters.sortOrder"
        class="h-10 px-2 border border-gray-300 rounded-md text-xs focus:ring focus:ring-blue-300"
        aria-label="Select sorting order"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  </div>
</template>
<script setup lang="ts">
const filters = useFiltersStore();
</script>
