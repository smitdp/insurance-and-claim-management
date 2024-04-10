import React, { useContext } from 'react'
import LandingPage from './LandingPage'
import UserHomePage from './UserHomePage';
import { UserInformationContext } from '../context/UserInformationContext';
import getCurrentUserId from '../utils/getCurrentUserId';
import { useUserInfo } from '../utils/useUserInfo';

const AppLayout = () => {
    const token = localStorage.getItem("login");
    const userId = getCurrentUserId();
    const information = useUserInfo(userId);

  return (
    <div>
        {!token ? <LandingPage/>:<p>HKJHKLJHKJ</p>}
        {(token  && information.information.roleName === "Claimant") && <UserHomePage/>}
        {(token  && information.information.roleName === "Insurer") && <h1>Admin</h1>}
    </div>
  )
}

export default AppLayout;