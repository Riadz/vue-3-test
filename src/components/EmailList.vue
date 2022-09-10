<script lang="ts" setup>
import { computed, watch } from 'vue';
import { IEmail } from '@/state/emails';
import { openEmailModal } from '@/composables/emailModal';

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
watch(emailsSelected, () =>
  emit('update:selectedCount', emailsSelected.value.length),
);

// actions
function markSelectedRead() {
  emailsSelected.value.forEach((email) => (email.isRead = true));
  resetSelected();
}
function markSelectedArchive() {
  emailsSelected.value.forEach((email) => (email.isArchived = true));
  resetSelected();
}
function resetSelected() {
  props.emails.forEach((email) => (email.isSelected = false));
}
</script>

<template>
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
