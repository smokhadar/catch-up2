import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert, Box } from "@mui/material";
import { REGISTER_USER } from '../../utils/mutations';
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setVisible }) {
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
  );
}
