function Book(name, author,number, didRead){
    this.nameOfBook = name;
    this.nameOfAuthor = author;
    this.numberOfPages = number;
    this.didReadIt = didRead;
}

let library = [];
const addNewBookButton = document.querySelector('.add-new-book-button');

const AddNewBookModal = document.querySelector('.add-new-book-dialog');
const EditBookModal = document.querySelector('.edit-book-dialog');

const closeBookButton = document.querySelectorAll('.close-new-book');


var newBookForm = document.getElementById('new-form');
var editForm = document.getElementById('edit-form');

var submitNewBookButton= document.getElementById("new-book");
var submitEditButton= document.getElementById("edit-book");

var gridContainer = document.querySelector(".grid-container");

var index_of_edit;



function visualizeLibrary(){
    gridContainer.replaceChildren();

    library.forEach((element, index)=>{
        var div = document.createElement("div");
        var inputNameOfAuthor = document.createElement("div");
        var inputNameOfBook= document.createElement("div");
        var inputNumberOfPages = document.createElement("div");
        var buttons = document.createElement("div");

        var DeleteButton = document.createElement("button");
        var EditButton = document.createElement("button");

        inputNameOfAuthor.appendChild(document.createTextNode(element.nameOfAuthor));
        inputNameOfAuthor.classList.add("name-of-author");

        inputNameOfBook.appendChild(document.createTextNode(element.nameOfBook));
        inputNameOfBook.classList.add("name-of-book");

        inputNumberOfPages.appendChild(document.createTextNode(element.numberOfPages));
        inputNumberOfPages.classList.add("number-of-pages");

        div.appendChild(inputNameOfAuthor);
        div.appendChild(inputNameOfBook);
        div.appendChild(inputNumberOfPages);
        div.classList.add("parent");

        buttons.classList.add("two-buttons");

        buttons.appendChild(EditButton);
        buttons.appendChild(DeleteButton);
        
        


        EditButton.appendChild(document.createTextNode("Edit"));
        DeleteButton.append(document.createTextNode("Delete"));

        //tipka za brisanje
        DeleteButton.addEventListener('click', ()=>{
            library.splice(index,1);
            visualizeLibrary();
            newBookForm.reset();
        })

        //tipka za edit
        EditButton.addEventListener('click', ()=>{
            EditBookModal.open = true;

            let nameOfAuthor = document.getElementById("name-of-author-edit");
            nameOfAuthor.value = library[index].nameOfAuthor;

            let nameOfBook = document.getElementById("name-of-book-edit");
            nameOfBook.value = library[index].nameOfBook;

            let numberOfPages = document.getElementById("number-of-pages-edit");
            numberOfPages.value = library[index].numberOfPages;

            let didYouRead = document.getElementById("did-you-read-edit");

            if(library[index].didReadIt === true)
            {
                didYouRead.checked = true;   
            }
            else{

                didYouRead.checked = false;
            }
            index_of_edit = index;
           

        })
        


        div.appendChild(buttons);

        gridContainer.appendChild(div);

        let parents = document.querySelectorAll(".parent");
        parents.forEach((element) =>{
            if(library[index].didReadIt)
            {
                parents[index].style.borderTop = "10px solid green"
                parents[index].style.backgroundColor = "#003459";
            }
            else{
                parents[index].style.borderTop = "10px solid #6B0F1A"
                parents[index].style.backgroundColor = "#003459";
            }
        })
       




    })
}


addNewBookButton.addEventListener('click', () =>{
    AddNewBookModal.open = true;
    
});



closeBookButton.forEach((element) =>{
    element.addEventListener('click', ()=>{
        AddNewBookModal.open = false;
        EditBookModal.open = false;
        editForm.reset();
        newBookForm.reset();
    })
})



newBookForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    let name = document.getElementById('name-of-author').value;
    let nameOfBook = document.getElementById('name-of-book').value;
    let numberOfPages =document.getElementById('number-of-pages').value;

    if (numberOfPages == ""){numberOfPages = "0";}
    let didYouRead = document.getElementById('did-you-read').checked;

    let tempBook = new Book(name, nameOfBook, numberOfPages, didYouRead);
    library.push(tempBook);

    AddNewBookModal.open=false;
    newBookForm.reset();

    visualizeLibrary();
})


editForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let name = document.getElementById('name-of-author-edit').value;
    let nameOfBook = document.getElementById('name-of-book-edit').value;
    let numberOfPages =document.getElementById('number-of-pages-edit').value;

    if (numberOfPages == ""){numberOfPages = "0";}
    let didYouRead = document.getElementById('did-you-read-edit').checked;

    let tempBook = new Book(nameOfBook ,name, numberOfPages, didYouRead);
    //kod za izbaciti array i ubaciti novi element popraviti
    library.splice(index_of_edit , 1, tempBook);
    
    
    EditBookModal.open=false;
    editForm.reset();

    visualizeLibrary();
})






