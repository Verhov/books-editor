'use strict';

var booksApp = angular.module("booksApp");

/* Books list controller */
booksApp.controller("BooksListController", function ($http, booksStorage) {
    var booksList = this;

    // get books
    booksList.list = booksStorage.getBooks();

    // Demo: fill storage from demo books data
    if (!booksList.list || booksList.list.length <= 0) {
        $http.get('data/demoBooksList.json').success(function (data) {
            booksList.list = data;
            booksStorage.addMany(data);
        });
    }

    // todo: remove book, sort books
    booksList.delBook = function (book) {
        if (confirm('Delete "' + book.header + '"?')) {
            booksList.list = booksStorage.delBook(book.id);
        }
    }

    var oldSort = booksStorage.getSort();
    booksList.sort = oldSort ? oldSort : { property: "header", reverse: false };
    booksList.sortFunc = function (property) {
        booksList.sort.reverse = (booksList.sort.property === property) ? !booksList.sort.reverse : false;
        booksList.sort.property = property;
        booksStorage.saveSort(booksList.sort);
    }
});

/* Details book controller */
booksApp.controller("BooksDetailsController", function ($routeParams, booksStorage) {
    var bookDetails = this,
        bookId = $routeParams.bookId;

    bookDetails.book = booksStorage.getBook(bookId);
    bookDetails.book.releaseDate = new Date(bookDetails.book.releaseDate).toDateString();

});

/* Add book controller */
booksApp.controller("BooksAddController", function ($location, booksStorage) {
    var bookAdd = this;
    bookAdd.newBook = { authors: [], image: null };
    bookAdd.newAuthor = { id: 0 };

    bookAdd.addAuthor = function () {
        bookAdd.newBook.authors.push(bookAdd.newAuthor);
        bookAdd.newAuthor = { id: bookAdd.newAuthor.id + 1 };
    }
    bookAdd.remAuthor = function (author) {
        bookAdd.newBook.authors = bookAdd.newBook.authors.filter(function (a) {
            return a.id !== author.id;
        });
    }
    bookAdd.addBook = function () {
        booksStorage.addBook(bookAdd.newBook);
        $location.path('/');
    }
});

/* Update book controller */
booksApp.controller("BooksUpdController", function () {

});