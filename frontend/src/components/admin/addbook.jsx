import React, { useState } from "react";
import styles from "./addbook.module.scss";
import addbookImage from "../images/addbookimage.jpg";
import { Link } from "react-router-dom";
const AddBook = () => {
  const [isbn, setisbn] = useState("");
  const [lib_id, setLibID] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [total_copies, setTotalCopies] = useState("");
  const [available_copies, setAvailableCopies] = useState("");
  const [adminemail, setAdminEmail] = useState("");

  const Handler = async () => {
    var requestData = {
      book: {
        isbn: isbn,
        lib_id: parseInt(lib_id),
        title: title,
        authors: authors,
        publisher: publisher,
        version: parseInt(version),
        total_copies: parseInt(total_copies),
        available_copies: parseInt(available_copies),
      },
      email: adminemail,
    };
    try {
      const response = await fetch("/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      if (response.status === 400) {
        alert("admin email is incorrect");
      } else if (response.status === 404) {
        alert("library not found");
      } else if (response.status === 403 || response.status === 500) {
        alert("total copies can not be less than available copies");
      } else {
        alert("book added successfully");
      }
      console.log(data);
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <div>
        
        <div className={styles.addbookdiv}>
          <div>
            <img src={addbookImage} alt="addbookimage" />
          </div>
          <div className={styles.mainContent}>
          <h1 style={{ textAlign: "center"}}>ADD BOOK</h1>
            <label htmlFor="isbn">ISBN:</label>
            <input
              className={styles.addbookInput}
              type="text"
              placeholder="Enter ISBN Number"
              value={isbn}
              onChange={(e) => setisbn(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="lib_id">LibID:</label>
            <input
              className={styles.addbookInput}
              type="number"
              placeholder="Enter Library ID"
              value={lib_id}
              onChange={(e) => setLibID(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="title">Title:</label>
            <input
              className={styles.addbookInput}
              type="text"
              placeholder="Enter Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="authors">Authors:</label>
            <input
              className={styles.addbookInput}
              type="text"
              placeholder="Enter Authors Name"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="publisher">Publisher:</label>
            <input
              className={styles.addbookInput}
              type="text"
              placeholder="Enter Publisher Name"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="version">Version:</label>
            <input
              className={styles.addbookInput}
              type="number"
              placeholder="Enter Book Version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="total_copies">Total Copies:</label>
            <input
              className={styles.addbookInput}
              type="number"
              id="total_copies"
              placeholder="Enter Total Copies"
              value={total_copies}
              onChange={(e) => setTotalCopies(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="available_copies">Available Copies:</label>
            <input
              className={styles.addbookInput}
              type="number"
              id="available_copies"
              placeholder="Enter Available Copies"
              value={available_copies}
              onChange={(e) => setAvailableCopies(e.target.value)}
              required pattern="\S+.*"
              autoComplete="off"
            />

            <label htmlFor="email">Admin Email:</label>
            <input
              className={styles.addbookInput}
              type="email"
              id="email"
              value={adminemail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter Admin Email"
              autoComplete="off"
              required
            />

            <button onClick={Handler}>Add Book:</button>
            <Link to="/admin/adminfunctions" style={{ textDecoration: "none" }}>
              <button className={styles.links}>Previous</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
