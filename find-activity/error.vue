<template>
  <p class="mt-8">{{ error.statusCode }} {{ error.message }}</p>
  <div
    v-if="error.stack"
    class="mt-6 bg-gray-100 p-4 rounded-6 overflow-auto"
    v-html="error.stack"
  />
</template>

<script lang="ts" setup>
defineProps<{
  error: { statusCode: number; message: string; stack: string };
}>();
</script>
