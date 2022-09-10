<script lang="ts" setup>
import MainSidebar from '@/components/MainSidebar.vue';
</script>

<template>
  <div class="container">
    <aside class="container__aside">
      <MainSidebar />
    </aside>
    <main class="container__main main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
@import '@/styles/main.scss';
</style>
