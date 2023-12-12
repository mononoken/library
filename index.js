function toggleHidden(element) {
  element.hidden = !element.hidden;
}

document
  .getElementById("book-form-btn")
  .addEventListener("click", () =>
    toggleHidden(document.getElementById("book-form")),
  );

const myLibrary = [];
const tbody = document.querySelector("tbody");

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "read" : "not read yet"
    }`;
  }
}

function logLibrary(library, tbody) {
  // Clear tbody contents
  tbody.replaceChildren();

  // Populate tbody with library
  for (const book of library) {
    addBookToTable(book);
  }
}

function addBookToTable(book) {
  if ("content" in document.createElement("template")) {
    const template = document.querySelector("#book-row");

    const clone = template.content.cloneNode(true);

    const th = clone.querySelector("th");
    const td = clone.querySelectorAll("td");
    th.textContent = book.title;
    td[0].textContent = book.author;
    td[1].textContent = book.pages;
    td[2].appendChild(isReadBtn(book, td[2]));
    // td[2].textContent = book.isRead;
    td[3].appendChild(buildBookRemoveBtn(book, td[3]));

    tbody.appendChild(clone);
  }
}

function isReadBtn(book) {
  const readBtn = document.createElement("button");
  readBtn.textContent = book.isRead;

  readBtn.addEventListener("click", () => {
    book.isRead = !book.isRead;
    logLibrary(myLibrary, tbody);
  });

  return readBtn;
}

function addLibraryToTable(library) {
  for (const book of library) {
    addBookToTable(book);
  }
}

const submit = document
  .querySelector("form#book-form")
  .querySelector(`input[type="submit"]`);

submit.addEventListener("click", submitClick);

function submitClick(event) {
  const form = document.querySelector("form#book-form");
  const title = form.querySelector("input#title").value;
  const author = form.querySelector("input#author").value;
  const pages = form.querySelector("input#pages").value;
  const isRead = form.querySelector("input#read").checked;

  const book = new Book(title, author, pages, isRead);

  myLibrary.push(book);
  logLibrary(myLibrary, tbody);
  event.preventDefault();
}

function buildBookRemoveBtn(book) {
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Delete";

  removeBtn.addEventListener("click", () => removeBook(book));

  return removeBtn;
}

function removeBook(book) {
  const index = myLibrary.indexOf(book);
  myLibrary.splice(index, 1);

  logLibrary(myLibrary, tbody);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
leviathanWakes = new Book("Leviathan Wakes", "James Corey", 561, false);

myLibrary.push(theHobbit);
myLibrary.push(leviathanWakes);

logLibrary(myLibrary, tbody);
