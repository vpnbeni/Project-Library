// console.log("this is es6 version of project 2");
displayFromLocal();
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
class Display {
  

  add(book) {
    let libraryBook = localStorage.getItem("libraryBook");
    let bookObj;
    if (libraryBook == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(libraryBook);
    }
    bookObj.push(book);
    localStorage.setItem("libraryBook", JSON.stringify(bookObj));
    displayFromLocal();
  }
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  showPrompt(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error";
    }
    message.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                      <strong>${boldText}: ${displayMessage}!</strong> You should check in on some of those
                      fields below.
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
  }
}
function displayFromLocal() {
  let libraryBook = localStorage.getItem("libraryBook");

  if (libraryBook == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(libraryBook);
  }
  let uiString = ``;
  bookObj.forEach(function (element, index) {
    // console.log(element);
    uiString += `
    <tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button
                        type="button"
                        class="btn-close btn-clos"
                        id=${index}
                        onclick="deleteBook(this.id)"
                        aria-label="Close"
                        ></button></td>
                        </tr>
                        `;
  });
  let tableBody = document.getElementById("tableBody");
  if (bookObj.length != 0) {
    tableBody.innerHTML = uiString;
  } else {
    tableBody.innerHTML = `Nothing to show! Use "Add Book" section above to add books.`;
  }
}

// function deleteBook(index) {
//   tableBody = document.getElementById("tableBody");
//   // tableBody.innerHTML = "";
//   console.log();
// }

function deleteBook(index) {
  // console.log(`I am deleting ${index}`);
  let libraryBook = localStorage.getItem("libraryBook");
  if (libraryBook == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(libraryBook);
  }
  // console.log(bookObj[index]);
  bookObj.splice(index, 1);
  // console.log(bookObj);
  localStorage.setItem("libraryBook", JSON.stringify(bookObj));
  displayFromLocal();
}

// console.log(document.getElementsByClassName('btn-clos').index);
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let book = new Book(name, author, type);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    displayFromLocal();
    display.clear();
    display.showPrompt("success", "Your book has been successfully added");
  } else {
    //show error to user
    display.showPrompt("danger", "Sorry you cannot add this book.");
  }
  // console.log(book);
  // console.log("You have submitted library form ");
  e.preventDefault();
}
