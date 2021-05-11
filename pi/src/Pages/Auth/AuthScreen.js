// import React,{useState} from 'react'
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image1 from '../../images/img1.jpg'
import Image2 from '../../images/img2.jpg'
import {AuthContainer} from './AuthStyles'
import {useAuth} from '../../Components/context/AuthProvider'
import {useHistory} from 'react-router-dom'
import {Alert} from 'react-bootstrap'

firebase.initializeApp({
  apiKey: "AIzaSyC-dDKOX68D9Eo-5qz0GPkAwFDLbpEwcN4",
  authDomain: "dance-arcade-development.firebaseapp.com",
  projectId: "dance-arcade-development",
  storageBucket: "dance-arcade-development.appspot.com",
  messagingSenderId: "198019606179",
  appId: "1:198019606179:web:ffc4930e040ca92da78116"

});

const auth = firebase.auth();
// const firestore = firebase.firestore();

const Auth = () => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    const [active,setActive]=useState('')
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const History = useHistory();

    const activeCss= active ? 'active' : '';
    const { SignUp , currentUser,Login,LogOut,DatabaseListener }=useAuth();

    // signUp refs
    const SignUp_emailRef=useRef(); 
    const SignUp_passwordRef = useRef();
    const SignUp_confirmPasswordRef = useRef();
    // login refs
    const Login_emailRef=useRef(); 
    const Login_passwordRef = useRef();
    console.log(currentUser,"current user");

    useEffect(()=>{
        DatabaseListener()
    },[])

    const HandleSubmitSignUp =async (e)=>{
        e.preventDefault();
        if(SignUp_passwordRef.current.value !== SignUp_confirmPasswordRef.current.value){
            return setError('Passwords do not match');
        }
        try{
            setError('')
            setLoading(true)
           await SignUp(SignUp_emailRef.current.value, SignUp_passwordRef.current.value)
        }catch{
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    const HandleSubmitSignIn=async(e)=>{
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
           await Login(Login_emailRef.current.value, Login_passwordRef.current.value)
           History.push("/Home")
        }catch{
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    const ToggleCss=()=>{
        setActive(!active);
    }
    const [user] = useAuthState(auth);

    return (
        <AuthContainer>
            <div className={`container ${activeCss}`}>
                <div className="user siginBx">
                    <div className="imgBx">
                        <img src={Image1} alt="tape" style={{height:'100%'}}/>
                    </div>
                    <div className="formBx">
                        <form onSubmit={HandleSubmitSignIn}>
                            <ul>
                                <li>S</li>
                                <li>I</li>
                                <li>G</li>
                                <li>N</li>
                                <li>I</li>
                                <li>N</li>
                            </ul>
                            <input type="email" ref={Login_emailRef} name="" placeholder="Username" />
                            <input type="password" ref={Login_passwordRef} name="" placeholder="Password" />
                            <input type="submit" name="" value="login" />
                            <div class="separator">OR</div>
                            <button type="button" onClick={()=>signInWithGoogle()}>Google Auth</button>
                          
                            <p className="signup">Don't have an account ? <span onClick={()=>ToggleCss()}>Sign Up</span></p>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">
                    
                    <div className="formBx">
                        <form onSubmit={HandleSubmitSignUp}> 
                            <ul>
                                <li>S</li>
                                <li>I</li>
                                <li>G</li>
                                <li>N</li>
                                <li>U</li>
                                <li>P</li>
                            </ul>
                            {currentUser && currentUser.email}
                            {error && <Alert  variant='danger'>
                                {error}
                            </Alert>}
                            <input type="email" ref={SignUp_emailRef}  placeholder="Email Address" />
                            <input type="password" ref={SignUp_passwordRef}  placeholder="Password" />
                            <input type="password" ref={SignUp_confirmPasswordRef} placeholder="Confirm Password" />
                            <button type="submit" disabled={loading} >Sign Up</button>
                            <p className="signup">Already have an account ? <span onClick={()=>ToggleCss()}>Sign in</span></p>
                        </form>
                    </div>
                    <div className="imgBx">
                        <img src={Image2} alt="tape" style={{height:'100%'}}/>
                    </div>
                </div>
            </div>
        </AuthContainer>
    )
}


function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    // return (
    //     <button onClick={signInWithGoogle}>Sign in with Google</button>
    // )
  
  }

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default Auth
