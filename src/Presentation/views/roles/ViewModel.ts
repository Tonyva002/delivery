import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


export default function useRolesViewModel() {

  const{user} = useContext(UserContext);

  return {
    user

  }
   
}


