import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../Firebase/firebase';
import firebase from 'firebase';
import { User_Details } from '../../constants/actionTypes';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.userInfo);
  const isNewUser = useSelector((state) => state.user.isNewUser);

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
  // useEffect(() => {
  //   if (isNewUser) {
  //     const data = {
  //       userName: 'hello world',
  //       avatar: 'cat'
  //     };
  //     db.collection(user.email)
  //       .doc('User Details')
  //       .update(data)
  //       .then(function () {
  //         console.log('Document successfully written!');
  //       });
  //   }
  // }, [isNewUser, user]);

  const value = {
    currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
