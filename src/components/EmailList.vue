<script lang="ts" setup>
import { computed, watch } from 'vue';
import { IEmail } from '@/state/emails';
import { openEmailModal, visible } from '@/composables/emailModal';
import { useKeyboard } from '@/composables/keyboardEvent';

const props = defineProps<{
  emails: IEmail[];
}>();

const emit = defineEmits(['update:selectedCount']);

// selected emails
const emailsSelected = computed(() =>
  props.emails.filter((email) => email.isSelected),
);
const emailsIsAllSelected = computed({
  get: () =>
    !!props.emails.length && props.emails.every((email) => email.isSelected),
  set: (val) => props.emails.forEach((email) => (email.isSelected = val)),
});
const emailsSelectedRead = computed(
  () =>
    !!emailsSelected.value.length &&
    emailsSelected.value.every((email) => email.isRead),
);
const emailsSelectedArchived = computed(
  () =>
    !!emailsSelected.value.length &&
    emailsSelected.value.every((email) => email.isArchived),
);

watch(emailsSelected, () =>
  emit('update:selectedCount', emailsSelected.value.length),
);

// actions
function markSelectedRead() {
  let bool = !emailsSelectedRead.value;
  emailsSelected.value.forEach((email) => (email.isRead = bool));
  resetSelected();
}
function markSelectedArchive() {
  let bool = !emailsSelectedArchived.value;
  emailsSelected.value.forEach((email) => (email.isArchived = bool));
  resetSelected();
}
function resetSelected() {
  props.emails.forEach((email) => (email.isSelected = false));
}

// keyboard events
let c = computed(() => !visible.value);
useKeyboard('r', markSelectedRead, c);
useKeyboard('a', markSelectedArchive, c);
</script>

<template>
  <div class="email-list">
    <div class="email-list__header">
      <input type="checkbox" v-model="emailsIsAllSelected" />

      <button class="btn btn--compact" @click="markSelectedRead">
        <template v-if="!emailsSelectedRead">Mark as read (r)</template>
        <template v-else>Mark as not read (r)</template>
      </button>
      <button class="btn btn--compact" @click="markSelectedArchive">
        <template v-if="!emailsSelectedArchived">Archive (a)</template>
        <template v-else>Unarchive (a)</template>
      </button>
    </div>
    <div class="email-list__items">
      <div
        v-for="email in emails"
        :key="email.id"
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
          @click="openEmailModal(email)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
</style>
