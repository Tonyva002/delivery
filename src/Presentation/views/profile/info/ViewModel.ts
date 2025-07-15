import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export default function useProfileInfoViewModel() {
  const { user, removeUserSesion } = useContext(UserContext);

  return {
    removeUserSesion,
    user,
  };
}
