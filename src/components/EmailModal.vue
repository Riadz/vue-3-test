<template>
  <div class="email-modal" :class="{ visible }">
    <div class="email-modal__content">
      <button class="email-modal__content__close" @click="visible = false">
        Close (Esc)
      </button>

      <div class="email-modal__content__header">
        <button class="btn btn--compact" @click="markRead">
          Mark as read (r)
        </button>
        <button class="btn btn--compact" @click="markArchive">
          Archive (a)
        </button>
      </div>

      <div v-if="email">
        <h2>{{ email.title }}</h2>
        <p>{{ email.content }}</p>
      </div>
    </div>

    <div class="email-modal__underlay" @click="visible = false"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { Email } from '../emails';

const props = defineProps<{
  modelValue?: Email;
  visible: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'update:visible']);

const email = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
});

//
function markRead() {
  if (!email.value) return;
  email.value.isRead = true;
}
function markArchive() {
  if (!email.value) return;
  email.value.isArchived = true;
}

//
onMounted(() =>
  document.addEventListener('keyup', (e) => {
    if (!visible.value) return;

    if (e.key == 'r') markRead();
    if (e.key == 'a') markArchive();

    if (e.key == 'Escape') visible.value = false;
  }),
);
</script>

<style lang="scss">
.email-modal {
  position: fixed;
  z-index: 20;
  inset: 0;
  background-color: rgba(#000, 0);

  pointer-events: none;

  &__content {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: 0;

    width: 40vw;
    max-width: 100%;

    background-color: #fff;

    transform: translateX(100%);
    transition: transform 0.3s ease;

    //
    padding: 1rem;

    &__close {
      background-color: transparent;
      border: none;
      padding: 0;
      font-size: 1rem;
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;

      margin-bottom: 1.5rem;
    }
    &__header {
      display: flex;
      gap: 1rem;
    }
  }

  &__underlay {
    position: absolute;
    z-index: 1;
    inset: 0;

    background-color: rgba(#000, 0);
    transition: background-color 0.5s ease;
  }

  //
  &.visible {
    pointer-events: all;
  }
  &.visible &__content {
    transform: translateX(0);
  }
  &.visible &__underlay {
    background-color: rgba(#000, 0.5);
  }
}
</style>
