<template>
  <div>

    <NuxtLayout :name="'guest'">
      <ContainerComponent>

        <div class="flex flex-col justify-center items-center h-screen">
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
      </ContainerComponent>
    </NuxtLayout>
  </div>
</template>

<script setup>
defineProps([
  'error'
])
</script>