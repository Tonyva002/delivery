import React, { createContext, useEffect, useState } from "react";
import { User } from "../../Domain/entities/User";
import { GetUserLocalUseCase } from "../../Domain/useCase/userLocal/GetUserLocal";
import { SaveUserLocalUseCase } from "../../Domain/useCase/userLocal/SaveUserLocal";
import { RemoveUserLocalUseCase } from "../../Domain/useCase/userLocal/RemoveUserLocal";

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
    const user = await GetUserLocalUseCase();
    setUser(user);
  };

  const saveUserSesion = async (user: User) => {
    await SaveUserLocalUseCase(user);
    setUser(user);
  };

  const removeUserSesion = async () => {
    await RemoveUserLocalUseCase();
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

