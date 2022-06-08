import "./login.css"
import LoginForm from "../../components/login/LoginForm"
import RegisterForm from "../../components/login/RegisterForm"
import { useState } from "react"
import DotLoader from "react-spinners/DotLoader"
import { useDispatch } from "react-redux";
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [visible, setVisible] = useState(false)

    return (
        <div className="login">
            <div className="login-wrapper">
                <LoginForm setVisible={setVisible}/>
                {visible && <RegisterForm setVisible={setVisible}/>}
            </div>
        </div>
    )
}
