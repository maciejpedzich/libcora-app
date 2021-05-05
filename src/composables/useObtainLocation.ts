import { computed } from 'vue';
import { Geolocation } from '@capacitor/core';

import UserModel from '@/types/UserModel';
import GeolocationPositionError from '@/types/GeolocationPositionError';
import displayToastUtil from '@/utils/displayToast';

export default function useObtainLocation(user: UserModel) {
  const locationObtained = computed(() => (user.location as string).length > 0);
  const locationBtnColour = computed(() =>
    locationObtained.value ? 'success' : 'primary'
  );
  const locationBtnText = computed(() =>
    locationObtained.value ? 'Location obtained' : 'Obtain location'
  );

  const obtainLocation = async () => {
    try {
      const { coords } = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coords;

      user.location = `${latitude},${longitude}`;
    } catch (error) {
      const message =
        (error as GeolocationPositionError).code === 1
          ? 'Please allow geolocation in order to create an account'
          : 'Unexpected error occurred. Please try again';

      displayToastUtil('danger', message);
    }
  };

  return {
    locationObtained,
    locationBtnColour,
    locationBtnText,
    obtainLocation
  };
}
