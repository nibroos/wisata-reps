<template>
  <div class="text-zinc-900 flex justify-center">
    <div class="flex flex-col justify-center items-center w-full gap-4 sm:px-8">
      <h1 class="text-2xl dark:text-white font-bold">Discover the best hotel deals</h1>

      <form @submit.prevent="getProperties(query)" class="w-6/12 md:w-7/12 sm:w-full">
        <FullTextSearchComponent v-model:searchValue="query"
          :placeholderText="['Ibis jakarta', 'the langham...', 'Hotel jakarta...', 'reddoorz surabaya', 'villa jogja']"
          labelFor="fullTextSearch" />
      </form>

      <div class="w-5/12 md:w-6/12 sm:w-11/12 xs:w-full">
        <ListComponent :data="properties" :isLoading="isLoadingProperties" />
      </div>

    </div>
  </div>
</template>

<script setup>

const { isLoadingProperties, properties, getProperties } = useProperties()
const query = ref('')

</script>