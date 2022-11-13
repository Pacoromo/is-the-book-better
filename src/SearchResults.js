import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Results from "./Results";
import Modal from "./Modal";
import noBookPic from "./assets/noBook.jpg";
import noMoviePic from "./assets/noMovie.jpg";

const SearchResults = () => {
  const [movieData, setMovieData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [modal, setModal] = useState(false);

  const urlParamsValue = useParams();
  const searchQuery = urlParamsValue.title;
  const API_KEY_BOOKS = process.env.BOOKS_API_KEY;
  // const API_KEY_MOVIE = process.env.MOVIE_API_KEY

  useEffect(() => {
    async function bookPromise() {
      try {
        const bookObject = await axios({
          url: "https://www.googleapis.com/books/v1/volumes/",
          params: {
            q: searchQuery,
            key: API_KEY_BOOKS,
            language: "en",
          },
        });
        return bookObject;
      } catch (error) {
        setMessage1(
          "The Google Books API is currently unavailable. Please try again later."
        );
        setModal(true);
        return error;
      }
    }

    async function moviePromise() {
      try {
        const movieData = await axios({
          url: `https://api.themoviedb.org/3/search/movie/`,
          params: {
            api_key: "372d3f4f5198c56ab56f69a5848e02d3",
            query: searchQuery,
          },
        });
        return movieData;
      } catch (error) {
        setMessage2(
          "The Movie Database API is currently unavailable. Please try again later."
        );
        setModal(true);
        return error;
      }
    }

    Promise.all([bookPromise(), moviePromise()]).then((values) => {
      const newBookState = values[0].data.items
        .filter(
          (book) =>
            book.volumeInfo.title.toLowerCase() === searchQuery.toLowerCase()
        )
        .map((book) => {
          if (!book.volumeInfo.averageRating) {
            book.volumeInfo.averageRating = 0;
          }
          if (!book.volumeInfo.imageLinks) {
            book.volumeInfo.imageLinks = {};
            book.volumeInfo.imageLinks.thumbnail = noBookPic;
          }
          return book;
        });
      setBookData(newBookState);
      const newMovieState = values[1].data.results
        .filter(
          (movie) => movie.title.toLowerCase() === searchQuery.toLowerCase()
        )
        .map((movie) => {
          if (!movie.poster_path) {
            movie.poster_path = noMoviePic;
          } else {
            movie.poster_path =
              `https://image.tmdb.org/t/p/w200/` + movie.poster_path;
          }
          return movie;
        });
      setMovieData(newMovieState);
      setShowMessage(true);
    });
  }, [API_KEY_BOOKS, searchQuery]);

  return (
    <section className="searchResults">
      <Results
        bookArray={bookData}
        movieArray={movieData}
        showMessage={showMessage}
      />
      <Modal
        modal={modal}
        setModal={setModal}
        message1={message1}
        message2={message2}
      />
    </section>
  );
};

export default SearchResults;
