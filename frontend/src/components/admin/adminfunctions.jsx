import React from "react";
import styles from "./adminfunctions.module.scss";
import AdminImage from '../images/adminimage.jpg'
import { Link } from "react-router-dom";
const AdminFunctions = () => {
  return (
    <>
    <div className={styles.updatebookDiv}>
    <h1>What Do You Want To Do ?</h1>
      <div className={styles.adminmain}>
        
        <div>
          <img src={AdminImage} alt="adminImage" className={styles.adminImage}/>
        </div>
        <div className={styles.adminfunctions}>
          <div className={styles.addbook}>
            <Link to="/admin/addbook" style={{textDecoration:"none"}}>
              <button className={styles.adminButtons}>Add Book</button>
            </Link>
          </div>
          <div className={styles.removebook}>
            <Link to="/admin/removebook" style={{textDecoration:"none"}}>
              <button className={styles.adminButtons}>Remove Book</button>
            </Link>
          </div>
          <div className={styles.updatebook}>
            <Link to="/admin/updatebook" style={{textDecoration:"none"}}>
              <button className={styles.adminButtons}>Update Book</button>
            </Link>
          </div>
          <div className={styles.issuerequest}>
            <Link to="/admin/listissuerequest" style={{textDecoration:"none"}}>
              <button className={styles.adminButtons}>View Requests</button>
            </Link>
          </div>
          <div className={styles.index}>
            <Link to="/login/login" style={{textDecoration:"none"}}>
              <button className={styles.adminButtons}>LogOut</button>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AdminFunctions;
