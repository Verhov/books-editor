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

});

/* Details book controller */
booksApp.controller("BooksDetailsController", function ($routeParams, booksStorage) {
    var bookDetails = this,
        bookId = $routeParams.bookId;
    
    bookDetails.book = booksStorage.getBook(bookId);
    bookDetails.book.releaseDate = new Date(bookDetails.book.releaseDate).toDateString();
    
});

/* Add book controller */
booksApp.controller("BooksAddController", function () {

});

/* Update book controller */
booksApp.controller("BooksUpdController", function () {

});