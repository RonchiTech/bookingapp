import { useState, useContext, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

import { SearchContext } from '../../context/searchContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './modal.css';
import axios from 'axios';

const Modal = ({ setOpenModal, hotelId }) => {
  const [data, loading, error] = useFetch(
    `http://localhost:3000/api/v1/hotels/rooms/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSelectRoomHandler = (e) => {
    const isRoomChecked = e.target.checked;
    const roomValue = e.target.value;
    setSelectedRooms(
      isRoomChecked
        ? [...selectedRooms, roomValue]
        : selectedRooms.filter((room) => room !== roomValue)
    );
  };

  useEffect(() => {
    console.log(selectedRooms, dates);
  }, [selectedRooms, dates]);

  const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const reservedDates = getDateRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    console.log(roomNumber);
    //If one of the roomNumber's unavailable date exists in reservedDates that means it is already taken therefore cannot be reserved!
    const isReserved = roomNumber.unavailableDate.some((date) =>
      reservedDates.includes(new Date(date).getTime())
    );
    //So, if isReserved means it is not available so reverse the logic (!isReserve) = return isAvailable = false
    return !isReserved;
  };

  const onReserveHandler = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const response = axios.put(
            `http://localhost:3000/api/v1/rooms/availability/${roomId}`,
            { dates: reservedDates }
          );
          return response;
        })
      );
      setOpenModal(false);
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={onCloseModal}
        />
        <span>Select your Rooms:</span>
        {data.roomList &&
          data.roomList.map((room) => {
            const {
              _id,
              title,
              description,
              maximumCapacity,
              price,
              roomNumbers,
            } = room;
            return (
              <div className="rItem" key={_id}>
                <div className="rInfo">
                  <div className="rTitle">{title}</div>
                  <div className="rDesc">{description}</div>
                  <div className="rMax">
                    Maximum Capacity:
                    <strong>{maximumCapacity}</strong>
                  </div>
                  <div className="rPrice">{price}</div>
                </div>
                <div className="rSelectRooms">
                  {roomNumbers.map((roomNumber) => {
                    return (
                      <div className="room" key={roomNumber._id}>
                        <label htmlFor={roomNumber._id}>
                          {roomNumber.number}
                        </label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          id={roomNumber._id}
                          onChange={onSelectRoomHandler}
                          disabled={!isAvailable(roomNumber)}
                          className={!isAvailable(roomNumber) && '--disable'}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        <button
          className="rButton"
          onClick={onReserveHandler}
          disabled={!selectedRooms.length}
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Modal;
