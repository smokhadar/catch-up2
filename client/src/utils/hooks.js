import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  //pass, email
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    console.log(`Event: ${event.target.name} ${event.target.value}`);
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
