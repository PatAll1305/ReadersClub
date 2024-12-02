import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };
  const handleDemoSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p className="error-message" key={message}>{message}</p>)}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Email
          <input
            className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="login-label">
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button className="login-button" type="submit">Log In</button>
      </form>
      <div className="demo-login-label">
        Log in as Demo user
      </div>
      <button className='demo-login-input' style={{ cursor: 'pointer' }} type='submit'
        onClick={(e) => {
          handleDemoSubmit(e);
        }}> Demo Login</button>
      <div className="signup-redirect">
        <p>{"Don't have an account?"} <span onClick={() => navigate('/signup')} className="signup-link">Sign up</span></p>
      </div>
    </div>
  );
}

export default LoginFormPage;
