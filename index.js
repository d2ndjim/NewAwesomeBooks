const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookContainer = document.querySelector('.book-section')
const addBtn = document.querySelector("#add-btn");



class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now()
  }
}


class BookDatabase {
  constructor() {
    this.bookList = JSON.parse(localStorage.getItem("awesome-book")) || [];
  }

  displayBook(title, author, id) {
    bookContainer.innerHTML += `
    <div class="list-container">
      <p class="book">"${title}" By ${author}</p>
      <button class="remove-btn" id="${id}">Remove</button>
    </div>`;

    // remove button functionality
    const removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.bookList = this.bookList.filter((book) => book.id != btn.id);
        bookContainer.innerHTML = "";
        this.bookList.forEach((book) => {
          this.displayBook(book.title, book.author, book.id);
        });
        localStorage.setItem("awesome-book", JSON.stringify(this.bookList));
      });
    });
  }

  addBook() {
    addBtn.addEventListener('click', () => {
      const currentBook = new Book(bookTitle.value, bookAuthor.value);
      this.bookList.push(currentBook);
      bookContainer.innerHTML = "";
      this.bookList.forEach((book) => {
        if (book.title.length > 0 && book.author.length > 0) {
          this.displayBook(book.title, book.author, book.id);
        }
      });
      bookTitle.value = "";
      bookAuthor.value = "";
      localStorage.setItem("awesome-book", JSON.stringify(this.bookList));
    })
    
  }

  localStore() {
    this.bookList = JSON.parse(localStorage.getItem("awesome-book")) || [];
    this.bookList.forEach((book) => {
      this.displayBook(book.title, book.author, book.id);
    });
  }
}

const navigate = () => {
  const List = document.querySelector('#list');
  const AddNew = document.querySelector("#add-new");
  const Contact = document.querySelector("#contact")
  const bookSection = document.querySelector(".book-section");
  const AddSection = document.querySelector(".add-new-book");
  const ContactSection = document.querySelector(".contact-section");

  List.addEventListener('click', () => {
    bookSection.classList.remove('hide')
    AddSection.classList.add("hide");
    ContactSection.classList.add("hide");
  })

  AddNew.addEventListener("click", () => {
    bookSection.classList.add("hide");
    AddSection.classList.remove("hide");
    ContactSection.classList.add("hide");
  });

  Contact.addEventListener("click", () => {
    bookSection.classList.add("hide");
    AddSection.classList.add("hide");
    ContactSection.classList.remove("hide");
  });

}

navigate()





const books = new BookDatabase()
books.addBook()
books.localStore();

