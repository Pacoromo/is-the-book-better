//libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//components
import Results from "./Results";
import Modal from "./Modal";

//assets
import noBookPic from "./assets/noBook.jpg";
import noMoviePic from "./assets/noMovie.jpg";
import Loader from "./Loader";

const SearchResults = () => {

  //STATES FOR HANDLING DATA RETRIEVED FROM APIS

  const [movieData, setMovieData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const urlParamsValue = useParams();
  const searchQuery = urlParamsValue.title;
  const API_KEY_BOOKS = process.env.BOOKS_API_KEY;


  //USE EFFECT FOR MOUNTING GOOGLE BOOKS AND MOVIE DB API DATA
  useEffect(() => {
    setLoading(true);
    async function bookPromise() {
      try {
        const bookObject = await axios({
          url: "https://www.googleapis.com/books/v1/volumes",
          params: {
            q: searchQuery,
            key: API_KEY_BOOKS,

          },
        });
        return bookObject;
      } catch (error) {
        setTimeout(() => setLoading(false), 2000);
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
          url: `https://proxy.junocollege.com/https://api.themoviedb.org/3/search/movie`,
          params: {
            api_key: "372d3f4f5198c56ab56f69a5848e02d3",
            query: searchQuery,
          },
        })
        return movieData;
      } catch (error) {
        setTimeout(() => setLoading(false), 2000);
        setMessage2(
          "The Movie Database API is currently unavailable. Please try again later."
        );
        setModal(true);
        return error;
      }
    } // end of use effect

    Promise.all([bookPromise(), moviePromise()]).then((values) => {

      //code below leaves 2000ms for loading screen, then filters movies and books that match the query string. Movie and book titles are converted to lowercase comparision. Additional if/else statements ensure object properties with missing information are given placeholders for display. 

      setTimeout(() => setLoading(false), 2000);
      const newBookState = values[0].data.items
        .map((book) => {
          if (!book.volumeInfo.imageLinks) {
            book.volumeInfo.imageLinks = {};
            book.volumeInfo.imageLinks.thumbnail = noBookPic;
          }
          if (!book.volumeInfo.authors) {
            book.volumeInfo.authors = [];
            book.volumeInfo.authors[0] = "Not listed";
          }
          if (!book.volumeInfo.averageRating) {
            book.volumeInfo.averageRating = 0;
          }
          if (!book.volumeInfo.publishedDate) {
            book.volumeInfo.publishedDate = "Not listed";
          }
          if (!book.volumeInfo.description) {
            book.volumeInfo.description = "No description available."
          }
          if (!book.volumeInfo.subtitle) {
            book.volumeInfo.subtitle = ""
          }
          return book;
        }).sort((a, b) => {//Sort alphabetically
          const nameA = `${a.volumeInfo.title.toUpperCase()}${a.volumeInfo.subtitle.toUpperCase()}`; // ignore upper and lowercase
          const nameB = `${b.volumeInfo.title.toUpperCase()}${b.volumeInfo.subtitle.toUpperCase()}`; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
      setBookData(newBookState);

      const newMovieState = values[1].data.results
        .map((movie) => {
          if (!movie.poster_path) {
            movie.poster_path = noMoviePic;
          } else {
            movie.poster_path =
              `https://image.tmdb.org/t/p/w200/` + movie.poster_path;
          }
          if (!movie.release_date) {
            movie.release_date = "Not listed";
          }
          if (!movie.vote_average) {
            movie.vote_average = 0;
          }
          if (!movie.overview) {
            movie.overview = "No synopsis available."
          }
          return movie;
        })
        .sort((a, b) => {//Sort alphabetically
          const nameA = a.title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
      setMovieData(newMovieState);
      setShowMessage(true);
    });
  }, [API_KEY_BOOKS, searchQuery]); //end of use effect


  //LOADER COMPONENT WHICH RUNS FOR 2000MS ON PAGE LOAD 
  if (loading) {
    return <Loader />
  }

  return (
    <section className="search-results">
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
      /> {/* modal displays in the event either API cannot be called */}
    </section>
  );
};

export default SearchResults;
