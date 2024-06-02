import React from "react";
import styles from "./removebook.module.scss";
import removebook from "../images/removebook.jpg";
import { Link } from "react-router-dom";
const RemoveBook = () => {
  const Handle = async () => {
    try {
      const response = await fetch("/remove-book", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        alert("Error");
        console.log(data.error);
      } else {
        alert("book removed successfully");
        console.log(data.message);
      }
    } catch (error) {
      alert("Error");
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div>
        <div className={styles.container}>
          <h1>REMOVE BOOK</h1>
          <div className={styles.removebookdiv}>
            <div>
              <img src={removebook} alt="removebook" />
            </div>
            <div className={styles.mainclass}>
              <form onSubmit={Handle}>
                <label for="isbn">ISBN:</label>
                <input
                className={styles.inputFieldRemove}
                  type="text"
                  id="isbn"
                  placeholder="Enter Book ISBN Number"
                  required pattern="\S.*"
                  autoComplete="off"
                />
                <br />
                <button type="submit" className={styles.removeBookButton}>
                  Remove Book
                </button>
                <Link to="/admin/adminfunctions" style={{textDecoration:"none"}}>
              <button className={styles.previousbutton}>Previous</button>
            </Link>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveBook;
