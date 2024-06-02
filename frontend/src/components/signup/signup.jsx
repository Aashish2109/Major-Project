import React, { useState } from "react";
import styles from "./signup.module.scss";
import SignUpImage from "../images/signup.jpg";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [libraryName, setLibraryName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminRole, setAdminRole] = useState("Admin");

  const Handler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/createaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          library_name: libraryName,
          owner_name: adminName,
          password: password,
          owner_email: adminEmail,
          owner_phone: adminPhone,
          owner_role: adminRole,
        }),
      });

      if (response.status === 404) {
        alert("Library not found");
      } else if (response.status === 409) {
        alert("Admin already exists in the library");
      } else if (response.ok) {
        alert("Admin Created Successfully");
      } else {
        const data = await response.json();
        console.log(data);
        alert("An error occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={styles.adminCreate}>
        <div>
          <img className={styles.SignUpImage} src={SignUpImage} alt="signupimage" />
        </div>

        <div className={styles.adminContainer}>
          <h1>Create A New Account</h1>
          <form onSubmit={Handler}>
            <label htmlFor="libraryName">Library Name:</label>
            <input
              className={styles.inputField}
              type="text"
              id="libraryName"
              placeholder="Enter Library Name"
              required
              pattern="\S+.*"
              autoComplete="off"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerName">Admin Name:</label>
            <input
              className={styles.inputField}
              type="text"
              id="OwnerName"
              placeholder="Enter Admin Name"
              required
              pattern="\S+.*"
              autoComplete="off"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerPassword">Admin Password:</label>
            <input
              className={styles.inputField}
              type="password"
              id="OwnerPassword"
              placeholder="Enter Admin Password"
              required
              pattern="\S+.*"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerEmail">Admin Email:</label>
            <input
              className={styles.inputField}
              type="email"
              id="OwnerEmail"
              placeholder="Enter Admin Email"
              required
              pattern="\S+.*"
              autoComplete="off"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerPhone">Admin Phone:</label>
            <input
              className={styles.inputField}
              type="text"
              id="OwnerPhone"
              placeholder="Enter 10 Digit Contact Number"
              required
              pattern="[1-9]{1}[0-9]{9}"
              autoComplete="off"
              value={adminPhone}
              onChange={(e) => setAdminPhone(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerRole">Role:</label>
            <select
              id="OwnerRole"
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)} style={{width:"95%"}}
            >
              <option>Admin</option>
              <option>Reader</option>
            </select>
            <br />
            <button className={styles.buttonClass} type="submit">
              Create Account
            </button>
          </form>

          <Link to="/login/login" style={{ textDecoration: "none" }}>
            <button className={styles.buttonClass}>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
