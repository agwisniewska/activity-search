<template>
  <div class="flex flex-col min-h-screen">
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h1 class="text-sm sm:text-lg mb-6">
          <!-- TODO: move all hard-coded translations to a translation file and implement internationalization, eg. nuxt-i18n -->
          Discover the best activities, destinations, and experiences tailored
          for you.
        </h1>
        <SearchBox
          placeholder="Search activities..."
          :initial-query="searchQuery"
          aria-label="Search activities"
          @search="handleSearch"
        />
      </div>
    </div>
    <div class="container mx-auto p-4 flex flex-col min-h-screen">
      <div class="flex items-center">
        <SearchFilters />
      </div>
      <div class="flex justify-end items-center">
        <SearchSorting />
      </div>

      <div>
        <div v-if="status === 'pending'">
          <div
            v-for="n in 4"
            :key="n"
            class="bg-gray-200 animate-pulse rounded-lg h-48 w-full"
            aria-hidden="true"
          />
        </div>

        <p v-else-if="error" class="text-center text-red-500">
          Error: {{ error.message }}
        </p>

        <div v-else>
          <template v-if="filteredResults && filteredResults.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ActivityCard
                v-for="activity in filteredResults"
                :key="activity.title"
                :activity="activity"
              />
            </div>
            <SearchPagination
              :current-page="page"
              :total-pages="totalPages"
              @page-change="goToPage"
            />
          </template>
          <p v-else class="text-center text-gray-500">
            No activities found for your search.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Activity } from '~/types/activity';
import { gql } from '@apollo/client/core';

// TODO: move all queries and types to a separate file and import them as needed
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

const route = useRoute();

const searchQuery = ref(normalizeQueryValue(route.query.search));
const page = ref(route.query.page ? Number(route.query.page) : 1);

const activitiesStore = useActivitiesStore();
const filtersStore = useFiltersStore();

const storeKey = computed(() =>
  activitiesStore.generateKey(searchQuery.value, page.value)
);

// it's like that due to the test data, but tcan be bigger for website, eg. 25, for mobile it should be smaller
const ACTIVITIES_LIMIT = 5;

const { data, error, refresh, status } = useAsyncData<{
  items: Activity[];
  page: number;
  pageSize: number;
  totalCount: number;
}>(storeKey.value, async () => {
  if (!searchQuery.value) {
    return {
      items: [],
      page: 1,
      pageSize: ACTIVITIES_LIMIT,
      totalCount: 0,
    };
  }

  const resultsAvailableInStore = activitiesStore.getResults(storeKey.value);
  if (resultsAvailableInStore) {
    return resultsAvailableInStore;
  }
  const { $apollo } = useNuxtApp();

  const { data, errors } = await $apollo.query<
    GQLActivities,
    GQLActivityVariables
  >({
    query: GET_ACTIVITIES,
    variables: {
      search: searchQuery.value,
      page: page.value,
      limit: ACTIVITIES_LIMIT,
    },
  });

  // TODO: implement custom error handling
  if (errors && errors.length > 0) throw new Error(errors[0].message);

  if (data.activities.items.length > 0) {
    activitiesStore.setResults(storeKey.value, data.activities, 300);
  }

  activitiesStore.totalCount = data.activities.totalCount;

  return data.activities;
});

const filteredResults = computed(() => {
  if (!data.value?.items) return [];

  const filtered = data.value.items.filter((activity) => {
    if (filtersStore.specialOffer && !activity.specialOffer) return false;

    if (
      filtersStore.priceRange &&
      activity.price > Number(filtersStore.priceRange)
    ) {
      return false;
    }

    if (filtersStore.rating && activity.rating <= Number(filtersStore.rating))
      return false;

    return true;
  });

  return filtered.sort((a: Activity, b: Activity) => {
    switch (filtersStore.sortOrder) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-asc':
        return a.rating - b.rating;
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
});

watch(
  error,
  () => {
    if (error.value) {
      // TODO: implement custom logger
      console.error({ error: error.value }, 'Failed to load activities');
    }
  },
  { immediate: true }
);

watch(
  () => route.query,
  () => {
    searchQuery.value = normalizeQueryValue(route.query.search);
    page.value = route.query.page ? Number(route.query.page) : 1;
    refresh();
  },
  { immediate: true }
);

function handleSearch(searchPhrase: string) {
  if (!searchPhrase) {
    navigateTo({ path: '/activities' });
    return;
  }
  navigateTo({
    path: route.path,
    query: { search: searchPhrase, page: 1 },
  });
}

const totalPages = computed(() => {
  if (!data.value) return 0;
  return Math.ceil(data.value.totalCount / ACTIVITIES_LIMIT);
});

function goToPage(newPage: number) {
  page.value = newPage;
  navigateTo({
    path: route.path,
    query: { search: searchQuery.value, page: newPage },
  });
  refresh();
}
</script>
