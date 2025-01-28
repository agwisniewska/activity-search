<template>
  <NuxtLink
    :to="`/activities/${activity.id}`"
    class="block"
    aria-label="View details for {{ activity.title }}"
  >
    <div class="grid grid-rows-2 bg-white border rounded">
      <div class="relative overflow-hidden rounded">
        <picture>
          <source
            srcset="../assets/images/dummy-image.webp"
            type="image/webp"
          />

          <source
            srcset="../assets/images/activity.jpg"
            media="(min-width: 768px)"
            type="image/jpeg"
          />
          <img src="../assets/images/activity.jpg" alt="activity" />
        </picture>
      </div>

      <div class="flex flex-col justify-between">
        <div class="py-2 px-2">
          <h2 class="text-md font-semibold text-gray-900">
            {{ activity.title }}
          </h2>
          <span
            v-if="activity.specialOffer"
            class="bg-orange-100 text-orange-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
          >
            Special Offer
          </span>
        </div>
        <div class="py-2 px-2">
          <StarsRating :rating="activity.rating" aria-hidden="true" />
          <span class="ml-2 text-gray-600 text-sm">
            {{ activity.rating.toFixed(1) }}
          </span>
          <p class="text-gray-600">
            <span class="text-xs"> From: </span>
            <span class="font-bold"
              >{{ activity.price }} {{ activity.currency }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import type { Activity } from '~/types/activity';

defineProps<{
  activity: Activity;
}>();
</script>
