import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
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

  const getUserSesion = useCallback(async () => {
    const user = await getUserLocalUseCase.execute();
    setUser(user ?? userInitialState);
  }, []);

  const saveUserSesion = useCallback(async (user: User) => {
    await saveUserLocalUseCase.execute(user);
    setUser(user);
  }, []);

  const removeUserSesion = useCallback(async () => {
    await removeUserLocalUseCase.execute();
    setUser(userInitialState);
  }, []);

  useEffect(() => {
    getUserSesion();
  }, [getUserSesion]);

  const value = useMemo(() => ({
    user,
    saveUserSesion,
    getUserSesion,
    removeUserSesion,
  }), [user, saveUserSesion, getUserSesion, removeUserSesion]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};