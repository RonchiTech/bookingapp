import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import SearchItem from '../../components/searchItem/SearchItem';
import './list.css';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location?.state?.destination ?? ''
  );
  const [dates, setDates] = useState(
    location?.state?.dates ?? [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]
  );
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(
    location?.state?.options ?? {
      adult: 1,
      children: 0,
      room: 1,
    }
  );
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const url = `http://localhost:3000/api/v1/hotels?${
    destination && 'city=' + destination}&min=${minValue || 1}&max=${maxValue || 9999}`;

  const [data, loading, error, reFetch] = useFetch(url);
  const setNewDestination = (e) => {
    setDestination(e.target.value);
  };
  const setMinValueHandler = (e) => {
    setMinValue(Number(e.target.value));
  };
  const setMaxValueHandler = (e) => {
    setMaxValue(Number(e.target.value));
  };
  const onSearchHandler = () => {
    console.log(minValue, maxValue);
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={setNewDestination}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={setMinValueHandler}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={setMaxValueHandler}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={onSearchHandler}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              data.hotels &&
              data.hotels.map((hotel) => {
                return <SearchItem key={hotel._id} {...hotel} />;
              })
            )}

            {/* <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
