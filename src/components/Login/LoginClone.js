import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [validInput, setValidInput] = useState({
    email: true,
    password: true,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        input.email.includes("@") && input.password.trim().length > 6
      );
    }, 300);
    return () => {
      clearTimeout(identifier);
    };
  }, [input.email, input.password]);

  const onInputChangeHandler = (input, value) => {
    setInput((preState) => {
      return { ...preState, [input]: value };
    });
  };

  const onValidHandler = (input, value) => {
    setValidInput((preState) => {
      return { ...preState, [input]: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(input.email, input.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !validInput.email ? classes["invalid"] : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={input.email}
            onChange={(event) =>
              onInputChangeHandler("email", event.target.value)
            }
            onBlur={(event) =>
              onValidHandler("email", event.target.value.includes("@"))
            }
          />
        </div>
        <div
          className={`${classes.control}  ${
            !validInput.password ? classes["invalid"] : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={input.password}
            onChange={(event) =>
              onInputChangeHandler("password", event.target.value)
            }
            onBlur={(event) =>
              onValidHandler("password", event.target.value.trim().length > 6)
            }
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
