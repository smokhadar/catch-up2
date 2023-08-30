import { Formik, Form } from "formik";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert, Box } from "@mui/material";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import RegisterInput from "../inputs/registerInput";

const REGISTER_USER = gql`
  # mutation SignUp($email: String!, $password: String!, $username: String!) {
  #   signUp(email: $email, password: $password, username: $username) {
  #     id
  #     username
  #     email
  #     password
  #   }
  # }

  mutation Mutation($input: signupInput) {
    signup(input: $input) {
      username
      id
      email
      createdAt
      token
    }
  }
`;

export default function RegisterForm({ setVisible }) {
  //const dispatch = useDispatch();
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registeruserCallback() {
    console.log("register user callback");
    signup();
  }

  const { onChange, onSubmit, values } = useForm(registeruserCallback, {
    username: "",
    email: "",
    password: "",
  });

  const [signup, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { signup: userData } }) {
      console.log("UI: ", userData);
      setSuccess("Register Sucessfully");
      context.login(userData);
      navigate("/home");
    },
    onError({ graphQLErrors }) {
      console.log(graphQLErrors);
      setErrors(graphQLErrors);
    },
    variables: { input: values },
  });

  const [success, setSuccess] = useState("");
  const [load, setLoading] = useState("");
  return (
    <div className="blur">
      <div className="register">
        <Container spacing={3} maxWidth="sm">
          <div className="register_header">
            <span>Sign Up</span>
          </div>
          <Stack spacing={2} paddingBottom={2}>
            <TextField label="Username" name="username" onChange={onChange} />
            <TextField label="Email" name="email" onChange={onChange} />
            <TextField label="Password" name="password" onChange={onChange} />
          </Stack>
          {errors.map(function (error) {
            return <Alert severity="error">{error.message};</Alert>;
          })}
          <div className="regi_btn_wrapper ">
            <Stack spacing={3} direction="row">
              <Button
                className="blue_btn signup"
                variant="contained"
                onClick={onSubmit}
              >
                Register
              </Button>
              <Button
                className="blue_btn signup"
                variant="contained"
                onClick={() => {
                  setVisible(false);
                }}
              >
                Close
              </Button>
            </Stack>
          </div>

          {success && <div className="success_text">{success}</div>}
        </Container>
      </div>
    </div>

    // <div className="blur">
    //   <div className="register">
    //     <div className="register_header">
    //       <i className="exit_icon"></i>
    //       <span>Sign Up</span>
    //     </div>
    //     <Formik>
    //       {(formik) => (
    //         <Form className="register_form">
    //           <div className="regi_line">
    //             <RegisterInput
    //               type="text"
    //               placeholder="First name"
    //               name="firstName"
    //               onchange={onChange}
    //             ></RegisterInput>

    //             <RegisterInput
    //               type="text"
    //               placeholder="Last name"
    //               name="lastName"
    //               onchange={onChange}
    //             ></RegisterInput>
    //           </div>
    //           <div className="regi_line">
    //             <RegisterInput
    //               type="text"
    //               placeholder="Email"
    //               name="email"
    //               onchange={onChange}
    //             ></RegisterInput>
    //           </div>
    //           <div className="regi_line">
    //             <RegisterInput
    //               type="password"
    //               placeholder="New password"
    //               name="password"
    //               onchange={onChange}
    //             ></RegisterInput>
    //           </div>

    //           <div className="regi_infos">
    //             By clicking Sign Up, you agree to our{" "}
    //             <span>Terms, Data policy &nbsp;</span>
    //             and <span>Cookie Policy.</span> You may recieve SMS
    //             notifications from us and can opt out at any time.
    //           </div>
    //           <div className="regi_btn_wrapper">
    //             <button className="blue_btn open_signup">Sign Up</button>
    //           </div>
    //         </Form>
    //       )}
    //     </Formik>
    //   </div>
    // </div>
  );
}
