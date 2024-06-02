function addBook() {
    var isbn = document.getElementById('isbn').value;
    var lib_id = parseInt(document.getElementById('lib_id').value);
    var title = document.getElementById('title').value;
    var authors = document.getElementById('authors').value;
    var publisher = document.getElementById('publisher').value;
    var version = parseInt(document.getElementById('version').value);
    var total_copies = parseInt(document.getElementById('total_copies').value);
    var available_copies = parseInt(document.getElementById('available_copies').value);
    var adminEmail = document.getElementById('email').value;
 
    var requestData = {
        book: {
            isbn: isbn,
            lib_id: lib_id,
            title: title,
            authors: authors,
            publisher: publisher,
            version: version,
            total_copies: total_copies,
            available_copies: available_copies
        },
        email: adminEmail
    };
 
    fetch('/add-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error)
            console.log(data.error);
        } else {
            alert("Book Added Successfully")
            console.log('Book Added Successfully!!!');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}