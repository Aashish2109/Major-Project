document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('libraryForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(form);
 
    fetch('/createaccount', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("User Already Exists")
        console.log(data.error);
      } else {
        alert("User Created Successfully")
        console.log(data.message+" "+data.library_id);
        form.reset();
      }
    })
    .catch(error => {
      alert("Error")
      console.error('Error:', error);
    });
  });
});