import { useState, useEffect, useRef } from 'react';
import { Card } from './components/Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import { SingleCard } from './components/SingleCard/SingleCard';
import Header from './components/Header/Header';
import './App.css';
function App() {
  const elInput = useRef();
  const elSelect = useRef();
  document.body.classList = localStorage.getItem('theme');

  const [country, setCountry] = useState({
    isLoading: false,
    data: [],
    isError: '',
  });

  useEffect(() => {
    setCountry({
      ...country,
      isLoading: true,
    });
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({
            ...country,
            isLoading: false,
            data: data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          setCountry({
            ...country,
            isLoading: false,
            data: [],
            isError: err.message,
          });
        }
      });
  }, []);

  const handleChange = () => {
    fetch('https://restcountries.com/v3.1/region/' + elSelect.current.value)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({
            isLoading: false,
            data: data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          setCountry({
            ...country,
            isLoading: false,
            data: [],
            isError: err.message,
          });
        }
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (elInput.current.value !== '') {
      fetch('https://restcountries.com/v3.1/name/' + elInput.current.value)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCountry({
              isLoading: false,
              data: data,
            });
          }
        })
        .catch((err) => {
          setCountry({
            isLoading: false,
            data: [],
            isError: err.message,
          });
        });
    } else {
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCountry({
              ...country,
              isLoading: false,
              data: data,
            });
          }
        })
        .catch((err) => {
          if (err) {
            setCountry({
              ...country,
              isLoading: false,
              data: [],
              isError: err.message,
            });
          }
        });
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/name/:name'
          element={<SingleCard />}
        />
        <Route
          path='/'
          element={
            <main className='pt-5'>
              <section>
                {' '}
                <div className='container py-5'>
                  <form
                    onSubmit={handleSubmit}
                    className='mb-5 d-flex justify-content-between'
                  >
                    <input
                      type='text'
                      className='w-25 form-control'
                      placeholder='Search for a country…'
                      ref={elInput}
                    />
                    <select
                      ref={elSelect}
                      className='form-select w-25'
                      aria-label='Default select example'
                      onChange={handleChange}
                    >
                      <option
                        disabled
                        selected
                        value='sortby'
                      >
                        Sort by region
                      </option>
                      <option value='Africa'>Africa</option>
                      <option value='America'>America</option>
                      <option value='Asia'>Asia</option>
                      <option value='Europe'>Europe</option>
                      <option value='Oceania'>Oceania</option>
                    </select>
                  </form>
                  {country.isLoading ? <h1>Loading...</h1> : ''}
                  {country.isError ? <h1>{country.isError}</h1> : ''}
                  {country.data.length ? (
                    <ul className='row gy-4 justify-content-center list-unstyled'>
                      {country.data.map((el) => (
                        <Link
                          key={el.name.common}
                          className='col-lg-3 text-decoration-none text-black'
                          to={`/name/${el.name.common}`}
                        >
                          <Card object={el} />
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
              </section>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
