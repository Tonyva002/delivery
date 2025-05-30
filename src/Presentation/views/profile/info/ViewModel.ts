import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext';


 const ProfileInfoViewModel = () => {

      const { user, removeUserSesion } = useContext(UserContext);

        


  return {
        removeUserSesion, 
        user

  }
}

export default ProfileInfoViewModel;
