<template>
  <div class="flex flex-col w-full">
    <label
      class="flex justify-between items-center border border-zinc-300 dark:border-zinc-700 rounded-full py-2 px-3 bg-zinc-50 dark:bg-zinc-800 w-full">
      <div class="mr-2 w-max">
        <svg class="stroke-current fill-current w-6 h-6 text-zinc-400" xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1024 1024" fill="currentColor" stroke="currentColor" stroke-width="0">
          <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
          <path fill="currentColor"
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1c-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
      </div>

      <div class="grow">
        <input :id="labelFor" :value="searchValue" @input="$emit('update:searchValue', $event.target.value)"
          :placeholder="placeholder" type="text"
          class="w-full border-none focus:outline-none bg-zinc-50 dark:bg-zinc-800 dark:text-white text-sm">
      </div>

      <button type="submit"
        class="w-max hover:bg-blue-50 dark:hover:bg-blue-600 dark:hover:text-white font-bold cursor-pointer text-blue-500 px-4 py-2 rounded-full text-sm transition-all ease-in-out">
        Find</button>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  labelTitle: '',
  searchValue: '',
  placeholderText: Array,
  labelFor: '',
})

const placeholder = ref(['Ketik hotel, villa, atau properti impian anda untuk mulai pencarian..'])
let placeHolderArray = []
placeHolderArray = props.placeholderText

const initRandomPlaceholder = () => {
  placeholder.value = placeHolderArray[Math.floor(Math.random() * placeHolderArray.length)];
}

let autoRandomPlaceholderTimer = ''

function autoRefreshReport() {
  return autoRandomPlaceholderTimer = setInterval(initRandomPlaceholder, 2000);
}

onMounted(() => {
  autoRefreshReport()
})

onBeforeUnmount(() => {
  return clearInterval(autoRandomPlaceholderTimer)
})

defineEmits(['update:searchValue'])
</script>
