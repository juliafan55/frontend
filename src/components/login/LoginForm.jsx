import React, {useState} from 'react';
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from '../../components/inputs/loginInput/loginInput';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"

const loginInfo = {
    email: "",
    password: "",
}
export default function LoginForm({setVisible}) {
    const [login, setLogin] = useState(loginInfo);
    const { email, password } = login
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }
    
    const loginValidation = Yup.object({
        email: Yup.string().required("Email address is required").email("Must be a valid email"),
        password: Yup.string().required("Password is required")
    })

    const loginSubmit = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            {
              email,
              password,
            }
          );
          dispatch({ type: "LOGIN", payload: data });
          Cookies.set("user", JSON.stringify(data));
          navigate("/");
        } catch (error) {
          setLoading(false);
          setError(error.response.data.message);
        }
      };

    return (
    <div className="login-wrap">
        <div className="login-1">
            <span className="digital-hub-logo">digital hub.</span>
            <span>Digital Hub collects your memories.</span>
        </div>
        <div className="login-2">
            <div className="login-2-wrap">
                <Formik
                    enableReinitialize
                    initialValues={{ email, password }}
                        validationSchema={loginValidation}
                        onSubmit={() => {
                            loginSubmit()
                        }}
                >
                    {(formik) => (
                        <Form>
                            <LoginInput
                                name="email"
                                placeholder="Email address"
                                type="text"
                                onChange={handleLoginChange}
                            />
                            <LoginInput
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleLoginChange}
                                bottom
                            />
                            <button
                                type="submit"
                                className="pink-btn">Log In</button>
                        </Form>
                        )
                    }
                </Formik>
                    <Link to="/forgot" className="forgot-password"> Forgot your password?</Link>
                    
                    {error && <div className="error-text">{error}</div>}

                <div className="sign-splitter"></div>
                <button className="pink-btn open-signup" onClick={() => setVisible(true)}>Create Account</button>
            </div>
        </div>
    </div>
    )
}
