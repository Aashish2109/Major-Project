import React, { useState } from "react";
import styles from "./createlibrary.module.scss";
import CreateLibraryImage from '../images/createlibraryimage.jpg'
import { Link } from "react-router-dom";
const CreateLibrary = () => {
  const [libraryName, setLibraryName] = useState("");
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/createlibrary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          library_name: libraryName,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 409) {
        alert("library already exists");
      } else {
        alert("library created successfully");
        setLibraryName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.wholeDiv}>
        <div>
          <img className={styles.createlibraryImage} src={CreateLibraryImage} alt="createlibrary" />
        </div>
        <div className={styles.mainContainer}>
          <h1>CREATE A NEW LIBRARY</h1>
          <div className={styles.formContainer}>
            <form onSubmit={HandleSubmit}>
              <label htmlFor="libraryName">Library Name:</label>
              <input
               className={styles.InputField}
                type="text"
                id="libraryName"
                value={libraryName}
                onChange={(e) => setLibraryName(e.target.value)}
                required pattern="\S+.*"
                autoComplete="off"
                placeholder="ex(Mylib1 or mylib 1)"
              />
              <br />
              <div className={styles.buttons}>
              <button className={styles.buttonClass} type="submit">
                Create Library
              </button>
              </div>
             
            </form>
            <div >
              
            </div>
            <Link to='/index' style={{textDecoration:"none"}}>
            <button className={styles.loginButton}>Previous</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLibrary;
