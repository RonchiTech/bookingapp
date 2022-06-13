import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

import './propertyList.css';

const propertyType = {
  hotels:
    'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
  apartments:
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
  resorts:
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
  villas:
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
  cabins:
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg',
};

const PropertyList = () => {
  const [data, loading, error] = useFetch(
    'http://localhost:3000/api/v1/hotels/countByType'
  );
  useEffect(() => {
    console.log(data);
  },[data]);
  return (
    <div className="pList">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        data &&
        data.map(({ type, count }) => {
          return (
            <div className="pListItem" key={type}>
              <img src={propertyType[type]} alt={type} className="pListImg" />
              <div className="pListTitles">
                <h1>{type}</h1>
                <h2>
                  {count} {type}
                </h2>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PropertyList;
