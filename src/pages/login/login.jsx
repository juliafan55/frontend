import "./login.css"
import LoginForm from "../../components/login/LoginForm"
import RegisterForm from "../../components/login/RegisterForm"

export default function Login() {
        
    return (
        <div className="login">
            <div className="login-wrapper">
                <LoginForm />
                <RegisterForm />
            </div>
        </div>
    )
}
