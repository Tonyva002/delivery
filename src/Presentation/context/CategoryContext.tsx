import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../../Domain/entities/Category";
import { createContext, useEffect, useState } from "react";
import { createCategoryUseCase, deleteCategoryUseCase, getAllCategoryUseCase, updateCategoryUseCase, updateCategoryWithImageUseCase } from "../../core/di/CategoryContainer";
import { Response } from "../../Domain/models/Response";

export interface CategoryContextProps {
  categories: Category[];
  getCategories(): Promise<void>;
  create(
    category: Category,
    file: ImagePickerAsset,
  ): Promise<Response>;
  updateWithImage(
    category: Category,
    file: ImagePickerAsset,
  ): Promise<Response>;
  updateWithoutImage(category: Category): Promise<Response>;
  remove(id: string): Promise<Response>;
}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  //Metodo para obtener categorias
  const getCategories = async (): Promise<void> => {
    const response = await getAllCategoryUseCase.execute();
    setCategories(response);
  };

  // Metodo para crear categoria
  const create = async (
    category: Category,
    file: ImagePickerAsset,
  ): Promise<Response> => {
    const response = await createCategoryUseCase.execute(category, file);
    getCategories();
    return response;
  };

  //Metodo para actualizar con imagen
  const updateWithImage = async (
    category: Category,
    file: ImagePickerAsset,
  ): Promise<Response> => {
    const response = await updateCategoryWithImageUseCase.execute(category, file);
    getCategories();
    return response;
  };

  //Metodo para actualizar sin imagen
  const updateWithoutImage = async (
    category: Category,
  ): Promise<Response> => {
    const response = await updateCategoryUseCase.execute(category);
    getCategories();
    return response;
  };

  //Metodo para eliminar categoria
  const remove = async (id: string): Promise<Response> => {
    const response = await deleteCategoryUseCase.execute(id);
    getCategories();
    return response;
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        create,
        updateWithImage,
        updateWithoutImage,
        remove,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
