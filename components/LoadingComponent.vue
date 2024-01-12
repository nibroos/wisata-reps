<template>
  <div :class="'grid grid-cols-' + props.cols + ' gap-4'">
    <div :class="'animate-pulse bg-zinc-300 dark:bg-zinc-700 rounded-lg h-8 ' + 'w-' + randomWidth() + '/12'"
      v-for="i in props.rows" :key="i">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cols: 1,
  rows: 1
})

const randomWidth = () => {
  return Math.floor(Math.random() * 9) + 4
}

</script>
