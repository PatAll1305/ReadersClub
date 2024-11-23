import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchBooksByGenre } from "../../redux/books";
import "./Books.css";

export default function BooksByGenre() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { genre } = useParams();
    const booksByGenre = useSelector((state) => state.books.booksByGenre[genre]);

    useEffect(() => {
        if (!booksByGenre) {
            dispatch(thunkFetchBooksByGenre());
        }
    }, [dispatch, booksByGenre, genre]);

    if (!booksByGenre) {
        return <p>Loading...</p>;
    }

    return (
        <div className="genre-books-page">
            <h1>{genre} Books</h1>
            <div className="grid-container">
                {booksByGenre.map((book) => (
                    <div className="book-card" key={book.id} onClick={() => { navigate(`/books/${book.id}`) }}>
                        <img src={book.image_url} alt={`${book.title} cover`} />
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Description: {book.description}</p>
                        <p>Likes: {book.likes_count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
