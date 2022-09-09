<template>
  <div class="container">
    <aside class="container__aside aside">
      <button class="btn aside__btn" @click="() => (page = 'inbox')">
        Inbox ({{ emailsInboxCount }})
      </button>
      <button class="btn aside__btn" @click="() => (page = 'archive')">
        Archive ({{ emailsArchivedCount }})
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
          <input type="checkbox" v-model="emailsIsAllSelected" />

          <button class="btn btn--compact" @click="markSelectedRead">
            Mark as read (r)
          </button>
          <button class="btn btn--compact" @click="markSelectedArchive">
            Archive (a)
          </button>
        </div>
        <div class="email-list__items">
          <div
            v-for="email in emails"
            class="email-list__items__item"
            :class="{ 'email-list__items__item--read': email.isRead }"
          >
            <input
              v-model="email.isSelected"
              type="checkbox"
              class="email-list__items__item__check"
            />
            <div>{{ email.title }}</div>

            <button
              class="email-list__items__item__under-btn"
              @click="emailModalOpen(email)"
            ></button>
          </div>
        </div>
      </div>
    </main>

    <EmailModal v-model="emailModalValue" v-model:visible="emailModalVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Email, getEmails } from './emails';
import EmailModal from './components/EmailModal.vue';

const page = ref('inbox');

const emailsList = ref(getEmails());
//
const emails = computed(() => {
  if (page.value == 'inbox')
    return emailsList.value.filter((email) => !email.isArchived);

  if (page.value == 'archive')
    return emailsList.value.filter((email) => email.isArchived);

  return [];
});
//
const emailsInboxCount = computed(
  () => emailsList.value.filter((email) => !email.isArchived).length,
);
const emailsArchivedCount = computed(
  () => emailsList.value.filter((email) => email.isArchived).length,
);
//
const emailsSelected = computed(() =>
  emails.value.filter((email) => email.isSelected),
);
const emailsIsAllSelected = computed({
  get: () =>
    !!emails.value.length && emails.value.every((email) => email.isSelected),
  set: (val) => emails.value.forEach((email) => (email.isSelected = val)),
});

//
const emailModalVisible = ref(false);
const emailModalValue = ref<Email>();

function emailModalOpen(email: any) {
  emailModalVisible.value = true;
  emailModalValue.value = email;
}

//
function markSelectedRead() {
  emailsSelected.value.forEach((email) => (email.isRead = true));
  resetSelected();
}
function markSelectedArchive() {
  emailsSelected.value.forEach((email) => (email.isArchived = true));
  resetSelected();
}

function resetSelected() {
  emailsList.value.forEach((email) => (email.isSelected = false));
}

// keyboard events
onMounted(() =>
  document.addEventListener('keyup', (e) => {
    if (emailModalVisible.value) return;

    if (e.key == 'r') markSelectedRead();
    if (e.key == 'a') markSelectedArchive();
  }),
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

  &__header {
    margin-bottom: 2rem;

    display: flex;
    align-items: center;
    padding: 0 1.1rem;
    gap: 2rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__item {
      position: relative;
      display: flex;
      align-items: center;

      background-color: #f9f9f9;
      border: 1px solid #eeeeee;
      border-radius: 8px;
      padding: 1rem;

      &__check {
        z-index: 2;
        margin-right: 1.4rem;
      }
      &__under-btn {
        position: absolute;
        z-index: 1;
        inset: 0;

        cursor: pointer;
        background-color: transparent;
        border: none;
      }

      &--read {
        opacity: 0.5;
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

  &--compact {
    font-size: 0.9rem;
    padding: 0.5rem 1.2rem;
    border-color: #ececec;
  }
}
input[type='checkbox'] {
  cursor: pointer;
  width: 25px;
  height: 25px;
}
</style>
