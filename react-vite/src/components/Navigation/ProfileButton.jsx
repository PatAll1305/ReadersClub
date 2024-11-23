import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector(state => state.session.user)

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.alert("Feature Coming Soon...");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div onClick={toggleMenu} className='nav-bar-dropdown'>
      <FaBars className='hamburger' />
      {user ? (
        <div className='username-profile'>
          <span>{user.username[0].toUpperCase()}</span>
        </div>
      ) :
        <FaUserCircle />

      }
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li onClick={() => navigate(`/users/${user?.id}`)}>Profile</li>
            <li onClick={handleOnClick}>Recommended</li>
            <li onClick={handleOnClick}>Clubs</li>
            <div className='divider-horizontal'></div>
            <li onClick={handleOnClick}>Messages</li>
            <div className='divider-horizontal'></div>
            <spam>                              </spam>
            <div className='divider-horizontal'></div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) :
          <>
            <li onClick={() => navigate('/login')}>
              <button >Log In</button>
            </li>
            <li onClick={() => navigate('/signup')} >
              <button >Sign Up</button>
            </li>
          </>
        }
      </ul>
    </div >
  );
}

export default ProfileButton;