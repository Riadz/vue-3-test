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
      <div class="main__title">{{ page }}</div>
      <div class="main__selected">
        Emails Selected ({{ emailsSelected.length }})
      </div>

      <div class="email-list">
        <div class="email-list__header">
          <div><input type="checkbox" /></div>
        </div>
        <div class="email-list__items">
          <div v-for="email in emails" class="email-list__items__item">
            <input type="checkbox" v-model="email.isSelected" />
            <div>{{ email.title }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getEmails } from './emails';

const page = ref('inbox');

const emails = ref(getEmails());
const emailsSelected = computed(() =>
  emails.value.filter((email) => email.isSelected),
);
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

.main {
  &__title {
    text-transform: capitalize;
    font-size: 1.6rem;
  }
  &__selected {
    font-weight: 700;
    font-size: 2rem;
    margin-top: 0.4rem;
  }
}

.email-list {
  margin-top: 2rem;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__item {
      display: flex;
      align-items: center;

      background-color: #f9f9f9;
      border: 1px solid #eeeeee;
      border-radius: 8px;
      padding: 1rem;

      > input {
        margin-right: 1.4rem;
      }
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
  font-family: 'Segoe UI', sans-serif;
}
input[type='checkbox'] {
  cursor: pointer;
  width: 25px;
  height: 25px;
}
</style>
