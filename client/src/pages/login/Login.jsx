import { useContext, useRef, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error,setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username ..."
          ref={userRef}
        ></input>
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password ..."
          ref={passwordRef}
        ></input>
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
        {error && (
        <span style={{ color: "white", marginTop: "10px", textAlign:"center" }}>Wrong Credentials</span>
      )}
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}

export default Login;
