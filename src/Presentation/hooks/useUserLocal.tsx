import { useEffect, useState } from "react";
import { GetUserLocalUseCase } from "../../Domain/useCase/userLocal/GetUserLocal";
import { User } from '../../Domain/entities/User';

export const useUserLocal = () => {

        const [user, setuser] = useState<User| null>(null);

  useEffect(() => {
    getUserSession();
  }, []);

  const getUserSession = async () => {
    const user = await GetUserLocalUseCase();
    setuser(user);
    
  };

  return {
        user, 
        getUserSession
  };
};
