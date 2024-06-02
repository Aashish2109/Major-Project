// Function to list issue requests
function listIssueRequests() {
    fetch('/listissuerequests',{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch issue requests');
        }
        return response.json();
    })
    .then(issueRequests => {
        const issueRequestsContainer = document.getElementById('issueRequests');
        issueRequestsContainer.innerHTML = ''; // Clear previous content
        
        issueRequests.forEach(request => {
            const requestElement = document.createElement('div');
            requestElement.innerHTML = `
                <p>Request ID: ${request.req_id}</p>
                <p>Book ID: ${request.book_id}</p>
                <p>Reader ID: ${request.reader_id}</p>
                <p>Request Date: ${request.request_date}</p>
                <p>Approval Date: ${request.approval_date}</p>
                <p>Approver ID: ${request.approver_id}</p>
                <p>Request Type: ${request.request_type}</p>
                <button onclick="approveIssueRequest(${request.req_id})">Approve</button>
                <button onclick="rejectIssueRequest(${request.req_id})">Reject</button>
                <hr>
            `;
            issueRequestsContainer.appendChild(requestElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to approve an issue request
function approveIssueRequest(req_id) {
    fetch(`/approve-issue-request/${req_id}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to approve issue request');
        }
        return response.json();
    })
    .then(data => {
        alert("Issue request approved successfully");
        console.log('Issue request approved successfully:', data);
        // Optionally, update UI or perform other actions after approval
        listIssueRequests(); // Refresh issue requests list
    })
    .catch(error => {
        alert("No Available Copies")
        console.error('Error:', error);
    });
}

// Function to reject an issue request
function rejectIssueRequest(req_id) {
    fetch(`/reject-issue-request/${req_id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to reject issue request');
        }
        return response.json();
    })
    .then(data => {
        alert("Issue request rejected successfully");
        console.log('Issue request rejected successfully:', data);
        // Optionally, update UI or perform other actions after rejection
        listIssueRequests(); // Refresh issue requests list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}