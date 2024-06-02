document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('removeBookForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(form);
 
    fetch('/remove-book', {
      method: 'DELETE',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("Error")
        console.log(data.error)
      } else {
        alert("Book Removed Successfully")
        console.log(data.message);
        form.reset();
      }
    })
    .catch(error => {
      alert("Error")
      console.error('Error:', error);
    });
  });
});