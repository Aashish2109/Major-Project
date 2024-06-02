// Function to list issue requests
function availableBooks() {
  fetch("/listlibraries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch issue requests");
      }
      return response.json();
    })
    .then((issueRequests) => {
      const issueRequestsContainer = document.getElementById("issueRequests");
      issueRequestsContainer.innerHTML = ""; // Clear previous content

      issueRequests.forEach((request) => {
        const requestElement = document.createElement("div");
        requestElement.innerHTML = `
            <p>LIBRARY ID: ${request.id}</p>
                <p>LIBRARY NAME: ${request.name}</p>
                <hr>
            `;
        issueRequestsContainer.appendChild(requestElement);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
