import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../Firebase/firebase';
import { Spin } from 'antd';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const loading = useSelector((state) => state.user.loading);
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    window.addEventListener('load', () => {
      // console.log(navigator.onLine,"online or offline"); // this should be uploaded to db
    });
  }, []);

  const value = {
    currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Spin className="m-auto" />}
    </AuthContext.Provider>
  );
}