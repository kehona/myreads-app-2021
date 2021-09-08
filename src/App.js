import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'

const BooksApp = () => {

  useEffect(() => {

    BooksAPI.getAll()
      .then(data => 
        {
          console.log(data)
          setBooks(data)
        }
      );
  }, [])

 

  /* TODO: Instead of using this state variable to keep track of which page
  * we're on, use the URL in the browser's address bar. This will ensure that
  * users can use the browser's back and forward buttons to navigate between
  * pages, as well as provide a good URL they can bookmark and share.
  */
  const [showSearchPage, setShowSearchPage] = useState(false);

  const [books, setBooks] = useState([])

  const updateBookShelf = (book, whereTo) => {
    console.log(book)
    console.log(whereTo)
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo).then(data => console.log(data));
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => setShowSearchPage(false)}>Close</button>
            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input type="text" placeholder="Search by title or author" />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelves books={books} updateBookShelf={updateBookShelf} />
          </div>
          <div className="open-search">
            <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default BooksApp
