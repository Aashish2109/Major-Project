import React from "react";
import { Link } from "react-router-dom";
import styles from "./readerfunctions.module.scss";
import ReaderFunctionsImage from '../images/readerfunctions.jpg'
const ReaderFunctions = () => {
  return (
    <div>
      <div className={styles.mainReaderDiv}>
        <div>
            <img  className={styles.ReaderFunctionsImage} src={ReaderFunctionsImage} alt="readerfunctionsimage"/>
        </div>
        <div className={styles.parentdiv}>
          <h1>What Do You Want To Do ?</h1>
          <div className={styles.maincontent}>
            <div className={styles.searchbook}>
              <Link to ="/reader/searchbook" style={{textDecoration:"none"}}>
                <button className={styles.ReaderFunctionsButtons}>Search Book</button>
              </Link>
            </div>
            <div className={styles.raisebookrequest}>
              <Link to="/reader/raisebookrequest" style={{textDecoration:"none"}}>
                <button  className={styles.ReaderFunctionsButtons}>Issue Request</button>
              </Link>
            </div>
            <div className={styles.books}>
              <Link to="/reader/availablebooks" style={{textDecoration:"none"}}>
                <button  className={styles.ReaderFunctionsButtons}>Books</button>
              </Link>
            </div>
            <div className={styles.logout}>
              <Link to="/login/login" style={{textDecoration:"none"}}>
                <button  className={styles.ReaderFunctionsButtons}>LogOut</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderFunctions;
