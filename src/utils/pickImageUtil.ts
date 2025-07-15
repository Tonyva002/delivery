
import * as ImagePicker from 'expo-image-picker';

type PickImageOptions = {
  onChange?: (field: string, value: string) => void;
  setFile?: (file: ImagePicker.ImagePickerAsset) => void;
  setFile1?: (file: ImagePicker.ImagePickerAsset) => void;
  setFile2?: (file: ImagePicker.ImagePickerAsset) => void;
  setFile3?: (file: ImagePicker.ImagePickerAsset) => void;
  numberImage?: number;
};

export const pickImageUtil = async ({
  onChange,
  setFile,
  setFile1,
  setFile2,
  setFile3,
  numberImage,
}: PickImageOptions) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];

      // Establece un campo genérico 
      if (onChange) onChange('image', image.uri);
      if (setFile) setFile(image);

      // Implementación para múltiples imágenes
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
    console.error('Error al seleccionar imagen: ', error);
  }
};

