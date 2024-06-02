function searchBooks() {
  var title = document.getElementById("title").value;
  var authors = document.getElementById("authors").value;
  var publisher = document.getElementById("publisher").value;

  var requestData = {
    title: title,
    authors: authors,
    publisher: publisher,
  };

  fetch("/search/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Book Found Successfully");
        console.log(
          "ISBN: " +
            data.isbn +
            " LibID: " +
            data.lib_id +
            " Title: " +
            data.title +
            ", Author: " +
            data.authors +
            ", Publisher: " +
            data.publisher +
            " Version: " +
            data.version +
            " TotalCopies: " +
            data.total_copies +
            " AvailableCopies: " +
            data.available_copies
        );
      }
    })
    .catch((error) => {
      alert("Error")
      console.error("Error:", error);
    });
}
