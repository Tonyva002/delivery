import { useState } from "react";
import { Category } from "../../../../../Domain/entities/Category";
import { getAllCategoryUseCase } from "../../../../../core/di/CategoryContainer";

export default function useCustomerCategoryListViewModel() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const response = await getAllCategoryUseCase.execute();
    setCategories(response);
  };
  return {
    categories,
    getCategories,
  };
}
