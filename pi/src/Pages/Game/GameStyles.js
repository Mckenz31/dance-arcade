import styled  from 'styled-components'

export const GameContainer=styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    .showcase{
    position: absolute;
    right: 0;
    width: 100%;
    min-height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111;
    transition: 0.5s;
    z-index: 2;
    .center{
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    }
    .showcase.active
    {
    right: 300px;
    }

    .showcase .video
    {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    }
    .center{
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
`;