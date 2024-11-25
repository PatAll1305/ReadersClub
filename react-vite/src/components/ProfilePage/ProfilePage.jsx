import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkFetchUserLikedBooks, thunkFetchUserDislikedBooks, thunkFetchBooks } from '../../redux/books.js';
import './ProfilePage.css';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    const userLikedBooks = useSelector((state) => state.books.userLikedBooks);
    const userDislikedBooks = useSelector((state) => state.books.userDislikedBooks);
    const allBooks = useSelector((state) => state.books.all);
    const user = useSelector((state) => state.session.user);

    const allBooksArray = Object.values(allBooks);

    const uploadedBooks = allBooksArray.filter((book) => book.user_id === +userId && book.status === 'uploaded');
    const pendingBooks = allBooksArray.filter((book) => book.user_id === +userId && book.status === 'pending');

    useEffect(() => {
        dispatch(thunkFetchUserLikedBooks(userId));
        dispatch(thunkFetchUserDislikedBooks(userId));
        dispatch(thunkFetchBooks());
    }, [dispatch, userId]);

    return (
        <div className="profile-page">
            <h1>Hello {user?.username}</h1>
            <p>{`You've been with us since ${String(user?.created_at).split(' ', 4)[2]}, ${String(user?.created_at).split(' ', 4)[3]}`}</p>
            {userLikedBooks?.length > 0 && (
                <div className="liked-books-section">
                    <h2>Your Liked Books</h2>
                    <div className="profile-book-grid">
                        {userLikedBooks?.map((likedBook) => (
                            <div
                                key={likedBook?.book?.id}
                                className="profile-book-card"
                                onClick={() => navigate(`/books/${likedBook?.book?.id}`)}
                            >
                                <img className="profile-book-card-img" src={likedBook?.book?.image_url} alt={likedBook?.book?.title} />
                                <h3 className="profile-book-title">{likedBook?.book?.title}</h3>
                                <p className="profile-book-author">By: {likedBook?.book?.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {userDislikedBooks?.length > 0 && (
                <div className="disliked-books-section">
                    <h2>Your Disliked Books</h2>
                    <div className="profile-book-grid">
                        {userDislikedBooks?.map((dislikedBook) => (
                            <div
                                key={dislikedBook.book.id}
                                className="profile-book-card"
                                onClick={() => navigate(`/books/${dislikedBook.book.id}`)}
                            >
                                <img className="profile-book-card-img" src={dislikedBook.book.image_url} alt={dislikedBook.book.title} />
                                <h3 className="profile-book-title">{dislikedBook.book.title}</h3>
                                <p className="profile-book-author">By: {dislikedBook.book.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {uploadedBooks?.length > 0 && (
                <div className="uploaded-books-section">
                    <h2>Books You Uploaded</h2>
                    <div className="profile-book-grid">
                        {uploadedBooks?.map((book) => (
                            <div
                                key={book.id}
                                className="profile-book-card"
                                onClick={() => navigate(`/books/${book.id}`)}
                            >
                                <img className="profile-book-card-img" src={book.image_url} alt={book.title} />
                                <h3 className="profile-book-title">{book.title}</h3>
                                <p className="profile-book-author">By: {book.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pendingBooks?.length > 0 && (
                <div className="pending-books-section">
                    <h2>Books Pending Approval</h2>
                    <div className="profile-book-grid">
                        {pendingBooks?.map((book) => (
                            <div
                                key={book.id}
                                className="profile-book-card"
                                onClick={() => navigate(`/books/${book.id}`)}
                            >
                                <img className="profile-book-card-img" src={book.image_url} alt={book.title} />
                                <h3 className="profile-book-title">{book.title}</h3>
                                <p className="profile-book-author">By: {book.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
