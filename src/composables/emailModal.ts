import { IEmail } from '@/state/emails';
import { ref } from 'vue';

export const email = ref<IEmail>();
export const visible = ref(false);

export function openEmailModal(emailToOpen: IEmail) {
  email.value = emailToOpen;
  visible.value = true;
}
