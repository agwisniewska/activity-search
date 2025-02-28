<template>
  <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h1 class="text-3xl sm:text-5xl font-bold mb-4">
        Adventures You'll Never Miss
      </h1>
      <h2 class="text-sm sm:text-lg mb-6">
        <!-- TODO: move all hard-coded translations to a translation file and implement internationalization, eg. nuxt-i18n -->
        Discover the best activities, destinations, and experiences tailored for
        you.
      </h2>
      <SearchBox placeholder="Search activities..." @search="handleSearch" />

      <div
        v-if="data && data.items.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <ActivityCard
          v-for="activity in data.items"
          :key="activity.title"
          :activity="activity"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { gql } from '@apollo/client/core';
import type { Activity } from '~/types/activity';

function handleSearch(searchQuery: string) {
  if (!searchQuery) {
    return;
  }
  navigateTo({
    path: '/activities',
    query: { search: searchQuery, page: 1 },
  });
}

type GQLActivities = {
  activities: {
    items: Activity[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
};

type GQLActivityVariables = {
  search: string;
  page: number;
  limit: number;
};

const GET_ACTIVITIES = gql`
  query Activities($search: String, $page: Int, $limit: Int) {
    activities(search: $search, page: $page, limit: $limit) {
      items {
        id
        title
        price
        currency
        rating
        supplier {
          name
        }
      }
      totalCount
      page
      pageSize
    }
  }
`;

const { data } = useAsyncData<{
  items: Activity[];
}>('allresults', async () => {
  const { $apollo } = useNuxtApp();

  const { data, errors } = await $apollo.query<
    GQLActivities,
    GQLActivityVariables
  >({
    query: GET_ACTIVITIES,
  });

  if (errors && errors.length > 0) throw new Error(errors[0].message);

  return data.activities;
});
</script>
