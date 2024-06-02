import React, { useState } from "react";
import styles from "./updatebook.module.scss";
import UpdateBookImage from "../images/updatebook.jpg";
import { Link } from "react-router-dom";
const UpdateBook = () => {
  const [isbn, setisbn] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [total_copies, setTotalCopies] = useState("");
  const [available_copies, setAvailableCopies] = useState("");
  const HandleUpdate = async (e) => {
    e.preventDefault();
    const updatedDetails = {
      title: title,
      authors: authors,
      publisher: publisher,
      version: parseInt(version),
      total_copies: parseInt(total_copies),
      available_copies: parseInt(available_copies)
    };
 
    const requestData = {
      isbn: isbn,
      updated_details: updatedDetails
    };
    try {
      const response = await fetch("/update-book", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      if (response.status === 404) {
        alert("book with this ISBN is not present");
      }else if(response.status===403){
        alert("total copies can not be less than available copies")
      }
      else {
        alert("record updated successfully")
        setisbn('')
        setTitle('')
        setAuthors('')
        setPublisher('')
        setVersion('')
        setTotalCopies('')
        setAvailableCopies('')
      }
      console.log(data);
    } catch (error) {
      alert("error");
    }
  };
  return (
    <>
      <div className={styles.container}>
        
        <div className={styles.updateBookdiv}>
          <div>
            <img className={styles.updateBookImage} src={UpdateBookImage} alt="updatebookimage"/>
          </div>
          <div className={styles.updateBook}>
            
            <form >
            <h2 style={{textAlign:"center"}}>UPDATE BOOK DETAILS</h2>
              <label htmlFor="isbn">ISBN:</label>
              <input 
              className={styles.inputUpdate}
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setisbn(e.target.value)}
                placeholder="Enter ISBN Number"
                required pattern="\S+.*"
                autoComplete="off"
              />

              <label htmlFor="title">Title:</label>
              <input
              className={styles.inputUpdate}
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book Title"
                autoComplete="off"
              />

              <label htmlFor="authors">Authors:</label>
              <input
              className={styles.inputUpdate}
                type="text"
                id="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Enter Author Name"
                autoComplete="off"
              />

              <label htmlFor="publisher">Publisher:</label>
              <input
              className={styles.inputUpdate}
                type="text"
                id="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Enter Publisher Name"
                autoComplete="off"
              />

              <label htmlFor="version">Version:</label>
              <input
              className={styles.inputUpdate}
                type="number"
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Enter Version Number"
                autoComplete="off"
              />
              <label htmlFor="total_copies">Total Copies:</label>
              <input
              className={styles.inputUpdate}
                type="number"
                id="total_copies"
                value={total_copies}
                onChange={(e) => setTotalCopies(e.target.value)}
                placeholder="Enter Total Copies"
                autoComplete="off"
              />

              <label htmlFor="available_copies">Available Copies:</label>
              <input
              className={styles.inputUpdate}
                type="number"
                id="available_copies"
                value={available_copies}
                onChange={(e) => setAvailableCopies(e.target.value)}
                placeholder="Enter Available Copies"
                autoComplete="off"
              />
              <button
                type="submit"
                className={styles.updatebookButton}
                onClick={HandleUpdate}
              >
                Update Book
              </button>
              <Link to="/admin/adminfunctions" style={{textDecoration:"none"}}>
                <button className={styles.previousbuttonlink}>Previous</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBook;
