import React from "react";
import { FiLogIn, FiUser, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/features/authSlicer";

const NavComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="nav_container">
      <Link to="/" style={{textDecoration:"none" , color:"black"}}>
        <div className="nav_logo">
          <h3>Goals App</h3>
        </div>
      </Link>
      {user ? (
        <ul className="nav_items">
          <li onClick={onClick}>
            <Link to="/login" className="nav-item-icon">
              <FiLogOut />
              logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav_items">
          <li>
            <Link to="/regist" className="nav-item-icon">
              <FiUser />
              Regist
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-item-icon">
              <FiLogIn />
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavComponent;
