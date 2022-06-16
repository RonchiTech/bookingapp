import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.css';

const cityImages = {
  berlin:
    'https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=',
  london:
    'https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=',
  manila:
    'https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=',
};

const Featured = () => {
  const [data, loading, error] = useFetch(
    'http://localhost:3000/api/v1/hotels/countByCity?cities=berlin,london,manila'
  );

  return (
    <div className="featured">
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <>
          {data.hotelCount &&
            data.hotelCount.map(({ city, count }) => {
              return (
                <div className="featuredItem" key={city}>
                  <img
                    src={cityImages[city]}
                    alt={city}
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1 className='cityName'>{city}</h1>
                    <h2>{count} properties</h2>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Featured;
