<template>
  <div>

    <div class="flex flex-col gap-4 mt-16 sm:mt-0">
      <div class="flex flex-col gap-4">
        <div v-if="isLoadingProperty" class="flex flex-row sm:flex-col gap-4 items-center md:px-8 sm:px-0 pb-8">
          <LoadingComponent :cols="1" :rows="3" :height="10" class="w-4/12 sm:w-8/12 xs:w-10/12" />
          <LoadingComponent :cols="1" :rows="5" :height="10" class="w-8/12 xs:w-10/12" />
        </div>
        <HeadlinePropertyComponent v-else-if="property.status >= 200 && property.status < 300" :propertyId="propertyId"
          :property="property" />
        <TabComponent :configs="tabConfigs" @activeTab="toggleTab"
          class="border-t sm:border-t-0 border-zinc-300 dark:border-zinc-700 uppercase flex justify-center" />
        <ListRoomComponent :isLoading="isLoadingAvailabilities" :data="availabilities" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const {
  properties, getProperties,
  isLoadingProperty, property, getProperty,
  isLoadingAvailabilities, availabilities, getAvailabilities
} = useProperties()

const tabConfigs = {
  tabs: [
    {
      name: 'Deals',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42M13 20.01L4 11V4h7v-.01l9 9z"/><circle cx="6.5" cy="6.5" r="1.5" fill="currentColor"/></svg>',
    },
    {
      name: 'Photos',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4v4h4V4zm6 0v4h4V4zm0 6v4h4v-4zm0 6v4h4v-4zm-2 4v-4h-4v4zm-6 0v-4H4v4zm0-6v-4H4v4zm0-6V4H4v4zm2 6h4v-4h-4zM4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4c-1.08 0-2-.9-2-2V4a2 2 0 0 1 2-2"/></svg>',
    },
    {
      name: 'Info',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>',
    },
  ],
  activeTab: 0,
  showSmScreen: 'icon',
}

const toggleTab = (index) => {
  tabConfigs.activeTab = index
}

onMounted(() => {
  getProperties(route.params.slug)
})

const slug = ref('')
const propertyId = ref('')

watchEffect(() => {
  if (properties.value.data.length > 0 && Object.keys(property.value.data).length === 0) {
    propertyId.value = properties.value.data[0].id
    getProperty(propertyId.value)
    getAvailabilities(propertyId.value)
  }

  if (properties.value.data.length === 0) {
    slug.value = route.params.slug
    propertyId.value = slug.value.substring(slug.value.lastIndexOf('-') + 1)
  }

  if (propertyId.value !== '' && Object.keys(property.value.data).length === 0) {
    getProperty(propertyId.value)
    getAvailabilities(propertyId.value)
  }
})

</script>