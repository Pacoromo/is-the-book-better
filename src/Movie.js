const Movie = ({ movieArray, setMovie, setShowMovie, setShowComparison }) => {

    //ONCE USER CLICKS ON A MOVIE, THIS FUNCTION CALLS THE SETFUNCTIONS OF STATES IN PARENT COMPONENT RESULTS.JS.
    const handleClick = ((movieSelection) => {
        setMovie(movieSelection);
        setShowMovie(false);
        setShowComparison(true);
    })

    //THIS COMPONENT RETURNS A LIST OF MOVIES FROM SEARCH TERMS TO BE SELECTED BY USER 
    return (
        <section className="movie-display">
            <div className="wrapper">
                <h2>Please Select a Movie</h2>
                <ul className="movie-pick">
                    {movieArray.map((movieObj) => {

                        return (
                            <li key={movieObj.id}>
                                <button onClick={() => { handleClick(movieObj) }} className="select-movie-btn"><img src={movieObj.poster_path} alt={movieObj.title} /></button>
                                

                                <p className="movie-title">{movieObj.title}</p>
                                <p className="release-date">Released: {movieObj.release_date}</p>
                                <p className="average-rating">Average Viewer Rating: {movieObj.vote_average}/10</p>
                                <p className="synopsis">Synopsis: {movieObj.overview}</p>

                                <button className="select" onClick={() => {
                                        handleClick(movieObj);
                                    }}>Select</button>
                            </li>
                        ) // second return brackets end
                    })}{/* movie.array brackets end */}
                </ul>
            </div> {/* div wrapper end */}
        </section>
    )
}

export default Movie;