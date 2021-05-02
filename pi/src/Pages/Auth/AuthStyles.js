import styled,{keyframes} from 'styled-components'


const animate=keyframes`
  0%{
    color:#484848;
    text-shadow:none;
  }
  18%{
    color:#484848;
    text-shadow:none;
  }
  20%{
    color:#fff900;
    text-shadow:0 0 7px #fff900 , 0 0 20px #ff6c00;
  }
  30%{
    color:#484848;
    text-shadow:none;
  }
  35%{
    color:#fff900;
    text-shadow:0 0 7px #fff900 , 0 0 20px #ff6c00;
  }
  50%{
    color:#484848;
    text-shadow:none;
  }
  55%{
    color:#fff900;
    text-shadow:0 0 7px #fff900 , 0 0 20px #ff6c00;
  }
  70%{
    color:#484848;
    text-shadow:none;
  }
  
  85%{
    color:#fff900;
    text-shadow:0 0 7px #fff900 , 0 0 20px #ff6c00;
  }
  90%{
    color:#484848;
    text-shadow:none;
  }
  }
  100%{
    color:#484848;
    text-shadow:none;
  }
  
  
}
`;
export const AuthContainer=styled.section`
    position: relative;
    min-height: 100vh;
    background:#fee648;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:20px;
    .container.active{
        .signupBx{
            pointer-events: initial;
            .formBx {
                left:0;
            }
            .imgBx{
                left:0;
            }
        }
    } 
    .container{
        position: relative;
        width: 800px;
        height:500px;
        background:#fff;
        box-shadow: 0 15px 50px rgba(0,0,0,0.1);
        overflow: hidden;
        .signupBx{
            pointer-events: none;
            .formBx {
                left:100%;
            }
            .imgBx{
                left:-100%;
            }
        }
        .user{
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            .imgBx{
                position: relative;
                width: 50%;
                height: 100%;
                background:#ff0;
                transition:0.5s;
                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                
                }
            }
            .formBx{
                position: relative;
                width: 50%;
                height: 100%;
                background:#262626;
                display: flex;
                justify-content:center;
                align-items:center;
                padding: 40px;
                transition:0.5s;
                form{
                    ul{
                        position:relative;
                        margin:0;
                        padding:0;
                        display:flex;
                        flex-direction:row;
                        align-items: center;
                        justify-content:center;
                        margin-bottom:10px;
                        li{
                            list-style:none;
                            font-family:Poppin;
                            font-size:2em;
                            letter-spacing:15px;
                            color:#484848;
                            text-shadow:none;
                            animation: ${animate} 2s infinite linear;
                        }
                    }
                    h2{
                        font-size: 18px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing:2px;
                        text-align: center;
                        width:100%;
                        margin-bottom:10px;
                        color: #555;
                    }
                    input{
                        position: relative;
                        width:100%;
                        padding:10px;
                        background:#f5f5f5;
                        color: #333;
                        border: none;
                        outline: none;
                        box-shadow: none;
                        margin: 8px 0px;
                        font-size:14px;
                        letter-spacing:1px;
                        font-weight:300;
                    
                    }
                    input[type="submit"]{
    
                        background:#677eff;
                        color: #fff;
                        cursor: pointer;
                        font-size:14px;
                        font-weight: 500;
                        letter-spacing:1px;
                        transition: 0.5s;
                    }
                    
                    .signup{
                        position: relative;
                        margin-top: 20px;
                        font-size: 12px;
                        letter-spacing:1px;
                        color: #555;
                        text-transform: uppercase;
                        font-weight:300;
                        span{
                            font-weight:600;
                            text-decoration: none;
                            background:transparent;
                            border: none;
                            color: #677eff;
                            cursor: pointer;
                        }
                    }
                } 
            }
        }
    }
`
