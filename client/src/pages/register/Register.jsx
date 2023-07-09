import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState("Something went wrong");

  function handleError(msg) {
    if (msg.email == null && msg.username == null) {
      switch (msg) {
        case "User validation failed: username: Path `username` is required., email: Path `email` is required.":
          setWarning("Please enter username and email address");
          break;
        case "User validation failed: email: Path `email` is required.":
          setWarning("Please enter email");
          break;
        case "User validation failed: username: Path `username` is required.":
          setWarning("Please enter username");
          break;
        default:
          break;
      }
    } else {
      if (msg.email == null) {
        setWarning("Use another username");
      } else {
        setWarning("Use another email");
      }
    }
  }

  async function complete() {
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      let msg;
      error.response.data.message == null
        ? (msg = error.response.data.keyPattern)
        : (msg = error.response.data.message);
      handleError(msg);
      setError(true);
    }
  }
  async function throwE() {
    setWarning("Please enter password");
    setError(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      password === "" ? throwE() : complete();
    } catch (error) {
      let msg;
      error.response.data.message == null
        ? (msg = error.response.data.keyValue)
        : (msg = error.response.data.message);
      handleError(msg);
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username ..."
          onChange={function (e) {
            setUsername(e.target.value);
          }}
        ></input>
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email ..."
          onChange={function (e) {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password ..."
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>{warning}</span>
      )}
    </div>
  );
}

export default Register;
