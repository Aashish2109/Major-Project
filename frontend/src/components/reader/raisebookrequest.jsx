import React, { useState } from "react";
import styles from "./raisebookrequest.module.scss";
import RaiseRequestImage from "../images/raiserequest.jpg";
import { Link } from "react-router-dom";
const RaiseBookRequest = () => {
  const [bookID, setBookID] = useState();
  const [email, setEmailID] = useState();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      book_id: bookID,
      email: email,
    };
    try {
      const response = await fetch("/issue/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("issue request created successfully");
        setBookID("");
        setEmailID("");
      } else {
        alert(data.error);
      }
      console.log(data);
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      <div>
        <div className={styles.raiseRequestDiv}>
          <div>
            <img
              className={styles.raiseRequestImage}
              src={RaiseRequestImage}
              alt="raiesrequestimage"
            />
          </div>

          <div className={styles.container}>
            <h1>RAISE ISSUE REQUEST</h1>
            <div className={styles.formContainer}>
              <form onSubmit={HandleSubmit}>
                <label htmlFor="isbn">Book ID:</label>
                <input
                  className={styles.raiserequestinput}
                  value={bookID}
                  onChange={(e) => setBookID(e.target.value)}
                  type="text"
                  id="book_id"
                  placeholder="Enter Book ISBN Number"
                  required pattern="\S.*"
                  autoComplete="off"
                />
                <label htmlFor="email">Email:</label>
                <input
                  className={styles.raiserequestinput}
                  value={email}
                  onChange={(e) => setEmailID(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  required pattern="\S.*"
                  autoComplete="off"
                />
                <div className={styles.RaiseBookRequestbuttons}>
                  <button className={styles.raiserequestbutton}>Submit</button>
                  <Link to="/reader/readerfunctions" style={{textDecoration:"none"}}>
                    <button className={styles.raiserequestpreviousbutton}>
                      Previous
                    </button>
                  </Link> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaiseBookRequest;
