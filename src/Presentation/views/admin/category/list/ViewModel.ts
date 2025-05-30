import React, { useContext, useState } from 'react'
import { CategoryContext } from '../../../../context/CategoryContext';

export default function AdminCategoryListViewModel() {

        const [responseMessage, setResponseMessage] = useState('');
        const {categories, getCategories, remove} = useContext(CategoryContext);

        //Metodo para eliminar categoria
        const deleteCategory = async(id: string) => {
            const response = await remove(id);
            setResponseMessage(response.message);
           
        }
  return {
        categories,
        responseMessage,
        setResponseMessage,
        deleteCategory,
        getCategories
        

  }
}
