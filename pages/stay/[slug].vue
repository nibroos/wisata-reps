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
        <div v-if="property.status >= 200 && property.status < 300"
          class="flex flex-row sm:flex-col justify-center sm:!justify-start text-sm gap-4 md:px-8 ms:px-4 sm:mt-1">
          <div class="flex flex-row items-center gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M22 3H2l8 9.46V19l4 2v-8.54z" />
            </svg>
            <span class="whitespace-nowrap">Filter rooms by</span>
          </div>
          <div class="flex flex-row flex-wrap items-center gap-4 font-medium">

            <CapsuleInputComponent :class="'xs:!w-full'" label="Rooms" labelFor="number_of_rooms"
              :initialValue="number_of_rooms" @update:inputValue="number_of_rooms = $event">
              <template #icon>
                <svg class="w-max" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M4 21q-.425 0-.712-.288T3 20q0-.425.288-.712T4 19h1V4q0-.425.288-.712T6 3h8q.425 0 .713.288T15 4h3q.425 0 .713.288T19 5v14h1q.425 0 .713.288T21 20q0 .425-.288.713T20 21h-2q-.425 0-.712-.288T17 20V6h-2v14q0 .425-.288.713T14 21zM7 5v14zm5 7q0-.425-.288-.712T11 11q-.425 0-.712.288T10 12q0 .425.288.713T11 13q.425 0 .713-.288T12 12m-5 7h6V5H7z" />
                </svg>
              </template>
            </CapsuleInputComponent>

            <CapsuleInputComponent :class="'xs:!w-full'" label="Guests" labelFor="number_of_guests"
              :initialValue="number_of_guests" @update:inputValue="number_of_guests = $event">
              <template #icon>
                <svg class="w-max" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1" />
                </svg>
              </template>
            </CapsuleInputComponent>

            <VueDatePicker v-model="checkin" auto-apply placeholder="Select date" @update:model-value="setStartDate"
              format="dd/MM/yyyy" cancelText="Cancel" selectText="Select" :enable-time-picker="false" show-now-button
              :clearable="false" text-input class="!w-40 xs:!w-full">
              <template #now-button="{ selectCurrentDate }">
                <button class="hover:bg-gray-100 dark:hover:bg-zinc-900 w-full text-sm dark:text-white transition p-2"
                  @click="selectCurrentDate()">Today</button>
              </template>
            </VueDatePicker>

            <VueDatePicker v-model="checkout" auto-apply placeholder="Select date" @update:model-value="setEndDate"
              format="dd/MM/yyyy" cancelText="Cancel" selectText="Select" :enable-time-picker="false" show-now-button
              :clearable="false" text-input class="!w-40 xs:!w-full">
              <template #now-button="{ selectCurrentDate }">
                <button class="hover:bg-gray-100 dark:hover:bg-zinc-900 w-full text-sm dark:text-white transition p-2"
                  @click="selectCurrentDate()">Today</button>
              </template>
            </VueDatePicker>

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

        <ListRoomComponent v-if="property.status >= 200 && property.status < 300"
          :isLoadingAvailabilities="isLoadingAvailabilities" :isLoadingProperty="isLoadingProperty"
          :availabilities="availabilities" :property="property" :propertyId="propertyId"
          :isFreeBreakfast="isFreeBreakfast" :isFreeCancelation="isFreeCancelation"
          class="md:!px-8 sm:!px-0 pt-4 mb-16" />

        <div v-else-if="!isLoadingProperty && property.status > 300"
          class="flex flex-col justify-center items-center h-screen">
          <div>
            <div class="flex flex-col items-center justify-center gap-2">
              <span class="text-lg font-bold">Oops!</span>
              <span class="text-sm">Looks like the property you're looking for is not available</span>
            </div>

            <div class="flex flex-col items-center justify-center gap-2 mt-4">
              <NuxtLink :to="'/'" class="text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-3">Let me
                find another one!</NuxtLink>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const isFreeBreakfast = ref(0)
const isFreeCancelation = ref(0)
const checkin = ref('2024-06-25')
const checkout = ref('2024-06-26')
const number_of_rooms = ref(1)
const number_of_guests = ref(2)

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

const setStartDate = (value) => {
  if (!!value) {
    checkin.value = moment(value).format('YYYY-MM-DD')
    checkout.value = checkin.value > checkout.value ? moment(checkin.value).add(1, 'days').format('YYYY-MM-DD') : checkout.value
  }
}

const setEndDate = (value) => {
  if (!!value) {
    checkout.value = moment(value).format('YYYY-MM-DD')
    checkin.value = checkout.value < checkin.value ? moment(checkout.value).subtract(1, 'days').format('YYYY-MM-DD') : checkin.value

  }
}

watch(number_of_rooms, (current, previous) => {
  console.log('number_of_rooms', current, previous);
  getAvailabilities(propertyId.value, checkin.value, checkout.value, current, number_of_guests.value)
});

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
    getAvailabilities(propertyId.value, checkin.value, checkout.value, number_of_rooms.value, number_of_guests.value)
    useSeoMeta({
      title: property.value.meta.title,
      description: property.value.meta.description,
    })
  }

})

</script>