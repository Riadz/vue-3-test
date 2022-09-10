<script lang="ts" setup>
import { computed, ref } from 'vue';
import EmailList from '@/components/EmailList.vue';
import { emails as allEmails } from '@/state/emails';

const emails = computed(() =>
  allEmails.value.filter((email) => email.isArchived),
);
const selectedCount = ref(0);
</script>

<template>
  <div>
    <div class="main__title">Archive</div>
    <div class="main__selected">Emails Selected ({{ selectedCount }})</div>

    <EmailList :emails="emails" v-model:selectedCount="selectedCount" />
  </div>
</template>
