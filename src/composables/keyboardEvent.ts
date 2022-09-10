import { onMounted, onUnmounted, Ref, ref } from 'vue';

export function useKeyboard(
  key: string,
  callback: Function,
  condition: Ref<boolean> = ref(true),
) {
  function event(e: KeyboardEvent) {
    if (e.key !== key || !condition.value) return;

    callback();
  }

  onMounted(() => window.addEventListener('keyup', event));
  onUnmounted(() => window.removeEventListener('keyup', event));
}
