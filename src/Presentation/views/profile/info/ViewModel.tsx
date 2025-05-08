import React from 'react'
import { RomoveUserLocalUseCase } from '../../../../Domain/useCase/userLocal/RemoveUserLocal'

 const ProfileInfoViewModel = () => {

        const removeSession = async () => {
                await RomoveUserLocalUseCase()
        }


  return {
        removeSession

  }
}

export default ProfileInfoViewModel;
