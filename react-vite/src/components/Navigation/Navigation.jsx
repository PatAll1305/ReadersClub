import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { thunkFetchBooksByGenre } from "../../redux/books";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const booksByGenre = useSelector((state) => state.books?.booksByGenre)

  useEffect(() => {
    dispatch(thunkFetchBooksByGenre());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="nav-links">
        <div id='logo' onClick={() => navigate('/')}>
          ReadersClub
        </div>
        <div id='profile-button'>
          <ProfileButton />
        </div>
      </div>
      <h1 id='back-button' onClick={() => navigate(-1)}>{'< Back'}</h1>
      <div className="genres">
        {
          Object.keys(booksByGenre).map((genre) => {
            const style = window.location.pathname.split('/')[-1] === genre.toLowerCase() ? { "text-decoration": "underline", "color": "green" } : null
            return (
              <button className='genre' style={style} onClick={() => { navigate(`/books/genre/${genre}`) }} key={genre} >{genre}</button>
            )
          })
        }
      </div>
    </div >
  );
}

export default Navigation;
