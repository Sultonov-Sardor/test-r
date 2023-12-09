import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './SingleCard.scss';
export const SingleCard = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [card, setCard] = useState({});
  const getCard = () => {
    axios
      .get('https://restcountries.com/v3.1/name/' + name)
      .then((data) => {
        if (data.status === 200) {
          setCard(data.data?.[0]);
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(card);

  useEffect(() => {
    getCard();
  }, []);

  return (
    <>
      <main className=''>
        <section className='hero'>
          <div className='container pt-5'>
            <button
              className='my-5 btn btn-danger'
              onClick={() => navigate(-1)}
            >
              BACK
            </button>
            <div className='row '>
              <div className='img-left col-md-6 col-12 d-flex align-items-baseline '>
                <img
                  style={{ maxWidth: '559px' }}
                  src={card.flags?.svg}
                  width='100%'
                  alt='...'
                />
              </div>
              <div className='text-right col-md-6 col-12 my-auto '>
                <h5 className='fs-3'>{card.name?.common}</h5>
                <ul className='row list-unstyled'>
                  <li className='col-5'>
                    <div className=''>
                      <p className=''>
                        <strong>Native Name:</strong>
                        {' ' + card.name?.nativeName?.eng?.common}
                      </p>
                      <p className=''>
                        <strong>Population:</strong>
                        {' ' + card.population}
                      </p>
                      <p className=''>
                        <strong>Region:</strong>
                        {' ' + card.region}
                      </p>
                      <p className=''>
                        <strong>Sub Region:</strong>
                        {' ' + card.subregion}
                      </p>
                      <p className=''>
                        <strong>Capital:</strong>
                        {' ' + card.capital?.[0]}
                      </p>
                      <p>
                        <strong>Top Level Domain:</strong> {card.tld?.[0]}
                      </p>
                    </div>
                  </li>
                </ul>
                <div></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
