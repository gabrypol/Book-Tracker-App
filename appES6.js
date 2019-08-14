// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI class
class UI {
    addBookToList(book) {
        // Create the body of the table
        const bookList = document.querySelector('#book-list');
        // Create one row of the table
        const row = document.createElement('tr');
        
        // Create elements of the row ('td')
        const titleCell = document.createElement('td');
        const authorCell = document.createElement('td');
        const isbnCell = document.createElement('td');
        const deleteX = document.createElement('td');
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        isbnCell.textContent = book.isbn;
        deleteX.innerHTML = '<a href="#" class="delete">X</a>';

        row.append(titleCell, authorCell, isbnCell, deleteX);
        bookList.appendChild(row);
    }

    showAlert(message, className) {
        // Create alert box
        const alertBox = document.createElement('div');
        // Add the class names 
        alertBox.className = `alert ${className}`;
        alertBox.appendChild(document.createTextNode(message));
        // Parent
        const container = document.querySelector('.container');
        // Form
        const form = document.querySelector('#book-form');
        // Append alert box 
        container.insertBefore(alertBox, form);
        // Timeout after 5 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 5000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearTextFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


// Select '#book-form' element of the DOM and assign it to the variable 'form'
const form = document.querySelector('#book-form');


// Add Book Event listener 
form.addEventListener('submit', (e) => {
    // Get values input by the user
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    // Create a book instance
    const book = new Book(title, author, isbn);

    // Create a UI instance
    const ui = new UI();

    console.log(ui);

    // Input validation
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in Title, Author and ISBN of the book.', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success alert
        ui.showAlert('The book has been successfully added to the system.', 'success');
            
        // Clear text fields
        ui.clearTextFields();
    }

    e.preventDefault();
})


// Delete Book Event Listener
document.querySelector('#book-list').addEventListener('click', (e) => {
    
    // Create a UI instance
    const ui = new UI();

    // Delete book from list
    ui.deleteBook(e.target);

    // Show success alert
    ui.showAlert('The book has been successfully deleted from the system.', 'success');

    e.preventDefault();
})