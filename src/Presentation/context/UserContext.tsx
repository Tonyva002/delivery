import React, { createContext, useEffect, useState } from "react";
import { User } from "../../Domain/entities/User";
import {
  getUserLocalUseCase,
  removeUserLocalUseCase,
  saveUserLocalUseCase,
} from "../../core/di/UserLocalContainer";

export const userInitialState: User = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  phone: "",
  image: "",
  password: "",
  confirmPassword: "",
  session_token: "",
  roles: [],
};

export interface UserContextProps {
  user: User;
  saveUserSesion: (user: User) => Promise<void>;
  getUserSesion: () => Promise<void>;
  removeUserSesion: () => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(userInitialState);

  useEffect(() => {
    getUserSesion();
  }, []);

  const getUserSesion = async () => {
    const user = await getUserLocalUseCase.execute();

    if (user) {
      setUser(user);
    } else {
      setUser(userInitialState);
    }
  };

  const saveUserSesion = async (user: User) => {
    await saveUserLocalUseCase.execute(user);
    setUser(user);
  };

  const removeUserSesion = async () => {
    await removeUserLocalUseCase.execute();
    setUser(userInitialState);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUserSesion,
        getUserSesion,
        removeUserSesion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
