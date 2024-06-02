import React, { useState, useEffect } from "react";
import styles from "./availablelibraries.module.scss";
import {Link} from'react-router-dom'
const Availablelibraries = () => {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    ListLibraries();
  }, []);

  const ListLibraries = async () => {
    try {
      const response = await fetch("/listlibraries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLibraries(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        AVAILABLE LIBRARIES
      </h1>
      <div className={styles.availableTable}>
        <table>
          <thead>
            <tr>
              <th className={styles.availableTableclass}>Library ID</th>
              <th className={styles.availableTableclass}>Library Name</th>
            </tr>
          </thead>
          <tbody>
            {libraries.map((library, idx) => {
              return (
                <>
                  <tr key={idx}>
                    <td className={styles.availableTabledata}>{library.id}</td>
                    <td className={styles.availableTabledata}>
                      {library.name}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link to='/' style={{textDecoration:'none'}} >
      <button className={styles.previousbuttonavailable}>
        Previous
      </button>
      </Link>
      
    </div>
  );
};

export default Availablelibraries;
