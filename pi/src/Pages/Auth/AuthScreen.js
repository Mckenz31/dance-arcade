// import React,{useState} from 'react'
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image1 from '../../images/img1.jpg'
import Image2 from '../../images/img2.jpg'
import {AuthContainer} from './AuthStyles'

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
    const activeCss= active ? 'active' : '';
    console.log(activeCss,active)
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
                        <form>
                            <ul>
                                <li>S</li>
                                <li>I</li>
                                <li>G</li>
                                <li>N</li>
                                <li>I</li>
                                <li>N</li>
                            </ul>
                            <input type="text" name="" placeholder="Username" />
                            <input type="password" name="" placeholder="Password" />
                            <input type="submit" name="" value="login" />
                            <div class="separator">OR</div>
                            <button type="button" onClick={()=>signInWithGoogle()}>Google Auth</button>
                           
                            <p className="signup">Don't have an account ? <span onClick={()=>ToggleCss()}>Sign Up</span></p>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">
                    
                    <div className="formBx">
                        <form>
                            <ul>
                                <li>S</li>
                                <li>I</li>
                                <li>G</li>
                                <li>N</li>
                                <li>U</li>
                                <li>P</li>
                            </ul>
                            <input type="text" name="" placeholder="Username" />
                            <input type="email" name="" placeholder="Email Address" />
                            <input type="password" name="" placeholder="Password" />
                            <input type="password" name="" placeholder="Confirm Password" />
                            <input type="submit" name="" value="Sign Up" />
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
