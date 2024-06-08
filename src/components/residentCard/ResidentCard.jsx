import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './residentCard.css';
import useCircleColor from '../../hooks/useCircleColor';

const ResidentCard = ({info}) => {

  const [resident, getResident] = useFetch();
  
  useEffect(() => {
    getResident(info);
    }, []);
    
  const circleColor = useCircleColor(resident?.status);

  return (
    <article className='residentCard'>
      <figure className='residentCard__img'>
        <img src={resident?.image} alt={`${resident?.name}-${resident?.id}`} />
        <figcaption className='residentCard__status'>
          <div className='residentCard__circle' style={ {backgroundColor: circleColor} }></div>
          <span>{resident?.status}</span>
        </figcaption>
      </figure>
      <h2 className='residentCard__name'>{resident?.name}</h2>
      <hr className="centered-hr" />
      <ul className='residentCard__list'>
        <li className='residentCard__item'><span>Specie</span><span>{resident?.species}</span></li>
        <li className='residentCard__item'><span>Origin</span><span>{resident?.origin.name}</span></li>
        <li className='residentCard__item'><span>Episodies where appear </span><span>{resident?.episode.length}</span></li>
      </ul>
    </article>
  )
}

export default ResidentCard
