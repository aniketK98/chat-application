import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../Features/authSlice";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    profilePic: "",
    phone: "",
    password: "",
  });
  const { name, profilePic, phone, password } = formData;

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

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
    const userData = { name, profilePic, phoneNumber: phone, password };
    console.log(userData);
    if (validatePhoneNumber(phone)) {
      dispatch(registerUser(userData));
    } else {
      toast.error("Please Enter Valid Phone Number");
    }
  };

  return (
    <div className="register">
      <div className="register_body">
        <div className="register_bodyRight">
          <h1>To use ChatApp, Please login</h1>
          <p>1. You need to Signin using your phone number.</p>
          <p>2. You can anytime logout from the Web.</p>
          <p>3. Login to continue using the Chat App</p>
        </div>
        <div className="register_bodyLeft">
          <h1>
            <LoginIcon fontSize="large" />
            Register
          </h1>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={name}
                  onChange={onChange}
                  className="input"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
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
                <input
                  type="text"
                  value={profilePic}
                  onChange={onChange}
                  className="input"
                  id="profilePic"
                  name="profilePic"
                  placeholder="Enter your profile Picture URL"
                />
              </div>
              <div className="form-group">
                <button>Register</button>
              </div>
            </form>
          </section>
          <button
            className="registerButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? <span>Login here</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
