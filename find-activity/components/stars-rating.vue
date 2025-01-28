<template>
  <div class="flex items-center" aria-labelledby="rating-label">
    <ul>
      <li
        v-for="star in 5"
        :key="star"
        class="relative inline-block text-xs"
        role="img"
        aria-label="Star rating"
      >
        <span class="text-gray-300">★</span>
        <span v-if="isFullStar(star)" class="absolute inset-0 text-yellow-400">
          ★
        </span>
        <span
          v-if="isHalfStar(star)"
          class="absolute inset-0 text-yellow-400"
          style="clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%)"
        >
          ★
        </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  rating: number;
}>();

const isFullStar = (star: number) => {
  return star <= Math.floor(props.rating);
};

const isHalfStar = (star: number) => {
  return star === Math.ceil(props.rating) && !isFullStar(star);
};
</script>
