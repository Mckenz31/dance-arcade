import React,{useContext,createContext,useState,useEffect} from 'react'
import { Auth,DB } from '../Firebase/firebase';

const AuthContext = createContext();

export function useAuth (){
    return useContext(AuthContext);
}


export function AuthProvider ({children}) {
    const [currentUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(true);

    const SignUp=(email,password)=>{
        return Auth.createUserWithEmailAndPassword(email,password)
    }
    const Login=(email,password)=>{
        return Auth.signInWithEmailAndPassword(email,password)
    }
    const LogOut=()=>{
        return Auth.signOut()
    }
    const DatabaseListener=()=>{
        DB.collection("Player1").onSnapshot(snap=>{
            console.log(snap.docs.map(doc =>doc.data()))
        })
    }
    function resetPassword(email) {
        return Auth.sendPasswordResetEmail(email)
      }
    
      function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
      function updatePassword(password) {
        return currentUser.updatePassword(password)
      }
    
    useEffect(()=>{
        const unsubscribe = Auth.onAuthStateChanged(user=>{
            setLoading(false)
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    
    const value ={
        SignUp,
        Login,
        LogOut,
        currentUser,
        resetPassword,
        updateEmail,
        updatePassword,
        DatabaseListener
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

