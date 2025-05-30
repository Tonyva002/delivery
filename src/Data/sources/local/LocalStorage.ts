import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = () => {
  const save = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(`[LocalStorage:save] Error al guardar "${key}":`, error);
    }
  };

  const getItem = async (key: string): Promise<string | null> => {
        try {
          return await AsyncStorage.getItem(key);
        } catch (error) {
          console.error(`[LocalStorage:getItem] Error al leer "${key}":`, error);
          return null;
        }
      };

  const remove = async (key: string): Promise<void> => {
        try {
          await AsyncStorage.removeItem(key);
        } catch (error) {
          console.error(`[LocalStorage:remove] Error al eliminar "${key}":`, error);
        }
      };

  return {
    save,
    getItem,
    remove,
  };
};
