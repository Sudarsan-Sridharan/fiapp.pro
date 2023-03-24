import Logo from '../../assets/fiappLogo.webp'
import React from "react";

interface IProps {
    width?: number
    height?: number
}

const FiappLogo: React.FC<IProps> = (props) => {
    return (
        <img src={Logo} width={props.width ?? 24} height={props.height ?? 24}/>
    )
}

export default FiappLogo