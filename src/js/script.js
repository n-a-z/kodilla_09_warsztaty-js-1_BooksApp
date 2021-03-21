/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    book: {
      image: '.book__image',
    },
  };

  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.books).innerHTML
    ),
  };

  const favoriteBooks = [];

  class BooksList {
    constructor() {
      //const thisBooksList = this; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData() {
      //const thisBooksList = this;
      this.data = dataSource.books;
    }

    getElements() {
      //const thisBooksList = this;

      //thisBooksList.favoriteBooks = []; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      this.bookContainer = document.querySelector(
        select.containerOf.books
      );
    }

    render() {
      //const thisBooksList = this;
      //console.log(document.querySelector(select.templateOf.books));
      for (let book of this.data) {
        const bookHTML = templates.books(book);
        //console.log('bookHTML',bookHTML);

        const bookDOM = utils.createDOMFromHTML(bookHTML);
        //console.log('bookDOM',bookDOM);

        //console.log('bookContainer',bookContainer);
        this.bookContainer.appendChild(bookDOM);
      }
    }

    initActions() {
      //const thisBooksList = this;

        this.bookContainer.addEventListener("dblclick", function (event) {
          event.preventDefault();

          //const clickedElement = event.target;
          const clickedElement = event.target.offsetParent;
          //console.log(clickedElement);
          //console.log(select.book.image.substring(1));

          if (clickedElement.classList.contains(select.book.image.substring(1))) {
            clickedElement.classList.toggle("favorite");
            let imageID = clickedElement.getAttribute("data-id");
            //console.log(clickedElement);

            if (!favoriteBooks.includes(imageID)) favoriteBooks.push(imageID);
            else if (favoriteBooks.includes(imageID))
              favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
            //console.log(favoriteBooks);
          }
        });

      //console.log("test");
    }
  }

  const app = {
    init: function () {
      new BooksList();
    },
  };

  app.init();
}
