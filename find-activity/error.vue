<template>
  <div
    class="flex flex-col justify-center items-center h-screen bg-gray-100 text-center"
  >
    <h1 class="text-4xl font-bold text-red-500 mb-4">
      {{ error?.statusCode }}
    </h1>
    <p class="text-lg text-gray-700 mb-4">
      {{ error?.essage || 'An error occurred. Please try again later.' }}
    </p>
    <NuxtLink to="/" class="text-blue-500 hover:underline">
      Go back to the homepage
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});
</script>
