
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('issueForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(form);
 
    fetch('/issue/request', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
      console.log(data.error);
      } else {
        alert("Issue Registered Successfully")
        form.reset();
      }
    })
    .catch(error => {
      alert("Error")
      console.error('Error:', error);
    });
  });
});