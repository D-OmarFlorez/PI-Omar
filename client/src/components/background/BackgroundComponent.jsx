import styled from "styled-components"
import React from "react"

const VideoTrasero = styled.div`
position: fixed;
backgroundposition: center top;
backgroundsize: container;
backgroundrepeat: no repeat;
backgroundattachment: fixed;
 top: 0;
 width: 100%;
 left: 0;
 height: 100%;

z-index: -1;

`;
const BackgroundImagen = styled.img`

object-fit: center;
width: 100%;
height: 110%;
transform: ${props => props.rotate && "rotate(270deg)"};

`;


const LoginComponent = ({BackgroundImage, rotate})=>{
    return (
        <VideoTrasero> 
            <BackgroundImagen src = {BackgroundImage} alt="imagen de fondo" rotate={rotate}/>
        </VideoTrasero>
    )
}

export default LoginComponent