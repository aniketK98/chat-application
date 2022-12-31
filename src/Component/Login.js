import React, { useEffect, useState } from "react";
import "./Login.css";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, loginUser } from "../Features/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const { phone, password } = formData;

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(input_str);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    
    const userData = { phoneNumber: phone, password };
    if (validatePhoneNumber(phone)) {
      dispatch(loginUser(userData));
    }
    else{
      console.log("invalid Phone")
    }
  };

  return (
    <div className="login">
      <div className="login_body">
        <div className="login_bodyRight">
          <h1>To use ChatApp on your Please login</h1>
          <p>1. You need to Signin using your phone number.</p>
          <p>2. You can anytime logout from the Web.</p>
          <p>3. Login to continue using the Chat App</p>
        </div>
        <div className="login_bodyLeft">
          <h1>
            <LoginIcon fontSize="large" />
            Login
          </h1>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="tel"
                  value={phone}
                  onChange={onChange}
                  className="input"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={onChange}
                  className="input"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <button>LogIn</button>
              </div>
            </form>
          </section>
          <button
            className="registerButton"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have account? <span>Register here</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
