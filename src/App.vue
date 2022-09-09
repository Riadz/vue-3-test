<template>
  <div class="container">
    <aside class="container__aside aside">
      <button class="btn aside__btn" @click="() => (page = 'inbox')">
        Inbox ()
      </button>
      <button class="btn aside__btn" @click="() => (page = 'archive')">
        Archive ()
      </button>

      <button class="btn aside__btn aside__btn--bottom">Logout</button>
    </aside>
    <main class="container__main main">
      <div>{{ page }}</div>
      <div>{{ emails }}</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getEmails } from './emails';

const page = ref('inbox');
const emails = ref(getEmails());
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
    padding: 2rem 5rem;
  }
}

.aside {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &__btn {
    text-align: start;

    &--bottom {
      margin-top: auto;
    }
  }
}

//
.btn {
  cursor: pointer;
  color: #000;
  padding: 0.6rem 1.9rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #c9c9c9;
  font-weight: 600;
  font-size: 1rem;
}
</style>
