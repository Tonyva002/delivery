import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/ApiDelivery";
import { ImagePickerAsset } from "expo-image-picker";
import mime from 'mime';

export class AuthRepositoryImpl implements AuthRepository{
  


  async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/login', {
                email,
                password
            });
            return Promise.resolve(response.data);
        } catch (error){
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            
            return Promise.resolve(apiError);

        }
    }


   async register(user: User): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create', user);
            return Promise.resolve(response.data);
        } catch (error){
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            
            return Promise.resolve(apiError);

        }
    }

   async registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
            const formData = new FormData();
            //@ts-ignore
            formData.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri) // Obtenemos el tipo de archivo de la imagen (png, jpg, etc.).
            });
            formData.append('user', JSON.stringify(user));

            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
                '/users/createWithImage',
                formData
            );
            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = error as AxiosError;
            console.log('Error: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return Promise.resolve(apiError);
            
        }
    }

}
   
