import { Link } from 'react-router-dom';
import './searchItem.css';

const SearchItem = ({
  _id,
  name,
  distance,
  description,
  cheapestPrice,
  title,
  photos,
  rating,
}) => {
  return (
    <div className="searchItem">
      <img src={photos[0]} alt={name} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{title}</span>
        <span className="siFeatures">{description}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${_id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
