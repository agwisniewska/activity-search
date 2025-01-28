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
    </div>
  </div>
</template>
<script lang="ts" setup>
function handleSearch(searchQuery: string) {
  if (!searchQuery) {
    return;
  }
  navigateTo({
    path: '/activities',
    query: { search: searchQuery, page: 1 },
  });
}
</script>
