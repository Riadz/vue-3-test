<script lang="ts" setup>
import MainSidebar from '@/components/MainSidebar.vue';
import EmailModal from './components/EmailModal.vue';
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

  <EmailModal />
</template>

<style lang="scss">
@import '@/styles/main.scss';
</style>
