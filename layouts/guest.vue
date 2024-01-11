<template>
  <div class="fixed top-0 left-0 w-full z-40 bg-white dark:bg-zinc-800 dark:text-gray-100">

    <div
      class="flex flex-row justify-between w-full px-12 py-5 border-b border-gray-200 dark:border-black items-center xs:p-6">
      <div class="flex flex-row text-gray-400 justify-between w-full">

        <NuxtLink
          class="font-semibold hover:bg-emerald-100 hover:text-emerald-600 dark:hover:text-white dark:hover:bg-zinc-700 text-center py-2 px-4 rounded-lg transition ease-in-out duration-200"
          to="/">
          <h1>{{ runtimeConfig.public.APP_NAME }}</h1>
        </NuxtLink>
        <div v-auto-animate class="flex flex-row gap-1 items-center text-gray-900 dark:text-gray-50">
          <div :class="{ 'dark:bg-zinc-900': isSettingsOpen }"
            class="flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 cursor-pointer transition ease-in-out duration-200"
            @click="openSettingsDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256">
              <rect x="0" y="0" width="128" height="128" fill="none" stroke="none" />
              <path fill="currentColor"
                d="M232 128a104 104 0 1 0-174.2 76.7l1.3 1.2a104 104 0 0 0 137.8 0l1.3-1.2A103.7 103.7 0 0 0 232 128Zm-192 0a88 88 0 1 1 153.8 58.4a79.2 79.2 0 0 0-36.1-28.7a48 48 0 1 0-59.4 0a79.2 79.2 0 0 0-36.1 28.7A87.6 87.6 0 0 1 40 128Zm56-8a32 32 0 1 1 32 32a32.1 32.1 0 0 1-32-32Zm-21.9 77.5a64 64 0 0 1 107.8 0a87.8 87.8 0 0 1-107.8 0Z" />
            </svg>
          </div>
          <div v-if="isSettingsOpen"
            class="block absolute right-0 top-12 py-4 px-4 bg-white dark:bg-zinc-800 dark:border-zinc-700 divide-y divide-gray-100 rounded-lg border border-gray-300 w-56 transition ease-in-out duration-200">
            <div class="flex flex-col">
              <div class="relative flex w-full items-center py-2">
                <div class="flex-grow border-t border-gray-300 dark:border-zinc-700"></div>
              </div>
              <div class="font-bold my-2">Pengaturan</div>
              <div @click="toggleTheme"
                class="mt-2 cursor-pointer flex flex-row rounded-lg p-1.5 text-gray-900 dark:text-gray-50 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-900 dark:hover:bg-black text-sm transition ease-in-out duration-200">
                <div
                  class="flex flex-row w-1/2 mr-1 justify-center items-center py-1 px-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-900 rounded-lg transition ease-in-out duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                    <rect x="0" y="0" width="256" height="256" fill="none" stroke="none" />
                    <path fill="currentColor"
                      d="M128 56a72 72 0 1 0 72 72a72.1 72.1 0 0 0-72-72Zm0 120a48 48 0 1 1 48-48a48 48 0 0 1-48 48ZM116 28V12a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0Zm74.2 37.8a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 17l-11.3 11.3a12 12 0 0 1-8.5 3.5a12.2 12.2 0 0 1-8.5-3.5ZM256 128a12 12 0 0 1-12 12h-16a12 12 0 0 1 0-24h16a12 12 0 0 1 12 12Zm-37.5 73.5a12 12 0 0 1 0 17a11.6 11.6 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5l-11.3-11.3a12 12 0 0 1 17-17ZM140 228v16a12 12 0 0 1-24 0v-16a12 12 0 0 1 24 0Zm-74.2-37.8a12 12 0 0 1 0 17l-11.3 11.3A12 12 0 0 1 46 222a11.6 11.6 0 0 1-8.5-3.5a12 12 0 0 1 0-17l11.3-11.3a12 12 0 0 1 17 0ZM28 140H12a12 12 0 0 1 0-24h16a12 12 0 0 1 0 24Zm9.5-85.5a12 12 0 0 1 17-17l11.3 11.3a12 12 0 0 1 0 17a12.2 12.2 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5Z" />
                  </svg>
                  <span class="ml-2">
                    Light
                  </span>
                </div>
                <div
                  class="flex flex-row w-1/2 ml-1 justify-center items-center py-1 px-3 rounded-lg bg-gray-200 dark:bg-zinc-800 transition ease-in-out duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                    <rect x="0" y="0" width="256" height="256" fill="none" stroke="none" />
                    <path fill="currentColor"
                      d="M228.1 149.1a12 12 0 0 0-11.6-8.5a11.4 11.4 0 0 0-3.3.6a80 80 0 0 1-98.3-98.4a13.5 13.5 0 0 0 .4-2.8a12 12 0 0 0-7.5-11.8a12.6 12.6 0 0 0-7.9-.4A104 104 0 1 0 228.2 156a12.5 12.5 0 0 0-.1-6.9ZM128 208A80 80 0 0 1 88.1 58.6a104.2 104.2 0 0 0 109.3 109.3A80.4 80.4 0 0 1 128 208Z" />
                  </svg>
                  <span class="ml-2">
                    Dark
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col bg-gray-100 dark:bg-zinc-900 mt-24 px-12 py-8 w-full md:px-0 xs:px-0 ms:p-0 min-h-screen"
    @click="toggleCloseDropdown">
    <slot />
  </div>
</template>

<script setup>

const runtimeConfig = useRuntimeConfig();
const { toggleTheme } = useTheme()

useHead({
  script: [{
    children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.setAttribute("data-theme", "dark")
        document.documentElement.style.backgroundColor = "rgb(24 24 27)";
    } else {
      document.documentElement.removeAttribute("data-theme")
        document.documentElement.style.backgroundColor = "rgb(243 244 246)";
    }`}],
  htmlAttrs: {
    lang: 'en',
  }
})

const isSettingsOpen = ref(false);
const openSettingsDropdown = () => {
  isSettingsOpen.value = !isSettingsOpen.value
}

const toggleCloseDropdown = () => {
  isSettingsOpen.value = false
};

</script>