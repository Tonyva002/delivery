import axios from "axios";
import { LocalStorage } from "../local/LocalStorage";
import { User } from "../../../Domain/entities/User";

const ApiDelivery = axios.create({
   baseURL: "http://10.0.0.4:3000/api",
 // baseURL: "http://10.0.0.4:4000/api/v1",
  headers: {
    "content-type": "application/json",
  },
});

const ApiDeliveryForImage = axios.create({
  baseURL: "http://10.0.0.4:3000/api",
 // baseURL: "http://10.0.0.4:4000/api/v1",
  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
  },
});

const authInterceptor = async (config: any) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data);
    config.headers.Authorization = user.session_token;
  }
  return config;
};

ApiDelivery.interceptors.request.use(authInterceptor);
ApiDeliveryForImage.interceptors.request.use(authInterceptor);

export { ApiDelivery, ApiDeliveryForImage };
