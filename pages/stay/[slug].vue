<template>
  <div class="flex flex-col gap-4">
    <div>{{ route.params.slug }}</div>
    <div>A{{ properties }}</div>
    <div>B{{ property }}</div>
    <div>C{{ availabilities }}</div>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue';


const route = useRoute()
const {
  isLoadingProperties, properties, getProperties,
  isLoadingProperty, property, getProperty,
  isLoadingAvailabilities, availabilities, getAvailabilities
} = useProperties()

onMounted(() => {
  getProperties(route.params.slug)
})

watchEffect(() => {
  if (properties.value.data.length > 0) {
    getProperty(properties.value.data[0].id)
    getAvailabilities(properties.value.data[0].id)
  }
})
</script>