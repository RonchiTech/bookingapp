import { useState, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/searchContext';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import Modal from '../../components/modal/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import './hotel.css';
import { AuthContext } from '../../context/authContext';

const Hotel = () => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const location = useLocation();
  const navigate = useNavigate();

  const { city, dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const hotelId = location.pathname.split('/')[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [data, loading, error, reFetch] = useFetch(
    `http://localhost:3000/api/v1/hotels/${hotelId}`
  );

  const timeDifference = useCallback(
    (date1, date2) => {
      if (!date1 || !date2) {
        return 1;
      }
      // console.log(firstDay, lastDay);
      // console.log(firstDay.getTime(), lastDay.getTime());
      const timeDiff = Math.abs(date1.getTime() - date2.getTime());
      // console.log(timeDiff, MILLISECONDS_PER_DAY);
      const daysDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return daysDiff;
    },
    [MILLISECONDS_PER_DAY]
  );

  // useEffect(() => {
  //   console.log('data', data);
  //   console.log('dates', dates);
  //   console.log(timeDifference(dates[0].endDate, dates[0].startDate));
  // }, [data, dates, timeDifference]);

  // const photos = [
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
  //   },
  // ];
  const days = timeDifference(dates[0]?.endDate, dates[0]?.startDate) || 1;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const onButtonClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        data.hotel && (
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove('l')}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.hotel.photos[slideNumber].src}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove('r')}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow" onClick={onButtonClick}>
                Reserve or Book Now!
              </button>
              <h1 className="hotelTitle">{data.hotel.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>
                  {data.hotel.address},{' '}
                  <strong>{data.hotel.city.toUpperCase()}</strong>
                </span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.hotel.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.hotel.cheapestPrice} at this property
                and get a free airport taxi
              </span>
              {data.hotel.photos && (
                <div className="hotelImages">
                  {data.hotel.photos.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.hotel.title}</h1>
                  <p className="hotelDesc">{data.hotel.description}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${data.hotel.cheapestPrice * days * options?.room}</b>(
                    {days} {days > 1 ? 'nights' : 'night'})
                  </h2>
                  <button onClick={onButtonClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        )
      )}
      {openModal &&
        createPortal(
          <Modal setOpenModal={setOpenModal} hotelId={hotelId} />,
          document.getElementById('portal')
        )}
    </div>
  );
};

export default Hotel;
