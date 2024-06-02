import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./deletelibrary.module.scss";
import DeleteLibraryImage from "../images/deletelibrary.jpg";
const DeleteLibrary = () => {
  const [libraryID, setLibraryID] = useState("");
  const deleteLibrary = async () => {
    try {
      const response = await fetch(`/deletelibrary/${libraryID}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("library deleted successfully");
        setLibraryID("");
      } else {
        alert("library not found");
        setLibraryID("");
      }
    } catch (error) {
      alert("enter a valid library name");
      console.log("Failed To Delete Library");
    }
  };

  return (
    <div>
      <div className={styles.deletelibrary}>
        <div>
          <img
            className={styles.deletelibraryimage}
            src={DeleteLibraryImage}
            alt="deletelibraryimage"
          />
        </div>
        <div className={styles.maindiv}>
          <h1>Delete Library</h1>
          <label htmlFor="libraryId">Library ID:</label>
          <input
            style={{
              width: "90%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            type="number"
            id="libraryId"
            value={libraryID}
            onChange={(e) => setLibraryID(e.target.value)}
            placeholder="Enter Library ID"
            required
            autoComplete="off"
          />
          <button onClick={deleteLibrary}>Delete Library</button>
          <Link to="/index" style={{ textDecoration: "none" }}>
            <button className={styles.buttonClass}>Previous</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteLibrary;
