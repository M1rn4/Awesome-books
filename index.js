import { DateTime } from './modules/luxon.js';
import { Book } from './modules/book.js';
import {
  container,
  bookTitle,
  addNew,
  contact,
  bookAuthor,
  // eslint-disable-next-line no-unused-vars
  addBook,
  pageTitle,
  bookContainer,
  contactContainer,
  list,
  form,
} from './modules/elements-html.js';

// eslint-disable-next-line no-unused-vars
class features {
  static addNewBook = () => {
    // js to create a new book object
    const newBookTitle = bookTitle.value;
    const newBookAuthor = bookAuthor.value;
    const book = new Book(newBookTitle, newBookAuthor);

    // to set up and update local storage
    if (localStorage.getItem('awesome-books') == null) {
      localStorage.setItem('awesome-books', '[]');
    }

    // geting old data and merging with new data
    const oldData = JSON.parse(localStorage.getItem('awesome-books'));
    oldData.push(book);

    // updating local storage data
    localStorage.setItem('awesome-books', JSON.stringify(oldData));
  };

  static removeBook = (index) => {
    const books = JSON.parse(localStorage.getItem('awesome-books'));
    books.splice(index, 1);
    // js to update local storage after removing a book
    localStorage.setItem('awesome-books', JSON.stringify(books));
  };

  static displayBooks = () => {
    container.innerHTML = '';
    const books = JSON.parse(localStorage.getItem('awesome-books'));
    for (let i = 0; i < books.length; i += 1) {
      const div = document.createElement('div');
      div.className = 'book-container';
      if (i % 2 !== 0) {
        div.className = 'white-color';
      } else {
        div.className = 'gray-color';
      }

      const textDiv = document.createElement('div');
      textDiv.className = 'text-container';

      const spanTitle = document.createElement('span');
      spanTitle.className = 'book-title';
      spanTitle.innerHTML = `"${books[i]?.title}"`;
      textDiv.appendChild(spanTitle);

      const by = document.createElement('span');
      by.innerHTML = ' by ';
      textDiv.appendChild(by);

      const spanAuthor = document.createElement('span');
      spanAuthor.className = 'author';
      spanAuthor.innerHTML = books[i]?.author;
      textDiv.appendChild(spanAuthor);

      const removeButton = document.createElement('button');
      removeButton.className = 'remove';
      removeButton.innerHTML = 'Remove';
      div.appendChild(removeButton);
      removeButton.onclick = () => {
        features.removeBook(i);
        features.displayBooks();
      };

      div.appendChild(textDiv);
      container.appendChild(div);
    }
  };
}
// js to add event to aadBook and prevent default
const buttonAdd = addBook.addEventListener('click', (event) => {
  if (bookTitle.value == null || bookAuthor.value == null) {
    event.preventDefault();
  } else {
    addBook.addEventListener('click', features.addNewBook);
  }
});

// js to invoke displayBooks function
window.addEventListener(
  'DOMContentLoaded',
  features.displayBooks,
);
// js to display time
const dateTime = DateTime.now();
document.querySelector('.date-time').innerHTML = dateTime.toLocaleString(
  DateTime.DATETIME_MED,
);

// functions for DOM Manipulation
const displayList = () => {
  bookContainer.classList.remove('hide');
  list.classList.remove('deactive');
  form.classList.add('hide');
  addNew.classList.add('deactive');
  contactContainer.classList.add('hide');
  contact.classList.add('deactive');
  pageTitle.innerHTML = 'All awesome books';
  // eslint-disable-next-line no-console
  container.innerHTML = 'hola';
};
list.addEventListener('click', displayList);

const displayAddNew = () => {
  bookContainer.classList.add('hide');
  list.classList.add('deactive');
  form.classList.remove('hide');
  addNew.classList.remove('deactive');
  contactContainer.classList.add('hide');
  contact.classList.add('deactive');
  pageTitle.innerHTML = 'Add a new book';
  buttonAdd();
};

addNew.addEventListener('click', displayAddNew);

const displayContact = () => {
  bookContainer.classList.add('hide');
  list.classList.add('deactive');
  form.classList.add('hide');
  addNew.classList.add('deactive');
  contactContainer.classList.remove('hide');
  contact.classList.remove('deactive');
  pageTitle.innerHTML = 'Contact information';
};

contact.addEventListener('click', displayContact);