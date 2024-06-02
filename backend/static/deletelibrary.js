// Function to delete a library
function deleteLibrary() {
  const library_id = document.getElementById("libraryId").value;

  fetch(`/deletelibrary/${library_id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete library");
      }
      return response.json();
    })
    .then((data) => {
      alert("Library Deleted Successfully")
      console.log(messageElement.textContent = data.message);
    })
    .catch((error) => {
      alert("Library Not Found")
      console.log("Library Not Found");
    });
}
