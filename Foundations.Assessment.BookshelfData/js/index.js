
let shelfTitle = document.querySelector("#shelfTitle")

let body = document.querySelector("body")

// We get a stack of index cards of book info - book-data.js
// I enter all the info into a spreadsheet - contructor
// I use the spreadsheet to order books - addbook
// I take the books and put them onto shelf - render

class Book {
    // Create the four elements needed to categorize each book
    constructor(title, author, language, subject) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.subject = subject;
    }
    render(){

        // Attempt at favorites button...
        // The box to hold the amount of clicks
        let bookCover = document.createElement("section")
        bookCover.className = "bookCover"
        body.append(bookCover)
        
        // Create button for the UI
        // Turns the book yellow if favorited
        let favoriteButton = document.createElement("button")
        favoriteButton.className = "favoriteButton"
        bookCover.append(favoriteButton)
        favoriteButton.textContent = "Favorite"
        favoriteButton.addEventListener("click", event => {
            bookItem.style.backgroundColor = "yellow"
            if(event.target.classList.contains("favorite")){
                event.target.classList.remove("favorite")
            } else event.target.classList.add("favorite")
        })

         // Create each element and style them
        let bookTitle = document.createElement("h1");
        bookTitle.textContent = `${this.title}`;
        bookTitle.style.fontSize = "50px"
        bookTitle.style.color = "maroon"
        
        let bookAuthor = document.createElement("h1");
        bookAuthor.textContent = `${this.author}` ;
        bookAuthor.style.fontSize = "30px"
        bookAuthor.style.color = "red"

        let bookLanguage = document.createElement("h2")
        bookLanguage.textContent = `${this.language}`;
        bookLanguage.style.fontSize = "20px"
        bookLanguage.style.color = "black"

        let bookSubject = document.createElement("ol")
        bookSubject.textContent = `${this.subject}`;
        bookSubject.style.fontSize = "30px"
        bookSubject.style.color = "black"
        bookSubject.style.border = "5px dotted black"
        bookSubject.style.textOverflow = "ellipsis"

        // Put all the elements into its own box, representing the cover of the books
        let bookItem = document.createElement("li");
        bookItem.append(bookTitle, bookAuthor, bookLanguage, bookSubject, favoriteButton)
        bookItem.style.border = "10px solid black"
        bookItem.style.backgroundColor = "silver"
        bookItem.style.width = "30%"
        bookItem.style.height = "550px"
        bookItem.style.display = "inline-block"
        bookItem.style.margin = "4px"
        
        return bookItem
    }
}


class Bookshelf {
    // This represents the spreadsheet
    // I want to take all the books and display them on the bookshelf
    // I am to place all the books into an array
    constructor() {
        this.arrayOfBooks = []
    }

    // Method to add book to the bookshelf
    addBook(addedBook) {
        this.arrayOfBooks.push(addedBook);
    }

    // Using seed method, loop through all the books and populate the shelf with the elements
    // of each book
    seed(arrayOfBooks){
    for(const book of arrayOfBooks){
        let bookInstance = new Book(book.title, book.author, book.language, book.subject)
        bookShelf.addBook(bookInstance)
    }
    }

    // Refactored render to use map
    render(){
        let shelf = document.querySelector("#shelf");

        let bookItemList = document.createElement("ul");

        const bookDOMelements = this.arrayOfBooks.map((book) => book.render())
        
        bookItemList.replaceChildren(...bookDOMelements)
        shelf.replaceChildren(bookItemList)

    }
    
    // Set all the functions for filtering by ascending, descending, and by subject
    stAscending() {
        this.arrayOfBooks.sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
        })
        console.log(this.arrayOfBooks)
        this.render()
    }
    stDescending() {
        let sortDescending = document.querySelector("#sortDescending")
        this.arrayOfBooks.sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
        return 0
        })
        console.log(this.arrayOfBooks)
        this.render()
    }
    stSubject() {
        let sortSubject = document.querySelector("#sortSubject")
        this.arrayOfBooks.sort(function(a ,b) {
        if (a.subject.length > b.subject.length) return -1
        if (a.subject.length < b.subject.length) return 1
        })
        console.log(this.arrayOfBooks)
        this.render()
    } 
}


// console.log("this is a book test", new Book("JRR Tolkien", "English", ["Fantasy, Adventure"], "Lord of the Rings"))
// console.log("this be a Bookshelf test", new Bookshelf())

let book1 = new Book("title", "author", "language", ["subject1, subject2"]);
console.log("this is a rendered book", book1)
let bookShelf = new Bookshelf();
bookShelf.addBook(book1)

bookShelf.seed(bookData)
bookShelf.render()

// Get the proper method from BookShelf to initiate when selected
let sortAscending = document.querySelector("#option")
// console.log(sortAscending)
sortAscending.addEventListener("change", (textEvent) => {
    console.log(textEvent.target.value)
    if (textEvent.target.value == "Sort Ascending") {
        bookShelf.stAscending()
    }
    else if (textEvent.target.value == "Sort Descending") {
        bookShelf.stDescending()
    }

    // console.log(sortAscending)
})



