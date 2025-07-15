import * as ImagePicker from 'expo-image-picker';

type TakePhotoOptions = {
  onChange?: (field: string, value: string) => void;
  setFile?: (file: ImagePicker.ImagePickerAsset) => void;
  setFile1?: (file: ImagePicker.ImagePickerAsset) => void;
  setFile2?: (file: ImagePicker.ImagePickerAsset) => void;
  setFile3?: (file: ImagePicker.ImagePickerAsset) => void;
  numberImage?: number;
};

export const takePhotoUtil = async ({
  onChange,
  setFile,
  setFile1,
  setFile2,
  setFile3,
  numberImage,
}: TakePhotoOptions) => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para usar la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];

      // Campo genérico
      if (onChange) onChange('image', image.uri);
      if (setFile) setFile(image);

      // Mapa dinámico
      const imageField = `image${numberImage}`;
      const setFileMap: Record<number, ((file: ImagePicker.ImagePickerAsset) => void) | undefined> = {
        1: setFile1,
        2: setFile2,
        3: setFile3,
      };

      if (onChange && numberImage) onChange(imageField, image.uri);
      if (numberImage && setFileMap[numberImage]) {
        setFileMap[numberImage]?.(image);
      }
    }
  } catch (error) {
    console.error('Error al tomar foto: ', error);
  }
};
