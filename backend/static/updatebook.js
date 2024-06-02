
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('updateBookForm');
    const message = document.getElementById('message');
   
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const formData = new FormData(form);
      const updatedDetails = {
        title: formData.get('title'),
        authors: formData.get('authors'),
        publisher: formData.get('publisher'),
        version: parseInt(formData.get('version')),
        total_copies: parseInt(formData.get('total_copies')),
        available_copies: parseInt(formData.get('available_copies'))
      };
   
      const requestData = {
        isbn: formData.get('isbn'),
        updated_details: updatedDetails
      };
   
      fetch('/update-book', {
        method: 'PATCH',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
          console.log(data.error);
        } else {
          alert("Book Details Updated Successfully")
          //message.innerHTML = `<p>book details updated successfully:</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
          form.reset();
        }
      })
      .catch(error => {
        alert("Error")
        console.error('Error:', error);
      });
    });
  });