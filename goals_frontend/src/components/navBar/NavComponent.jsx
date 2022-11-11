import React from "react";
import { FiLogIn, FiUser, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout , reset} from "../../Redux/features/authSlicer";

const NavComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset())
    navigate("/");
  };
  return (
    <div className="nav_container">
      <Link to="/" style={{textDecoration:"none" , color:"black"}}>
        <div className="nav_logo">
          <h3>Goals App</h3>
        </div>
      </Link>
      <ul className="nav_items">
      {user ? (
          <li >
            <button onClick={onLogout} className="nav-item-icon">
              <FiLogOut />
              logout
            </button>
          </li>
      ) : (
          <>
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
          </>
      )}
      </ul>
    </div>
  );
};

export default NavComponent;
