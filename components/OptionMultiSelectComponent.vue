<template>
  <div :class="class" class="w-max">
    <label :class="{
      '!text-blue-600 dark:!text-blue-500 !border-blue-600 !bg-blue-50 dark:!bg-zinc-800 dark:!border-blue-600': selected === 1,
      'text-zinc-500 border-zinc-200 bg-zinc-50 dark:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800': selected === 0,
    }"
      class="flex items-center justify-center gap-2 rounded-full w-full px-3 py-2 border cursor-pointer transition ease-in-out">
      <slot name="icon"></slot>
      <input v-model="selected" type="checkbox" class="hidden peer" :name="labelFor" :id="labelFor" :true-value="1"
        :false-value="0" @change="$emit('update:selected', $event.target._modelValue)" :value="optionValue">
      <span class="whitespace-nowrap">{{ label }}</span>

    </label>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:selected'])
const props = defineProps({
  label: '',
  optionValue: '',
  labelFor: '',
  class: 'w-full',
})

const selected = ref(0)

onMounted(() => {
  selected.value = props.optionValue
})
</script>
