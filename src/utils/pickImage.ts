import * as ImagePicker from 'expo-image-picker';

type PickImageOptions = {
  onChange?: (field: string, value: string) => void;
  setFile?: (file: ImagePicker.ImagePickerAsset) => void;
};

export const pickImage = async ({ onChange, setFile }: PickImageOptions) => {
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

      if (onChange) onChange('image', image.uri);
      if (setFile) setFile(image);
    }
  } catch (error) {
    console.error('Error al seleccionar imagen: ', error);
  }
};
