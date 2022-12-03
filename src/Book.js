const Book = ({ bookArray, setBook, setShowMovie, setShowBook }) => {

    //ONCE USER CLICKS ON A BOOK, THIS FUNCTION CALLS THE SETFUNCTIONS OF STATES IN PARENT COMPONENT RESULTS.JS. 
    const handleClick = (bookSelection) => {
        setShowMovie(true);
        setShowBook(false);
        setBook(bookSelection);
    };

    //THIS COMPONENT RETURNS A LIST OF BOOKS FROM SEARCH TERMS TO BE SELECTED BY USER 
    return (
        <section className="book-display">
            <div className="wrapper">
                <h2>Please Select a Book</h2>
                <p>Your book is not listed?. Try a more specific search</p>
                <ul className="book-pick">
                    {bookArray.map((bookObj) => {

                        return (
                            <li key={bookObj.id}>
                                <button
                                    onClick={() => {
                                        handleClick(bookObj);
                                    }}
                                    className="select-book-btn">
                                    <img
                                        src={bookObj.volumeInfo.imageLinks.thumbnail}
                                        alt={bookObj.volumeInfo.title} />
                                </button>
                                <button className="select" onClick={() => {
                                    handleClick(bookObj);
                                }}>Select</button>

                                <p className="book-title">{bookObj.volumeInfo.title} {bookObj.volumeInfo.subtitle === "" ? "" : "-"} {bookObj.volumeInfo.subtitle}</p>
                                <p className="book-author">
                                    Author(s): {bookObj.volumeInfo.authors.join(", ")}
                                </p>
                                <p className="book-rating">
                                    Rating: {bookObj.volumeInfo.averageRating * 2}
                                </p>
                                <p className="book-release">
                                    Release Date: {bookObj.volumeInfo.publishedDate}
                                </p>
                                <p className="book-description">
                                    Summary: {bookObj.volumeInfo.description}
                                </p>

                                <button className="more-info">
                                    <a href={bookObj.volumeInfo.previewLink} target="_blank" rel="noreferrer">Full Info</a>
                                </button>
                            </li>
                        ); //second return brackets end
                    })} {/* bookArray.map brackets end */}
                </ul>
            </div>{/* wrapper div end */}
        </section>
    ); //first return brackets end
}

export default Book;
