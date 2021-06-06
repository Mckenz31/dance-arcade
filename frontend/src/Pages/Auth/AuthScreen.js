// import React,{useState} from 'react'
import React, { useRef, useState, useCallback } from 'react';
import { GoogleIcon } from '../../images/icons';
import 'firebase/firestore';
import 'firebase/auth';
import Image1 from '../../images/img1.jpg';
import Image2 from '../../images/img2.jpg';
import { AuthContainer } from './AuthStyles';
import { message } from 'antd';
import ProfilePicker from '../../Components/profile-picker/ProfilePicker';
import {  useDispatch, useSelector } from 'react-redux';
import {
  signUp,
  signIn,
  setToast,
  signInWithGoogle
} from '../../actions/actions';

const Auth = () => {
  const [active, setActive] = useState('');
  const loading = useSelector((state) => state.user.authLoader);
  const activeCss = active ? 'active' : '';
  const dispatch = useDispatch();
  const bgColorCss = active ? 'signup' : 'signin';

  // signUp refs
  const SignUp_emailRef = useRef();
  const SignUp_passwordRef = useRef();
  const SignUp_confirmPasswordRef = useRef();
  // login refs
  const Login_emailRef = useRef();
  const Login_passwordRef = useRef();

  const HandleSubmitSignUp = (e) => {
    e.preventDefault();
    if (
      SignUp_passwordRef.current.value !==
      SignUp_confirmPasswordRef.current.value
    )
      return warning('Passwords do not match');
    dispatch(
      signUp(SignUp_emailRef.current.value, SignUp_passwordRef.current.value)
    );
  };

  const HandleSubmitSignIn = (e) => {
    e.preventDefault();
    dispatch(
      signIn(Login_emailRef.current.value, Login_passwordRef.current.value)
    );
  };

  const HandleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const ToggleCss = () => {
    setActive(!active);
  };

  const afterClose = useCallback(() => {
    dispatch(setToast('', false));
  }, [dispatch]);

  const warning = useCallback(
    (mess) => {
      message.warning(mess, 3).then(afterClose);
    },
    [afterClose]
  );

  // useEffect(() => {
  //     if(showMessage.isShowToast){
  //         warning(showMessage.message)
  //     }
  // },[showMessage,warning])

  return (
    <AuthContainer className={`${bgColorCss}`}>
      
      <div className={`container ${activeCss}`}>
        <div className="user siginBx">
          <div className="imgBx">
            <img src={Image1} alt="tape" style={{ height: '100%' }} />
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
              <input
                type="email"
                required
                ref={Login_emailRef}
                name=""
                placeholder="Enter Email Address"
              />
              <input
                type="password"
                required
                ref={Login_passwordRef}
                name=""
                placeholder="Enter Password"
              />
              <input type="submit" name="" value="login" />
              <div className="separator">OR</div>
              <button type="button" onClick={() => HandleGoogleSignIn()}>
                {' '}
                <GoogleIcon /> &nbsp; Continue with Google
              </button>
              <p className="reg">
                Don't have an account ?{' '}
                <span onClick={() => ToggleCss()}>Sign Up</span>
              </p>
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

              <ProfilePicker />
              <input
                type="text"
                required
                ref={SignUp_emailRef}
                placeholder="Enter Username"
              />
              <input
                type="email"
                required
                ref={SignUp_emailRef}
                placeholder="Enter Email Address"
              />
              <input
                type="password"
                required
                ref={SignUp_passwordRef}
                placeholder="Enter Password"
              />
              <input
                type="password"
                required
                ref={SignUp_confirmPasswordRef}
                placeholder="Enter Confirm Password"
              />
              <input type="submit" name="" disabled={loading} value="Sign Up" />
              <p className="reg">
                Already have an account ?{' '}
                <span onClick={() => ToggleCss()}>Sign in</span>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img src={Image2} alt="tape" style={{ height: '100%' }} />
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Auth;