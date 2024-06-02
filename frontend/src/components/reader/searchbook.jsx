import React, { useState } from "react";
import styles from "./searchbook.module.scss";
import SearchBookImage from "../images/searchbook.jpg";
import { Link } from "react-router-dom";
const SearchBook = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  var requestData = {
    title: title,
    authors: authors,
    publisher: publisher,
  };
  const HandleClick = async () => {
    try {
      const response = await fetch("/search/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("book founded successfully");
        setTitle("");
        setAuthors("");
        setPublisher("");
      } else {
        alert("book not found");
      }
      console.log(data);
    } catch (error) {
      alert("Error");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={styles.searchBookDiv}>
        <div>
          <img
            src={SearchBookImage}
            className={styles.SearchBookImageClass}
            alt="searchbookimage"
          />
        </div>
        <div className={styles.mainContainer}>
          <h1>Book Search</h1>
          <div className={styles.formContainer}>
            <div className={styles.searchForm}>
              <label htmlFor="title">Title:</label>
              <input
               style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book Title"
                required pattern="\S+.*"
              />
              <label htmlFor="authors">Author:</label>
              <input
                style={{
                  width: "90%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                type="text"
                id="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Enter Author Name"
                required pattern="\S+.*"
              />
              <label htmlFor="title">Publisher:</label>
              <input
                style={{
                  width: "90%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                type="text"
                id="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Enter Publisher Name"
                required pattern="\S+.*"
              />
              <div className={styles.searchbookButtons}>
                <button
                  className={styles.searchbookbuttonclass}
                  onClick={HandleClick}
                >
                  Search
                </button>
                <Link to="/reader/readerfunctions" style={{textDecoration:"none"}}>
                  <button className={styles.searchbookbuttonclass}>
                    Previous
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBook;
