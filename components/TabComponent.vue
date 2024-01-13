<template>
  <!-- <div :class="'grid grid-cols' + props.configs.tabs.length + ' gap-4'"> -->
  <div :class="'flex flex-wrap justify-center sm:justify-between items-center text-sm w-full'">
    <div v-auto-animate v-for="(tab, i) in props.configs.tabs" :key="i" @click="toggleTab(i)"
      class="sm:grow flex flex-row justify-center items-center gap-2 px-8 py-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-800 border-t-2 border-transparent transition-all ease-in-out"
      :class="{
        'text-blue-500 border-t-2 sm:border-t-0 sm:border-b-2 border-t-blue-600 sm:border-b-blue-600': activeTab === i,
        'text-zinc-500': activeTab !== i,
      }, tab.class">
      <span :class="{
        'sm:hidden': props.configs.showSmScreen != 'icon'
      }" v-html="tab.icon"></span>
      <div :class="{
        'sm:hidden': props.configs.showSmScreen != 'name'
      }" class="font-bold">
        {{ tab.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  configs: {
    tabs: [{
      name: 'Tab name',
      icon: '',
      class: '',
    }],
    activeTab: 0,
    showSmScreen: '',
  }
})

const activeTab = ref(props.configs.activeTab)

const emit = defineEmits(['activeTab'])

const toggleTab = (index) => {
  emit('activeTab', index)
  activeTab.value = index
}

// const screenWidth = ref(window.innerWidth);

// const handleResize = () => {
//   screenWidth.value = window.innerWidth;
// };

// onMounted(() => {
//   window.addEventListener('resize', handleResize);

//   // Initial check on component mount
//   handleResize();
// });
</script>
