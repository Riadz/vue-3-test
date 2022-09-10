<script lang="ts" setup>
import { emailsInboxCount, emailsArchivedCount } from '@/composables/emails';
</script>

<template>
  <div class="sidebar">
    <RouterLink to="/inbox" class="btn sidebar__btn">
      Inbox ({{ emailsInboxCount }})
    </RouterLink>
    <RouterLink to="/archive" class="btn sidebar__btn">
      Archive ({{ emailsArchivedCount }})
    </RouterLink>

    <button class="btn sidebar__btn sidebar__btn--bottom">Logout</button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  padding: 2rem 1.8rem;
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
</style>
