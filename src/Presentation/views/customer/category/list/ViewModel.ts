import { useContext, useState } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";
import { Category } from "../../../../../Domain/entities/Category";
import { GetAllCategoryUseCase } from "../../../../../Domain/useCase/category/GetAllCategory";

export default function useCustomerCategoryListViewModel() {
          const [categories, setCategories] = useState<Category[]>([]);

          const getCategories = async () => {
            const response = await GetAllCategoryUseCase();
            setCategories(response);
          }
  return {
    categories,
    getCategories
  };
}
