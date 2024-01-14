<template>
  <!-- <div :class="class">
    <label
      class="flex items-center gap-2 rounded-full px-3 py-2 border transition ease-in-out text-zinc-500 border-zinc-200 dark:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">
      <slot name="icon"></slot>

      <span class="w-max">{{ label }}:
      </span>
      <input v-model="inputValue" type="text" class="peer w-1/2" :name="labelFor" :id="labelFor"
        @change="$emit('update:inputValue', $event.target._modelValue)">

    </label>
  </div> -->
  <div :class="class">
    <label
      class="flex items-center gap-2 rounded-full px-3 py-2 border transition ease-in-out text-zinc-500 border-zinc-200 dark:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">
      <slot name="icon"></slot>
      <span class="w-max">{{ label }}:</span>
      <input v-model="inputValue" type="text" class="peer flex-shrink-0 w-6 px-2 py-1 rounded" :name="labelFor"
        :id="labelFor" @change="emitInputValue">
    </label>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:inputValue'])
const props = defineProps({
  label: '',
  initialValue: '',
  labelFor: '',
  class: 'w-full',
})

const inputValue = ref(0)

const emitInputValue = (value) => {
  console.log(value.target.value);
  emit('update:inputValue', value.target.value)
}

onMounted(() => {
  inputValue.value = props.initialValue
})
</script>
