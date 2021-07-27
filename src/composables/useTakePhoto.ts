import { computed, ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/core';
import { getType } from 'mime';
import axios from 'axios';

import HTMLCropperElement from '@/types/HTMLCropperElement';
import UserModel from '@/types/UserModel';

import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';

export default function useTakePhoto(user: UserModel) {
  const cropper = ref<HTMLCropperElement | undefined>();
  const imageDataUrl = ref('');
  const imageUploaded = ref(false);
  let mimeType = '';

  const uploadImageBtnText = computed(() =>
    imageUploaded.value ? 'Image uploaded' : 'Crop and upload'
  );
  const uploadImageBtnColour = computed(() =>
    imageUploaded.value ? 'success' : 'primary'
  );

  const takePhoto = async () => {
    try {
      const { base64String, format } = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64
      });

      mimeType = getType(format) as string;
      imageDataUrl.value = `data:${mimeType};base64,${base64String}`;
    } catch (error) {
      displayToastUtil('danger', determineErrorMessage(error));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();

    cropper.value?.getCroppedCanvas().toBlob(async (blob) => {
      try {
        formData.append('image', blob as Blob);
        const { data } = await axios.post<{ url: string }>(
          '/upload-image',
          formData
        );
        user.avatarUrl = data.url;
        imageUploaded.value = true;

        displayToastUtil('success', 'Avatar uploaded successfully');
      } catch (error) {
        displayToastUtil('danger', determineErrorMessage(error));
      }
    });
  };

  return {
    cropper,
    imageDataUrl,
    imageUploaded,
    uploadImageBtnText,
    uploadImageBtnColour,
    takePhoto,
    uploadImage
  };
}
