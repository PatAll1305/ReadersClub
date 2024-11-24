import { useNavigate, useParams } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { thunkFetchBooksByGenre } from "../../redux/books";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { genre } = useParams();
  const genreParam = genre;

  const booksByGenre = useSelector((state) => state.books?.booksByGenre)

  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    dispatch(thunkFetchBooksByGenre());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="nav-links">
        <div id='logo' onClick={() => navigate('/')}>
          ReadersClub
        </div>
        <div id='search-bar'>
          <FaSearch onClick={() => { window.alert('Feature coming soon!') }} />
          <input type='text' className='search-bar' disabled={disabled} placeholder='Search for your favorite book!' onClick={() => {
            setDisabled(true)
            window.alert('Feature coming soon!')
          }}>
          </input>
        </div>
        <div id='profile-button'>
          <ProfileButton />
        </div>
      </div>
      <h1 id='back-button' onClick={() => navigate(-1)}>{'< Back'}</h1>
      <div className="genres">
        {
          Object.keys(booksByGenre).map((genre) => {
            const style = genreParam === genre ? { "textDecoration": "underline", "color": "red", "fontWeight": 1000 } : null
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
