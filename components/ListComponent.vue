<template>
  <div class="dark:text-zinc-200">
    <div v-if="isLoading" class="w-full">
      <LoadingComponent :rows="5" :height="10" />
    </div>
    <div v-else-if="props.data.data.length == 0 && props.data.status != 200" class="w-full">
    </div>
    <div v-else-if="props.data.data.length == 0" class="w-full">
      <div class="flex flex-col w-full justify-center items-center">
        <div class="font-bold truncate">Oops! No result you're looking for</div>
        <div class="text-sm">Try another keyword</div>
      </div>
    </div>
    <div v-else class="flex flex-col w-full">
      <NuxtLink v-for="(item, index) in props.data.data" :key="index"
        class="w-full flex flex-row justify-between hover:bg-blue-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-500 p-2 cursor-pointer transition-all ease-in-out group items-center"
        :class="{ 'rounded-t-lg': index == 0, 'rounded-b-lg': index == props.data.data.length - 1 }"
        :to="'/stay/' + item.slug">
        <div class="flex flex-col w-9/12">
          <div class="font-bold truncate group-hover:whitespace-normal">{{ item.name }}
          </div>
          <div class="text-sm">{{ item.name_suffix }}</div>
        </div>
        <div
          class="hidden font-bold cursor-pointer text-blue-500 px-4 py-2 rounded-full text-sm transition-all ease-in-out group-hover:block whitespace-nowrap">
          See more..
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    data: [],
    message: '',
    status: ''
  },
  isLoading: false
})

onMounted(() => {
})

</script>
