import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../../Domain/entities/Category";
import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { createContext, useEffect, useState } from "react";
import { GetAllCategoryUseCase } from "../../Domain/useCase/category/GetAllCategory";
import { CreateCategoryUseCase } from "../../Domain/useCase/category/CreateCategory";
import { UpdateCategoryWithoutImageUseCase } from "../../Domain/useCase/category/updateCategoryWithoutImage";
import { UpdateCategoryWithImageUseCase } from "../../Domain/useCase/category/uudateCategoryWithImage";
import { DeleteCategoryUseCase } from "../../Domain/useCase/category/DeleteCategory";

export interface CategoryContextProps {
  categories: Category[];
  getCategories(): Promise<void>;
  create(category: Category, file: ImagePickerAsset): Promise<ResponseApiDelivery>;
  updateWithImage(category: Category, file: ImagePickerAsset): Promise<ResponseApiDelivery>;
  updateWithoutImage(category: Category): Promise<ResponseApiDelivery>;
  remove(id: string): Promise<ResponseApiDelivery>;
}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {

  const [categories, setCategories] = useState<Category[]>([]);
  
   useEffect(() => {
    if(categories.length === 0) {
      getCategories();
    }
  }, []);

  //Metodo para obtener categorias
  const getCategories = async (): Promise<void> => {
    const response = await GetAllCategoryUseCase();
    setCategories(response);
  };

  // Metodo para crear categoria
    const create = async (category: Category, file: ImagePickerAsset): Promise<ResponseApiDelivery> => {
      const response = await CreateCategoryUseCase(category, file);
      getCategories();
      return response;
    };

    //Metodo para actualizar con imagen
    const updateWithImage = async (category: Category, file: ImagePickerAsset): Promise<ResponseApiDelivery> => {
      const response = await UpdateCategoryWithImageUseCase(category, file);
      getCategories();
      return response;
    }
     
     //Metodo para actualizar sin imagen
     const updateWithoutImage = async (category: Category): Promise<ResponseApiDelivery> => {
      const response = await UpdateCategoryWithoutImageUseCase(category);
      getCategories();
      return response;
    }
      
      //Metodo para eliminar categoria
      const remove = async (id: string): Promise<ResponseApiDelivery> => {
      const response = await DeleteCategoryUseCase(id);
      getCategories();
      return response;
    }

    return (
        <CategoryContext.Provider value={{
                categories,
                getCategories,
                create,
                updateWithImage,
                updateWithoutImage,
                remove

        }}>
                {children}
        </CategoryContext.Provider>
)
}
