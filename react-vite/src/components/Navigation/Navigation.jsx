import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { thunkFetchBooks } from "../../redux/books";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const booksByGenre = useSelector((state) => state.books?.booksByGenre)

  useEffect(() => {
    dispatch(thunkFetchBooks());
  }, [dispatch]);


  console.log(booksByGenre)

  return (
    <div className="navbar">
      <ul className="nav-links">
        <li id='logo' onClick={() => navigate('/')}>
          ReadersClub
        </li>
        <li id='profile-button'>
          <ProfileButton />
        </li>
      </ul>
      <div className="genres">
        {
          Object.keys(booksByGenre).map((genre) => {
            return (
              <div className='genre' onClick={() => { navigate(`/books/${genre}`) }} key={genre} >{genre}</div>
            )
          })

        }
      </div>
    </div >
  );
}

export default Navigation;
