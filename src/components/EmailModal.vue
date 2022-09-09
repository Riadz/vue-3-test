<template>
  <div class="email-modal" :class="{ visible }">
    <div class="email-modal__content">
      {{ email }}
    </div>

    <div class="email-modal__underlay" @click="visible = false"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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
