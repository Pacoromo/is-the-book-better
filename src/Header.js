import Search from './Search'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <Link to='/'>
            <h1>Is the book better?</h1>
          </Link>
          <Search />
        </div>
      </div>
    </header>

  )
}

export default Header;
