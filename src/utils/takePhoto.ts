import * as ImagePicker from 'expo-image-picker';

type TakePhotoOptions = {
  onChange?: (field: string, value: string) => void;
  setFile?: (file: ImagePicker.ImagePickerAsset) => void;
};

export const takePhoto = async ({ onChange, setFile }: TakePhotoOptions) => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];

      if (onChange) onChange('image', image.uri);
      if (setFile) setFile(image);
    }
  } catch (error) {
    console.error('Error al tomar foto:', error);
  }
};
