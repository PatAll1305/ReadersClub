import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchBooksByGenre, thunkFetchUserLikedBooks, thunkFetchUserDislikedBooks } from '../../redux/books.js';
import './HomePage.css'
import { restoreCSRF } from '../../redux/csrf.js';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.session.user);
    const booksByGenre = useSelector((state) => state.books.booksByGenre);
    const userLikedBooks = useSelector((state) => state.books.userLikedBooks);
    const userDislikedBooks = useSelector((state) => state.books.userDislikedBooks);

    if (!user) restoreCSRF();

    useEffect(() => {
        dispatch(thunkFetchBooksByGenre());
        if (user) {
            dispatch(thunkFetchUserLikedBooks(user.id));
            dispatch(thunkFetchUserDislikedBooks(user.id));
        }
    }, [dispatch, user]);

    return (
        <div className="homepage">
            {user && userLikedBooks?.length > 0 && (
                <div className="liked-books">
                    <h2>Your Liked Books</h2>
                    <div className="book-grid">
                        {(userLikedBooks)?.map((likedBook) => (
                            <div key={likedBook?.id} className="book-card" onClick={() => navigate(`/books/${likedBook?.book?.id}`)}>
                                <img className='book-card-img' src={likedBook?.book?.image_url} alt={`${likedBook?.book?.title} cover`} />
                                <h3 className='book-title'>{likedBook?.book?.title}</h3>
                                <p className='book-author'>By: {likedBook?.book?.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {Object.entries(booksByGenre)?.map(([genre, books]) => {
                const filteredBooks = user
                    ? books?.filter((book) =>
                        !userLikedBooks?.find((likedBook) => likedBook?.book?.id === book.id) &&
                        !userDislikedBooks?.find((dislikedBook) => dislikedBook?.book?.id === book.id) &&
                        book?.status !== 'pending'
                    )
                    : books;
                if (!filteredBooks.length) return null
                return (
                    <div key={genre} className="genre-section">
                        <h3>{genre}</h3>
                        <div className="book-grid">
                            {filteredBooks?.map((book) => (
                                <div key={book.id} className="book-card" onClick={() => navigate(`/books/${book.id}`)}>
                                    <img className='book-card-img' src={book?.image_url} alt={book.title} />
                                    <h3 className='book-title'>{book.title}</h3>
                                    <p className='book-author'>By: {book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            <div>
                <h2 className="book-title">{"Can't find a book?"}</h2>
                <button className='create-book-button' onClick={() => navigate('/books/create')}>Add it to our collection!</button>
            </div>
        </div>
    );
}
