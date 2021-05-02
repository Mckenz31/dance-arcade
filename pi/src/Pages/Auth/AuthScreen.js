import React,{useState} from 'react'
import Image1 from '../../images/img1.jpg'
import Image2 from '../../images/img2.jpg'
import {AuthContainer} from './AuthStyles'
const Auth = () => {
    const [active,setActive]=useState('')
    const activeCss= active ? 'active' : '';
    console.log(activeCss,active)
    const ToggleCss=()=>{
        setActive(!active);
    }
    return (
        <AuthContainer>
            <div className={`container ${activeCss}`}>
                <div className="user siginBx">
                    <div className="imgBx">
                        <img src={Image1} alt="tape" style={{height:'100%'}}/>
                    </div>
                    <div className="formBx">
                        <form>
                            <h2>
                                Sign In
                            </h2>
                            <input type="text" name="" placeholder="Username" />
                            <input type="password" name="" placeholder="Password" />
                            <input type="submit" name="" value="login" />
                            <p className="signup">Don't have an account ? <span onClick={()=>ToggleCss()}>Sign Up</span></p>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">
                    
                    <div className="formBx">
                        <form>
                            <h2>
                                Create an account
                            </h2>
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

export default Auth
