import { CategoryRepositoryImp } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";


const {getAll} = new CategoryRepositoryImp();

export const GetAllCategoryUseCase = async () => {

        return await getAll();

}