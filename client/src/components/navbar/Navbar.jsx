import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">seaBcD</span>
        </Link>
        <div className="navItems">
          {user ? (
            <div>{user.username}</div>
          ) : (
            <Fragment>
              <button className="navButton">Register</button>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
