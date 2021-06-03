import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState()
  // const [loading, setLoading] = useState(true)
  const loading = useSelector((state) => state.user.loading);
  // const currentUser = useSelector(state => state.user.userInfo)

  // const history = useHistory();

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password)
  // }

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password)
  // }

  // function logout() {
  //   return auth.signOut()
  // }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email)
  // }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email)
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password)
  // }
  // const signInWithGoogle = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   auth.signInWithPopup(provider);
  //   history.push("/Home")
  // }
  // const DatabaseListener=()=>{
  //   db.collection("users").onSnapshot(snap=>{
  //       console.log(snap.docs.map(doc =>doc.data()))
  //   })
  // }

  useEffect(() => {
    window.addEventListener('load', () => {
      // console.log(navigator.onLine,"online or offline"); // this should be uploaded to db
    });
  }, []);

  const value = {
    // currentUser,
    // login,
    // signup,
    // logout,
    // resetPassword,
    // updateEmail,
    // signInWithGoogle,
    // updatePassword,
    // DatabaseListener
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
