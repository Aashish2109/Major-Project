import { useState } from "react";
import styles from "./login.module.scss";
import LoginImage from "../images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      const token=data.token;
      localStorage.setItem("token",token)
      console.log(token);
      if (response.ok && data.owner_role==="Admin") {
        alert("admin logged in successfully");
        navigate("/admin/adminfunctions");
      }
      else if(response.ok && data.owner_role==="Reader"){
          alert("reader logged in successfully")
          navigate("/reader/readerfunctions");
        }
      else if(response.status===404){
        alert("user does not exist");
        setEmail('')
        setPassword('')
      }
      else{
        alert("incorrect username or password")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  return (
    <>
      <div className={styles.setMain}>
        <div className={styles.mainContainer}>
          <h1>Welcome Back</h1>
          <h3>Please Login To Continue</h3>
          <div className={styles.loginContainer}>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Enter Email:</label>
              <input
                className={styles.inputAdmin}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your email"
              />
              <label htmlFor="password">Enter Password:</label>
              <input
                className={styles.inputAdmin}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your password"
              />
              <button className={styles.adminLogin}>Login</button>
            </form>
            <div className={styles.createaccount}>
              <Link to="/index" style={{ textDecoration: "none" }}>
                <button className={styles.createAccountButtons}>
                  Previous
                </button>
              </Link>

              <Link
                to="/signup/signup"
                style={{ textDecoration: "none" }}
              >
                <button className={styles.createAccountButtons}>
                  Create Account
                </button>
              </Link>
            </div>
          </div>
         </div>
        <div>
          <img src={LoginImage} alt="login" className={styles.imageclass} />
        </div>
      </div>
    </>
  );
};

export default Login;
