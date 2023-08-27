import { Formik, Form } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";

export default function RegisterForm() {
  const userInfos = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);

  const { firstName, lastName, email, password, bYear, bMonth, bDay, gender } =
    user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => bYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  const numberofDays = Array.from
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
        </div>
        <Formik>
          {(formik) => (
            <Form className="register_form">
              <div className="regi_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onchange={handleRegisterChange}
                ></RegisterInput>

                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onchange={handleRegisterChange}
                ></RegisterInput>
              </div>
              <div className="regi_line">
                <RegisterInput
                  type="text"
                  placeholder="Email"
                  name="email"
                  onchange={handleRegisterChange}
                ></RegisterInput>
              </div>
              <div className="regi_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onchange={handleRegisterChange}
                ></RegisterInput>
              </div>

              <div className="regi_column">
                <div className="regi_line_header">
                  Date of Birth <i className="info_icon"></i>
                </div>
                <div className="regi_grid">
                  <select name="bDay" onchange={handleRegisterChange}>
                    <option>15</option>
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onchange={handleRegisterChange}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onchange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="regi_column">
                <div className="regi_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="regi_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onchange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onchange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onchange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>

              <div className="regi_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may recieve SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="regi_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
