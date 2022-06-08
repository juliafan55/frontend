import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput/registerInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader"
import { useDispatch } from "react-redux";
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

export default function RegisterForm({setVisible}) {
    const userInfo = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      bYear: new Date().getFullYear(),
      bMonth: new Date().getMonth() + 1,
      bDay: new Date().getDate(),
    };

    const [user, setUser] = useState(userInfo);
    const [dateError, setDateError] = useState("");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
    } = user;
    
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    
    const yearTemp = new Date().getFullYear();
    const years = Array.from(new Array(108), (val, index) => yearTemp - index);
    const months = Array.from(new Array(12), (val, index) => 1 + index);
    const getDays = () => {
      return new Date(bYear, bMonth, 0).getDate();
    };
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

    const registerValidation = Yup.object({
      first_name: Yup.string()
        .required("What's your First name ?")
        .min(2, "Fisrt name must be between 2 and 16 characters.")
        .max(16, "Fisrt name must be between 2 and 16 characters.")
        .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
      last_name: Yup.string()
        .required("What's your Last name ?")
        .min(2, "Last name must be between 2 and 16 characters.")
        .max(16, "Last name must be between 2 and 16 characters.")
        .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
      email: Yup.string()
        .required(
          "You'll need this when you log in and if you ever need to reset your password."
        )
        .email("Enter a valid email address."),
      password: Yup.string()
        .required(
          "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
        )
        .min(6, "Password must be atleast 6 characters.")
        .max(36, "Password can't be more than 36 characters"),
    });

    const registerSubmit = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,
            {
                first_name,
                last_name,
                email,
                password,
                bYear,
                bMonth,
                bDay,
                })
            setError("")
            setSuccess(data.message)
            const { message, ...rest } = data;
            setTimeout(() => {
                dispatch({ type: "LOGIN", payload: rest });
                Cookies.set("user", JSON.stringify(rest))
                navigate("/")
            }, 2000);
        } catch (error) {
            setLoading(false);
            setSuccess("");
            setError(error.response.data.message)
        }
    }
    
  return (
    <div className="blur">
      <div className="register">
        <div className="register-header">
          <i className="exit_icon" onClick={()=>setVisible(false)}></i>
          <span>Sign Up</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
              if (current_date - picked_date < atleast14) {
                setDateError("It looks like you entered the wrong info.")
              } else if (current_date - picked_date > noMoreThan70) {
                setDateError("It looks like you entered the wrong info.")
              } else {
                setDateError("")
                registerSubmit()
            }
          }}
              >
      {(formik) => (
            <Form className="register-form">
              <div className="register-line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="register-line">
                <RegisterInput
                  type="text"
                  placeholder="Email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="register-line">
                <RegisterInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="register-column">
                <div className="register-line-header">
                  Date of birth
                </div>
                <DateOfBirthSelect
                    bDay={bDay}
                    bMonth={bMonth}
                    bYear={bYear}
                    days={days}
                    months={months}
                    years={years}
                    handleRegisterChange={handleRegisterChange}
                    dateError={dateError}
                />
              </div>
              <div className="register-btn-wrapper">
                <button className="pink-btn open-signup">Sign Up</button>
              </div>
                <DotLoader color="#f582ae" loading={loading} size={30} />
               {error && <div className="error-text">{error}</div> }
               {success && <div className="success-text">{success}</div> }
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
