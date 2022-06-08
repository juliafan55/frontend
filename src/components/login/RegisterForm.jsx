import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput/registerInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import * as Yup from "yup";

export default function RegisterForm() {
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
    

  return (
    <div className="blur">
      <div className="register">
        <div className="register-header">
          <i className="exit_icon"></i>
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
              setDateError(
                "It looks like the info entered is wrong."
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "It looks like the info entered is wrong."
              );
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
                />
              </div>
              <div className="register-btn-wrapper">
                <button className="pink-btn open-signup">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
