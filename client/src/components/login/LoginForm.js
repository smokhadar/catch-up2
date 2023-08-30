import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";

const LOGIN_USER = gql`
  mutation login($input: loginInput) {
    login(input: $input) {
      username
      id
      email
      createdAt
      token
    }
  }
`;

const loginInfos = {
  email: "",
  password: "",
};
export default function LoginForm({ setVisible }) {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginuser();
  }

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginuser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      console.log(`Login UI ${userData}`);
      // setSuccess("logged in Sucessfully");
      context.login(userData);

      navigate("/home");
    },
    onError({ graphQLErrors }) {
      console.log(graphQLErrors);
      setErrors(graphQLErrors);
    },
    variables: { input: values },
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(`UI + ${login} `);
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/catch_up.png" alt="" />
        <span>
          Let's Catch Up helps you connect and share with the people in your
          life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Container spacing={3} maxWidth="sm">
            <Stack spacing={2} paddingBottom={2}>
              <TextField label="Email" name="email" onChange={onChange} />
              <TextField label="Password" name="password" onChange={onChange} />
            </Stack>
            <div className="regi_btn_wrapper ">
              <Button
                className="blue_btn"
                variant="contained"
                onClick={onSubmit}
              >
                Login
              </Button>
            </div>
          </Container>
          {/* <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={onChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                  bottom
                />
                <button type="submit" onClick={onSubmit} className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik> */}
          {errors.map(function (error) {
            return <Alert severity="error">{error.message};</Alert>;
          })}
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
