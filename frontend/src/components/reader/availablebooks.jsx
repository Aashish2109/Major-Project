import React, { useState, useEffect } from "react";
import styles from "./availablebooks.module.scss";
import { Link } from "react-router-dom";
const AvailableBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    ListBooks();
  }, []);

  const ListBooks = async () => {
    try {
      const response = await fetch("/listbooks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: "50px", color: "darkcyan" }}>AVAILABLE BOOKS</h1>
      <div className={styles.tableDiv}>
        <table className={styles.tablestyle}>
          <thead>
            <tr>
              <th
                className={styles.tablerow}
                style={{ color: "red", backgroundColor: "lightgreen" }}
              >
                Book ISBN
              </th>
              <th
                className={styles.tablerow}
                style={{ color: "red", backgroundColor: "lightgreen" }}
              >
                Book Title
              </th>
              <th
                className={styles.tablerow}
                style={{ color: "red", backgroundColor: "lightgreen" }}
              >
                Authors
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, idx) => {
              return (
                <>
                  <tr key={idx}>
                    <td className={styles.tablerow}>{book.isbn}</td>
                    <td className={styles.tablerow}>{book.title}</td>
                    <td className={styles.tablerow}>{book.authors}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link to="/reader/readerfunctions" style={{ textDecoration: "none" }}>
        <button className={styles.availablebooksbutton}>Previous</button>
      </Link>
    </div>
  );
};

export default AvailableBooks;
