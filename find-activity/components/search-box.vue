<template>
  <div class="relative flex items-center w-full max-w-md mx-auto">
    <label for="search-input" class="sr-only">Search activities</label>  
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search activities..."
      class="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      aria-label="Search activities"
      @keydown.enter.prevent="onSearch"
    >
    <button
      class="absolute right-3 text-gray-400 hover:text-blue-300 focus:outline-none"
      aria-label="Execute search"
      @click="onSearch"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
        />
      </svg>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  initialQuery: {
    type: String,
    default: '',
  },
});

const searchQuery = ref(props.initialQuery);

const emit = defineEmits(['search']);
function onSearch() {
  emit('search', searchQuery.value);
}
</script>
