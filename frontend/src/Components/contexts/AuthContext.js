import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../Firebase/firebase';

// const AuthContext = React.createContext();

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser
  };

  return (
    <div value={value}>
      {!loading && children}
    </div>
  );
}
