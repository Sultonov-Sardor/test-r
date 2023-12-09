import '../../App.css';

export const Card = ({ object }) => {
  return (
    <li>
      <div className='card'>
        <img
          className='card-img-top object-fit-cover'
          width='100%'
          height='150px'
          src={object.flags.svg}
          alt=''
        />
        <div className='card-body'>
          <h5 className='card-title'>{object.name.common}</h5>
          <p className='card-text'>Population: {object.population}</p>
          <p className='card-text'>Region: {object.region}</p>
          <p className='card-text'>Capital: {object.capital?.[0]}</p>
        </div>
      </div>
    </li>
  );
};
