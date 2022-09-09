<template>
  <div class="container">
    <aside class="container__aside"></aside>
    <main class="container__main">
      <div>{{ emails }}</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getEmails } from './emails';

const emails = ref<any[]>(getEmails());
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

.container {
  display: flex;
  min-height: 100vh;

  &__aside {
    width: 25%;
    background-color: #373636;
    padding: 2rem 1.8rem;
  }
  &__main {
    width: 75%;
    padding: 3rem 5rem;
  }
}
</style>
