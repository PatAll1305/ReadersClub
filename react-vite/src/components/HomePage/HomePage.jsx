import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchBooks, thunkFetchUserLikedBooks } from '../../redux/books.js';
import './HomePage.css'
import { restoreCSRF } from '../../redux/csrf.js';

export default function HomePage() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const booksByGenre = useSelector((state) => state.books.booksByGenre);
    const userLikedBooks = useSelector((state) => state.books.userLikedBooks);

    if (!user) restoreCSRF()

    useEffect(() => {
        dispatch(thunkFetchBooks());
        if (user) {
            dispatch(thunkFetchUserLikedBooks(user.id));
        }
    }, [dispatch, user]);

    return (
        <div className="homepage">
            {user && userLikedBooks?.length > 0 && (
                <div className="liked-books">
                    <h2>Your Liked Books</h2>
                    <div className="book-grid">
                        {(userLikedBooks)?.map((likedBook) => (
                            <div key={likedBook?.book_id} className="book-card">
                                <img src={likedBook?.book.image_url} alt={`${likedBook?.book.title} cover`} />
                                <h3 className='book-title'>{likedBook?.book.title}</h3>
                                <p className='book-author'>{likedBook?.book.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {Object.entries(booksByGenre)?.map(([genre, books]) => {
                const filteredBooks = user
                    ? books?.filter((book) =>
                        userLikedBooks?.every((likedBook) => likedBook.book.id !== book.id)
                    )
                    : books;

                return (
                    <div key={genre} className="genre-section">
                        <h3>{genre}</h3>
                        <div className="book-grid">
                            {filteredBooks?.map((book) => (
                                <div key={book.id} className="book-card">
                                    <img src={book.image_url} alt={book.title} />
                                    <h3>{book.title}</h3>
                                    <p>By: {book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

