import { Link } from 'react-router-dom';
import './Header.scss';
import '../../App.css';
function Header() {
  document.body.classList = localStorage.getItem('theme');

  return (
    <header>
      <nav className='navbar'>
        <div className='container d-block'>
          <ul className='navbar__list list-unstyled m-0'>
            <li className='title__item'>
              <Link
                className='text-decoration-none'
                to='/'
              >
                Where in the world?
              </Link>
            </li>
            <li className='mode__item'>
              <button
                to='/'
                onClick={() => {
                  if (!localStorage.getItem('theme')) {
                    localStorage.setItem('theme', 'dark');
                    document.body.classList = localStorage.getItem('theme');
                  } else {
                    localStorage.removeItem('theme');
                    document.body.classList = localStorage.getItem('');
                  }
                }}
                className='mode__button'
              >
                Dark Mode
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
