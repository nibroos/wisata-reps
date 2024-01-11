<template>
  <div>

    <NuxtLoadingIndicator />

    <NuxtLayout :name="layout">
      <ContainerComponent>
        <NuxtPage></NuxtPage>
      </ContainerComponent>
    </NuxtLayout>
  </div>
</template>

<script setup>

const runtimeConfig = useRuntimeConfig();

const layout = ref('guest')

</script>
