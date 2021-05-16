import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../Firebase/firebase"
import firebase from 'firebase';
import {useHistory} from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
    const history = useHistory();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(auth.signInWithPopup(provider));
    history.push("/Home")
  }
  const DatabaseListener=()=>{
    db.collection("users").onSnapshot(snap=>{
        console.log(snap.docs.map(doc =>doc.data()))
    })
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    signInWithGoogle,
    updatePassword,
    DatabaseListener
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
