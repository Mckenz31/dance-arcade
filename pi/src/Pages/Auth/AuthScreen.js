// import React,{useState} from 'react'
import React, { useEffect, useRef, useState } from 'react';
import {GoogleIcon} from '../../images/icons';
import 'firebase/firestore';
import 'firebase/auth';
import Image1 from '../../images/img1.jpg'
import Image2 from '../../images/img2.jpg'
import {AuthContainer} from './AuthStyles'
import {useAuth} from '../../Components/contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import {Alert} from 'react-bootstrap'

// const firestore = firebase.firestore();

const Auth = () => {
    
    const [active,setActive]=useState('')
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const history = useHistory();

    const activeCss= active ? 'active' : '';
    const bgColorCss = active ? 'signup' : 'signin'
    const { signup , currentUser,login,LogOut,signInWithGoogle }=useAuth();

    // signUp refs
    const SignUp_emailRef=useRef(); 
    const SignUp_passwordRef = useRef();
    const SignUp_confirmPasswordRef = useRef();
    // login refs
    const Login_emailRef=useRef(); 
    const Login_passwordRef = useRef();

    // useEffect(()=>{
    //     DatabaseListener()
    // },[])
    console.log(currentUser,"users authscreen")

    async function HandleSubmitSignUp(e) {
        e.preventDefault()
    
        if (SignUp_passwordRef.current.value !== SignUp_confirmPasswordRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          await signup(SignUp_emailRef.current.value, SignUp_passwordRef.current.value)
          history.push("/Home")
        } catch {
          setError("Failed to create an account")
        }
    
        setLoading(false)
      }

      async function HandleSubmitSignIn(e) {
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true)
          await login(Login_emailRef.current.value, Login_passwordRef.current.value)
          history.push("/Home")
        } catch {
          setError("Failed to log in")
        }
    
        setLoading(false)
      }

    const ToggleCss=()=>{
        setError("")
        setActive(!active);
    }
    
    const HandleGoogleSignIn=()=>{
        signInWithGoogle();
    }
    return (
        <AuthContainer className={`${bgColorCss}`}>
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
                            {error && <Alert variant="danger">{error}</Alert>}
                            <input type="email" ref={Login_emailRef} name="" placeholder="Username" />
                            <input type="password" ref={Login_passwordRef} name="" placeholder="Password" />
                            <input type="submit" name="" value="login" />
                            <div class="separator">OR</div>
                            <button type="button" onClick={()=>HandleGoogleSignIn()}> <GoogleIcon/> &nbsp;  Continue with Google</button>
                            <p className="reg">Don't have an account ? <span onClick={()=>ToggleCss()}>Sign Up</span></p>
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
                            {error && <Alert variant="danger">{error}</Alert>}
                            <input type="email" ref={SignUp_emailRef}  placeholder="Email Address" />
                            <input type="password" ref={SignUp_passwordRef}  placeholder="Password" />
                            <input type="password" ref={SignUp_confirmPasswordRef} placeholder="Confirm Password" />
                            <input type="submit" name="" disabled={loading} value="login" />
                            <p className="reg">Already have an account ? <span onClick={()=>ToggleCss()}>Sign in</span></p>
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


export default Auth
