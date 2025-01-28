<template>
  <div aria-labelledby="filter-heading">
    <ul class="flex flex-wrap space-x-4 space-y-4 md:space-y-0">
      <li class="flex flex-col mr-4">
        <label for="price-range" class="text-sm text-gray-700"
          >Price Range</label
        >
        <select
          id="price-range"
          v-model="filters.priceRange"
          class="h-10 px-2 border border-gray-300 rounded-md text-xs focus:ring focus:ring-blue-300"
        >
          <option value="">All</option>
          <option value="50">up to $50</option>
          <option value="100">up to $100</option>
          <option value="200">up to $200</option>
          <option value="300">up to $300</option>
        </select>
      </li>

      <li class="flex flex-col mr-4">
        <label for="rating " class="text-sm text-gray-700"
          >Minimum Rating</label
        >
        <select
          id="rating"
          v-model="filters.rating"
          class="h-10 px-2 border border-gray-300 rounded-md text-xs"
        >
          <option value="">All</option>
          <option value="4">Above 4</option>
          <option value="4.5">Above 4.5</option>
        </select>
      </li>
      <li class="flex items-end mr-4">
        <input
          id="special-offer"
          v-model="filters.specialOffer"
          type="checkbox"
          class="h-4 w-4 text-blue-600 border-gray-300 rounded mb-1"
        />
        <label for="special-offer" class="ml-2 text-sm text-gray-700">
          Special Offer
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const filters = useFiltersStore();
</script>
