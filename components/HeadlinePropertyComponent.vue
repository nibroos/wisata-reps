<template>
  <div class="flex flex-row sm:flex-col gap-4 items-center md:px-8 sm:px-0 py-8 !px-0">
    <div class="flex flex-col items-center justify-center w-4/12 sm:w-10/12">
      <img class="w-48 h-48 2xl:w-64 2xl:h-64 sm:w-full sm:h-auto object-cover rounded-full sm:rounded-lg"
        :src="props.property.data[propertyId].catalog.hero_image_url.lg" alt="">
    </div>
    <div class="flex flex-col w-8/12 sm:w-10/12 gap-2 grow 2xl:!text-xl xl:text-sm lg:text-sm font-medium">
      <h1 class="font-bold text-lg 2xl:text-2xl">{{ props.property.data[propertyId].name }}</h1>
      <span>{{ props.property.data[propertyId].catalog.category }}</span>
      <span>{{ props.property.data[propertyId].catalog.address_full }}</span>
      <div class="flex flex-row xs:flex-col items-center xs:items-start gap-2">
        <div class="flex flex-row items-center gap-2">
          <div class="flex items-center justify-center p-2 font-bold relative text-sm">
            <svg class="absolute inset-0 text-purple-700" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
              transform="rotate(-90)" width="36" height="36">
              <circle cx="50" cy="48" r="42" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="265.482"
                :style="{ strokeDashoffset: getDashOffset(props.property.data[propertyId].catalog.review_rating ?? 0) }">
              </circle>
            </svg>
            {{ props.property.data[propertyId].catalog.review_rating ?? 0 }}
          </div>
          <div>
            {{ rating(props.property.data[propertyId].catalog.star_rating, !!props.property.data[propertyId].catalog.review_count) }}
          </div>
          <div class="xs:hidden">·</div>
        </div>
        <div>{{ props.property.data[propertyId].catalog.review_count ?? 0 }} Reviews</div>
      </div>
      <p class="leading-6 2xl:leading-8 2xl:!text-lg">
        {{ props.property.data[propertyId].general_info.descriptions.rooms }}
        {{ props.property.data[propertyId].general_info.descriptions.headline }}</p>
    </div>
  </div>
</template>

<script setup>
import { rating } from '../../utils/textTransforms'

const props = defineProps({
  propertyId: '',
  property: {
    data: {},
    message: '',
    status: ''
  },
})

const getDashOffset = (percentage) => {
  const circumference = 265.482; // Circumference of a circle with a radius of 42
  return `${circumference - (percentage / 100) * circumference}px`;
};

</script>