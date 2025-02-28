<template>
  <main class="container mx-auto mt-4" role="main">
    <div v-if="error" class="col-span-3">
      <p class="text-red-500">Error: {{ error.message }}</p>
    </div>
    <div class="grid grid-cols-3 gap-4" v-else-if="data">
      <section class="col-span-3">
        <div class="flex items-center">
          <StarsRating
            :rating="data.rating"
            aria-label="Rating: {{ data.rating.toFixed(1) }} out of 5"
          />
          <span class="ml-2 text-gray-600 text-sm">
            {{ data.rating.toFixed(1) }} / 5
          </span>
        </div>
        <h1 class="text-xl font-bold mb-2">{{ data.title }}</h1>
      </section>

      <section class="col-span-1 md:col-span-2">
        <picture class="w-full h-[400px]">
          <source
            srcset="../../assets/images/image.webp"
            type="image/webp"
          />
          <source
            srcset="../../assets/images/activity.jpg"
            media="(min-width: 768px)"
            type="image/jpeg"
          />
          <img
            src="../../assets/images/activity.jpg"
            alt="activity"
            class="w-full h-[400px]"
          />
        </picture>
        <div class="description mt-4">
          <h2 class="text-xl font-semibold mb-1">Details</h2>
          <p class="text-gray-700 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <aside class="col-span-1 md:col-span-1">
        <h3 class="text-xl font-semibold">Address</h3>
        <div class="rounded p-4 border border-gray-200 mb-4">
          <div class="flex items-center">
            <MapIcon />
            <p class="text-xs text-gray-700 ml-2">
              {{ data.supplier.address }}, {{ data.supplier.city }},
              {{ data.supplier.country }}
            </p>
          </div>
          <p class="text-md font-medium mt-2">
            {{ data.supplier.name }}
          </p>
        </div>
        <div class="rounded p-4 border border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-900">
              {{ data.price }}{{ data.currency }}
            </h3>
            <button
              class="p-2 bg-orange-400 text-white rounded font-medium text-sm hover:bg-orange-600 transition"
            >
              Book Now
            </button>
          </div>
          <span
            v-if="data.specialOffer"
            class="mt-2 inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded"
          >
            Special Offer
          </span>
        </div>
      </aside>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useAsyncData, useRoute, useNuxtApp } from '#app';
import { computed } from 'vue';
import { gql } from '@apollo/client/core';
import type { Activity } from '~/types/activity';
import MapIcon from '~/components/icons/map-icon.vue';

type GQLActivity = {
  activity: Activity;
};

type GQLActivityVariables = {
  activityId: number;
};

const GET_ACTIVITY = gql`
  query Activity($activityId: Int!) {
    activity(activityId: $activityId) {
      title
      price
      currency
      rating
      specialOffer
      supplier {
        name
        address
        zip
        city
        country
      }
    }
  }
`;

const route = useRoute();
const activityId = computed(() => route.params.id);

const { data, error } = await useAsyncData<Activity>(
  'activity-details',
  async () => {
    const { $apollo } = useNuxtApp();

    const { data, errors } = await $apollo.query<
      GQLActivity,
      GQLActivityVariables
    >({
      query: GET_ACTIVITY,
      variables: { activityId: Number(activityId.value) },
    });

    if (errors && errors.length) {
      throw new Error(errors[0].message);
    }
    if (errors && errors.length > 0) throw new Error(errors[0].message);
    return data.activity;
  }
);

watch(
  error,
  () => {
    if (error.value) {
      // TODO: use custom logger
      console.error({ error: error.value }, 'Failed to load activities');
    }
  },
  { immediate: true }
);
</script>
