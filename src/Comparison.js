const Comparison = ({ selectedBook, selectedMovie }) => {

  //functions to standardize API ratings to a number out of 10
  const bookRating = selectedBook.volumeInfo.averageRating * 2;
  const movieRating = selectedMovie.vote_average;

  //THIS COMPONENT COMPARES THE SELECTED BOOK AND MOVIE, THEN DECLARES A WINNER OR TIE BASED ON STANDARDIZED RATINGS
  return (

    <section className="comparison">

      <div className="wrapper">
        <div className="decision">
          {bookRating > movieRating ? (
            <h3 className="outcome">The Book is better</h3>
          ) : bookRating < movieRating ? (
            <h3 className="outcome">The Movie is better</h3>
          ) : (
            <h3 className="outcome">It's a tie</h3>
          )}
        </div>

        <div className="comparison-container">

          {/* the below code assigns book-won class only if book rating is superior or tie*/}
          <div className={`book-container ${bookRating >= movieRating ? "book-won" : "book-lost"} `}>
            <div className="book-image-container">
              <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt={selectedBook.volumeInfo.title} />
            </div>{/* book-image-container div end */}

            <div className="book-info-container">
              <p>{selectedBook.volumeInfo.title}</p>
              <p>Author(s): {selectedBook.volumeInfo.authors.join(", ")}</p>
              <p>Published Date: {selectedBook.volumeInfo.publishedDate}</p>
              <p>Average Reader Rating: {bookRating}/10</p>
            </div>{/* book-info-container div end */}
          </div>{/* book-container div end */}

          {/* the below code assigns movie-won class only if movie rating is superior pr tie*/}
          <div className={`movie-container ${bookRating <= movieRating ? "movie-won" : "movie-lost"}`}>
            <div className="movie-image-container">
              <img src={selectedMovie.poster_path} alt={selectedMovie.title} />
            </div>{/* movie-image-container div end */}

            <div className="movie-info-container">
              <p>{selectedMovie.title}</p>
              <p>Released: {selectedMovie.release_date}</p>
              <p>Average Viewer Rating: {movieRating}/10</p>
            </div>{/* movie-info-container div end */}
          </div>{/* movie-container div end */}

        </div>{/* comparision-container div end */}
      </div>{/* wrapper div end */}
    </section>
  )
};

export default Comparison;
