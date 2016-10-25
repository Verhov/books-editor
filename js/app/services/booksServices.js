'use strict';

angular.module("booksApp")
    .provider("booksStorage", [function () {
        var defaults = this.defaults = {
            provider: booksLochalStorageProvider
        };

        this.$get = function () {
            return new defaults.provider();
        }
    }]);


/* 
 * Provider for user brouser localStorage
 */
function booksLochalStorageProvider() {
    var _this = this,
        storageKey = "books";

    function toJson(obj) {
        return JSON.stringify(obj);
    }

    function toObj(str) {
        return JSON.parse(str);
    }

    function getBooks() {
        var books = localStorage.getItem(storageKey);
        if (!books) {
            return [];
        }
        return toObj(books)
    }

    function saveBooks(books) {
        localStorage.setItem(storageKey, toJson(books));
    }

    function generateId() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return uuid;
    }

    // get books from localStorage
    this.getBooks = function () {
        return getBooks();
    }

    // get book from localStorage
    this.getBook = function (id) {
        var books = getBooks();
        for (var i = 0; i < books.length; i ++) {
            if (books[i].id === id) {
                return books[i];
            }
        }
        return null;
    }

    // add book to localStorage
    this.addBook = function (book) {
        var books = getBooks();
        book.id = generateId();
        books.push(book);
        saveBooks(books);
    }

    // add books to localStorage
    this.addMany = function (newBooks) {
        var books = getBooks();
        newBooks.forEach(function (item) {
            item.id = generateId();
            books.push(item);
        });
        saveBooks(books);
    }

    // update book in localStorage
    this.updBook = function (book) {
        var books = getBooks();

        books = books.map(function (item) {
            return item.id == book.id ? book : item;
        });

        saveBooks(books);
    }

    // delete book from localStorage
    this.delBook = function (id) {
        var books = getBooks();

        books = books.filter(function (item) {
            return item.id != id;
        });

        saveBooks(books);
    }

    // event: on storage updated
    this.onStorageUpdated = function (callback) {
        window.addEventListener("storage", function (e) {
            if (e.key == storageKey) {
                var lsBooks = e.newValue ? toObj(e.newValue) : [];
                callback(lsBooks);
            }
        }, false);
    }
}