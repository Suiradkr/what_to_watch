import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    pw: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (props.isLoggedIn) {
      
      
      navigate("userhomepage/");
    }
  });
  return (
    <div class='form-container'>
    
      <h1>What2Watch</h1>
      <form onSubmit={handleSubmit}>
      <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} required></input>
      <input type="password" class="form-control" placeholder="Password" onChange={handleChange} name='pw' required></input>
        <button
          class="btn btn-primary"
          type="submit"
          onClick={() => props.login_user(state.email, state.pw)}
        >
          Login
        </button>
        <p>or</p>
        <a href="signup/">Sign Up</a>
      </form>
    </div>
    
  );
};
export default LoginPage;
