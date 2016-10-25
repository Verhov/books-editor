'use strict';

var booksApp = angular.module("booksApp", ["ngRoute"]);

booksApp.config(function ($routeProvider) {

    $routeProvider
        .when("/", { controller: 'BooksListController as booksList', templateUrl: 'views/books-list.html' })
        .when("/book-add", { controller: 'BooksAddController as bookAdd', templateUrl: 'views/books-add.html' })
        .when("/book-upd/:bookId", { controller: 'BooksUpdController as bookUpd', templateUrl: 'views/books-upd.html' })
        .when("/book-details/:bookId", { controller: 'BooksDetailsController as bookDetails', templateUrl: 'views/book-details.html' })
        .otherwise({ redirectTo: '/' });

});