import { toastController } from '@ionic/vue';

export default async function displayToastUtil(color: string, message: string) {
  const toast = await toastController.create({
    message,
    color,
    position: 'bottom',
    duration: 3000
  });

  await toast.present();
}
