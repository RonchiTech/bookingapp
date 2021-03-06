import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { format } from 'date-fns';
import { SearchContext } from '../../context/searchContext';

import { ACTION_TYPES } from '../../context/searchContext';

import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';

import './header.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AuthContext } from '../../context/authContext';

const Header = ({ type }) => {
  const { dispatch, openDate, destination, dates, options, openOptions } =
    useContext(SearchContext);
  // const [destination, setDestination] = useState('');
  // const [openDate, setOpenDate] = useState(false);
  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: 'selection',
  //   },
  // ]);
  // const [openOptions, setOpenOptions] = useState(false);
  // const [options, setOptions] = useState({
  //   adult: 1,
  //   children: 0,
  //   room: 1,
  // });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleOption = (name, operation) => {
    const newOption = {
      ...options,
      [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
    };
    dispatch({ type: ACTION_TYPES.SET_OPTIONS, payload: newOption });
    // setOptions((prev) => {
    //   return {
    //     ...prev,
    //     [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
    //   };
    // });
  };

  const handleSearch = () => {
    dispatch({
      type: ACTION_TYPES.NEW_SEARCH,
      payload: { destination, dates, options },
    });
    navigate('/hotels', { state: { destination, dates, options } });
  };
  const onSetOpenDate = () => {
    dispatch({ type: ACTION_TYPES.OPEN_DATE, payload: !openDate });
  };
  const onSetDestination = (e) => {
    dispatch({ type: ACTION_TYPES.SET_DESTINATION, payload: e.target.value });
  };
  const onSetDates = (item) => {
    console.log(item);
    dispatch({ type: ACTION_TYPES.SET_DATE, payload: [item.selection] });
  };
  const onOpenOptions = () => {
    dispatch({ type: ACTION_TYPES.OPEN_OPTIONS, payload: !openOptions });
  };
  return (
    <div className="header">
      <div
        className={
          type === 'list' ? 'headerContainer listMode' : 'headerContainer'
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className="headerTitle">Make your trip enjoyable</h1>
            <p className="headerDesc">
              You???ll fall in love with the home, but these destinations really
              steal our ??????
            </p>

            {!user && (
              <Link to="/">
                <button className="headerBtn">Sign in / Register</button>
              </Link>
            )}

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={onSetDestination}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={onSetOpenDate}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                  dates[0].endDate,
                  'MM/dd/yyyy'
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    // onChange={(item) => setDates([item.selection])}
                    onChange={onSetDates}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={onOpenOptions}
                  className="headerSearchText"
                >{`${options.adult} adult ?? ${options.children} children ?? ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption('adult', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('adult', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption('children', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('children', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption('room', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('room', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
