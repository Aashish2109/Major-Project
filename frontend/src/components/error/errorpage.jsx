import React from "react";
import ErrorImage from "../images/errorimage.jpg";
import styles from "./errorpage.module.scss";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <>
      <div>
        <div className={styles.errorPagediv}>
          <div>
            <img className={styles.ErrorImageclass} src={ErrorImage} alt="errorimage" />
          </div>
          <div>
            <Link to='/index' style={{textDecoration:"none"}}>
            <button className={styles.indexbutton}>Go Back</button>
            </Link>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
