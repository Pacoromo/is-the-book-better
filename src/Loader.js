import React from 'react'
import loading from "./assets/loadingGif.gif"

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="gif-container">
        <img src={loading} className="loading" alt='animated book loading screen' />
      </div>
    </div>
  )
}

export default Loader;