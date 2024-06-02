import React, { useState, useEffect } from "react";
import styles from "./listrequest.module.scss";
import { Link } from "react-router-dom";
const ListRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    ListRequests();
  }, []);

  // Function to list issue requests
  const ListRequests = async () => {
    try {
      const response = await fetch("/listissuerequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRequests(data);
      console.log(data);
    } catch (error) {
      alert("error");
    }
  };

  // Function to approve an issue request
  const approveIssueRequest = async (req_id) => {
    try {
      const response = await fetch(`/approve-issue-request/${req_id}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (response.ok) {
        alert("issue request approved successfully");
        console.log(data);
        ListRequests();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("error")
    }
  };

  // Function to reject an issue request
  const rejectIssueRequest = async (req_id) => {
    try {
      const response = await fetch(`/reject-issue-request/${req_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        alert("issue request rejected successfully");
        ListRequests()
        console.log(data);
      }
      else{
        console.error();
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        ISSUE REQUEST MANAGEMENT
      </h1>
      <div className={styles.listrequesttable}>
        <table>
          <thead>
            <tr>
              <th className={styles.tableheading}>Request ID</th>
              <th className={styles.tableheading}>Book ID</th>
              <th className={styles.tableheading}>Reader ID</th>
              <th className={styles.tableheading}>Request Date</th>
              <th className={styles.tableheading}>Approval Date</th>
              <th className={styles.tableheading}>Approver ID</th>
              <th className={styles.tableheading}>Request Type</th>
              <th className={styles.tableheading}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, idx) => {
              return (
                <>
                  <tr key={idx}>
                    <td className={styles.tabledata}>{request.req_id}</td>
                    <td className={styles.tabledata}>{request.book_id}</td>
                    <td className={styles.tabledata}>{request.reader_id}</td>
                    <td className={styles.tabledata}>{request.request_date}</td>
                    <td className={styles.tabledata}>
                      {request.approval_date}
                    </td>
                    <td className={styles.tabledata}>{request.approver_id}</td>
                    <td className={styles.tabledata}>{request.request_type}</td>
                    <div className={styles.requestbuttons}>
                      <button
                        className={styles.approve}
                        onClick={() => approveIssueRequest(request.req_id)}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectIssueRequest(request.req_id)}
                      >
                        Reject
                      </button>
                    </div>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.previousbuttonlist}>
      <Link to="/admin/adminfunctions" style={{textDecoration:"none"}}>
      <button className={styles.previousbuttonoflist}>Previous</button>
      </Link>
      </div>
      

    </div>
  );
};

export default ListRequest;
