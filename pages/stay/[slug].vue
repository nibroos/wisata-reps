<template>
  <div>

    <div class="flex flex-col gap-4 mt-16 sm:mt-0">
      <div class="flex flex-col gap-4">
        <div v-if="isLoadingProperty" class="flex flex-row sm:flex-col gap-4 items-center md:px-8 sm:px-0 py-8 sm:pt-2">
          <LoadingComponent :cols="1" :rows="3" :height="10" class="w-4/12 sm:w-8/12 xs:w-10/12" />
          <LoadingComponent :cols="1" :rows="5" :height="10" class="w-8/12 xs:w-10/12" />
        </div>
        <HeadlinePropertyComponent v-else-if="property.status >= 200 && property.status < 300" :propertyId="propertyId"
          :property="property" />
        <TabComponent v-if="Object.keys(property.data).length > 0" :configs="tabConfigs" @activeTab="toggleTab"
          class="border-t sm:border-t-0 border-zinc-300 dark:border-zinc-700 uppercase flex justify-center" />
        <div class="flex flex-row sm:flex-col justify-center sm:!justify-start text-sm gap-4 sm:px-8 ms:px-4 sm:mt-1">
          <div class="flex flex-row items-center gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M22 3H2l8 9.46V19l4 2v-8.54z" />
            </svg>
            <span>Filter rooms by</span>
          </div>
          <div class="flex flex-row sm:flex-wrap gap-4 font-medium">

            <OptionMultiSelectComponent :class="'xs:!w-full'" label="Free Breakfast" labelFor="isFreeBreakfast"
              :optionValue="isFreeBreakfast" @update:selected="isFreeBreakfast = $event">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M18 3a1 1 0 0 1 .993.883L19 4v16a1 1 0 0 1-1.993.117L17 20v-5h-1a1 1 0 0 1-.993-.883L15 14V8c0-2.21 1.5-5 3-5m-6 0a1 1 0 0 1 .993.883L13 4v5a4.002 4.002 0 0 1-3 3.874V20a1 1 0 0 1-1.993.117L8 20v-7.126a4.002 4.002 0 0 1-2.995-3.668L5 9V4a1 1 0 0 1 1.993-.117L7 4v5a2 2 0 0 0 1 1.732V4a1 1 0 0 1 1.993-.117L10 4l.001 6.732a2 2 0 0 0 .992-1.563L11 9V4a1 1 0 0 1 1-1" />
                </svg>
              </template>
            </OptionMultiSelectComponent>

            <OptionMultiSelectComponent :class="'xs:!w-full'" label="Free Cancelation" labelFor="isFreeCancelation"
              :optionValue="isFreeCancelation" @update:selected="isFreeCancelation = $event">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h4c.55 0 1-.45 1-1s-.45-1-1-1H4v-6h18V6c0-1.1-.9-2-2-2m0 4H4V6h16zm-5.07 11.17l-2.12-2.12a.996.996 0 1 0-1.41 1.41l2.83 2.83c.39.39 1.02.39 1.41 0l5.66-5.66a.996.996 0 1 0-1.41-1.41z" />
                </svg>
              </template>
            </OptionMultiSelectComponent>

          </div>
        </div>

        <ListRoomComponent :isLoadingAvailabilities="isLoadingAvailabilities" :isLoadingProperty="isLoadingProperty"
          :availabilities="availabilities" :property="property" :propertyId="propertyId"
          :isFreeBreakfast="isFreeBreakfast" :isFreeCancelation="isFreeCancelation"
          class="md:!px-8 sm:!px-0 pt-4 mb-16" />

      </div>
    </div>
  </div>
</template>

<script setup>

const isFreeBreakfast = ref(0)
const isFreeCancelation = ref(0)

const route = useRoute()
const {
  initialLoadProperty,
  initialLoadProperties,
  properties, getProperties,
  isLoadingProperty, property, getProperty,
  isLoadingAvailabilities, availabilities, getAvailabilities
} = useProperties()

const tabConfigs = {
  tabs: [
    {
      name: 'Deals',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42M13 20.01L4 11V4h7v-.01l9 9z"/><circle cx="6.5" cy="6.5" r="1.5" fill="currentColor"/></svg>',
      class: 'text-xs'
    },
    {
      name: 'Photos',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4v4h4V4zm6 0v4h4V4zm0 6v4h4v-4zm0 6v4h4v-4zm-2 4v-4h-4v4zm-6 0v-4H4v4zm0-6v-4H4v4zm0-6V4H4v4zm2 6h4v-4h-4zM4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4c-1.08 0-2-.9-2-2V4a2 2 0 0 1 2-2"/></svg>',
      class: 'text-xs'
    },
    {
      name: 'Info',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>',
      class: 'text-xs'
    },
  ],
  activeTab: 0,
  showSmScreen: 'icon',
}

const slug = ref('')
const propertyId = ref('')

const toggleTab = (index) => {
  tabConfigs.activeTab = index
}

onMounted(() => {
  // getProperties(route.params.slug)
})

watchEffect(() => {
  // if (properties.value.data.length > 0 && Object.keys(property.value.data).length === 0) {
  //   propertyId.value = properties.value.data[0].id
  //   getProperty(propertyId.value)
  //   getAvailabilities(propertyId.value)
  // }

  if (properties.value.data.length === 0) {
    slug.value = route.params.slug
    propertyId.value = slug.value.substring(slug.value.lastIndexOf('-') + 1)
  }

  if (!!propertyId.value && property.value.status === 0 && Object.keys(property.value.data).length === 0 && !!initialLoadProperty.value && !!initialLoadProperties.value) {
    getProperty(propertyId.value)
  }

  if (Object.keys(property.value.data).length !== 0) {
    getAvailabilities(propertyId.value)
    useSeoMeta({
      title: property.value.meta.title,
      description: property.value.meta.description,
    })
  }

})

</script>