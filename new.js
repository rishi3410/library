// getting input from input areas -->

function inputs(bookName, authorName, genre) {
  this.bookName = bookName;
  this.authorName = authorName;
  this.genre = genre;
}

class Display {
  constructor() { }
  add(arrayInputs) {
    let tableBody = document.getElementById("tableb");
    let htmltobeadded = "";
    for (let i = 0; i < arrayInputs.length; i++) {
      htmltobeadded += `
                    <tr>
                    <td>${i + 1}</td>
                      <td>${arrayInputs[i].bookName}</td>
                      <td>${arrayInputs[i].authorName}</td>
                      <td>${arrayInputs[i].genre}</td>
                      <td> <button type="button" onclick = "deleteItem(${i})" class ="dlt-btn btn-primary btn " id ="dlt-btn"> Delete </button> </td>
                    </tr>
                `;
    }
    tableBody.innerHTML = htmltobeadded;
  }
  clear() {
    let myForm = document.getElementById("xyz");
    myForm.reset();
  }
  validate(inputs) {
    if (inputs.bookName == "" || inputs.authorName == "") {
      return false;
    } else return true;
  }
  alertuser(genre, sub, massage) {
    let alertuser = document.getElementById("alertuser");
    let htmltobeaddedinalert = ` <div class="alert alert-${genre} alert-dismissible fade show" id="alert" role="alert" >
        <strong>${sub}</strong> ${massage}
        <button type="button" class="close"  data-dismiss="alert" aria-label="Close">
  
    <span aria-hidden="true">×</span>
        </button>
      </div>`;
    alertuser.innerHTML += htmltobeaddedinalert;
    setTimeout(() => {
      alertuser.innerHTML = "";
    }, 4000);
  }

  // check if the book is issued or not -->
  checkIssue(listArray, o1) {
    for (let i = 0; i < listArray.length; i++) {
      if (listArray[i].authorName == o1.authorName) {
        this.issuedUser = listArray[i].bookName;
        return 0;
      }
    }
    return 1;
  }
}

// Show BookList even after reload -->
function showList() {
  let listItems = localStorage.getItem("listItems");
  if (listItems == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(listItems);
  }
  new Display().add(listArray);
  // console.log(listArray);
}
showList();

// Deleting List Item -->
function deleteItem(index) {
  let listItems = localStorage.getItem("listItems");
  if (listItems == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(listItems);
  }
  listArray.splice(index, 1);
  localStorage.setItem("listItems", JSON.stringify(listArray));
  showList();
}

// add submit finction to the form -->
const form = document.getElementById("xyz");
form.addEventListener("submit", formSubmit);
function formSubmit(e) {
  e.preventDefault();
  let givenbookName = document.getElementById("bookname").value;
  let givenauthorName = document.getElementById("author").value;
  let givengenre;
  let checkFiction = document.getElementById("Fiction");
  let checknNonfiction = document.getElementById("Non Fiction");
  let checkbio = document.getElementById("Biography");
  let checkautobio = document.getElementById("Autobiography");
  if (checkFiction.checked) {
    givengenre = checkFiction.value;
  } else if (checknNonfiction.checked) {
    givengenre = checknNonfiction.value;
  } else if (checkbio.checked){
    givengenre = checkbio.value
  } else {
    givengenre = checkautobio.value;
  }

  let o1 = new inputs(givenbookName, givenauthorName, givengenre);

  let displayObj = new Display();
  if (displayObj.validate(o1) && displayObj.checkIssue(listArray, o1) == 1) {
    let listItems = localStorage.getItem("listItems");
    if (listItems == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(listItems);
    }
    listArray.push(o1);
    localStorage.setItem("listItems", JSON.stringify(listArray));
    // console.log(listArray.length);

    new Display().add(listArray);
    displayObj.clear();
    displayObj.alertuser("success", "Success", "Book is issued");
  } else if (displayObj.checkIssue(listArray, o1) == 0) {
    let issuedUser =
      displayObj.alertuser(
        "danger",
        "Oops!",
        `Book is already issued by ${displayObj.issuedUser}`
      );
    displayObj.clear();
  } else {
    displayObj.alertuser("danger", "Oops!", "Book is not issued");
    displayObj.clear();
  }
} 