<template>
  <nav
    class="flex justify-center items-center mt-8 space-x-4"
    aria-label="Pagination"
  >
    <button
      class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage <= 1"
      @click="goToPage(currentPage - 1)"
      aria-label="Go to previous page"
    >
      Previous
    </button>
    <span class="text-gray-700">Page: {{ currentPage }}</span>
    <button
      class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage >= totalPages"
      @click="goToPage(currentPage + 1)"
      aria-label="Go to next page"
    >
      Next
    </button>
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['pageChange']);

function goToPage(page: number) {
  if (page < 1 || page > props.totalPages) return;
  emit('pageChange', page);
}
</script>
