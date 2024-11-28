import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkFetchUserLikedBooks, thunkFetchUserDislikedBooks, thunkFetchBooks } from '../../redux/books.js';
import './ProfilePage.css';
import { thunkFetchClubs } from '../../redux/clubs.js';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    const userLikedBooks = useSelector((state) => state.books.userLikedBooks);
    const userDislikedBooks = useSelector((state) => state.books.userDislikedBooks);
    const allBooks = useSelector((state) => state.books.all);
    const user = useSelector((state) => state.session.user);
    const clubs = useSelector((state) => state.clubs.clubs);

    const allBooksArray = Object.values(allBooks);
    const allClubsArray = Object.values(clubs)

    const uploadedBooks = allBooksArray?.filter((book) => book.user_id === +userId && book.status === 'uploaded');
    const pendingBooks = allBooksArray?.filter((book) => book.user_id === +userId && book.status === 'pending');
    const userOwnedClubs = allClubsArray?.filter((club) => club.owner_id === +userId);
    const userJoinedClubs = allClubsArray?.filter((club) => {
        return club.members.find((member) => member.id === +userId)
    })

    useEffect(() => {
        dispatch(thunkFetchUserLikedBooks(userId));
        dispatch(thunkFetchUserDislikedBooks(userId));
        dispatch(thunkFetchBooks());
        dispatch(thunkFetchClubs())
    }, [dispatch, userId]);

    if (+user?.id !== +userId) return <h1>This feature is coming soon</h1>

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

            {userDislikedBooks?.length > 0 ? (
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
            )
                :
                (
                    <div className="disliked-books-section">
                        <h2>Your Disliked Books</h2>
                        <h3 className="profile-book-title">{"No Books disliked! You must be a happy reader :)"}</h3>

                    </div>
                )}

            {uploadedBooks?.length > 0 ? (
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
            )
                : (
                    <div className="uploaded-books-section">
                        <h2>Books You Uploaded</h2>
                        <h3 className="profile-book-title">No books uploaded</h3>
                        <button className='create-book-button' onClick={() => navigate('/books/create')}>Upload a Book</button>
                    </div>
                )}

            {pendingBooks?.length > 0 ? (
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
            )
                : (
                    <div className="pending-books-section">
                        <h2>Books Pending Approval</h2>
                        <h4 className='profile-book-author'>No books pending approval</h4>
                    </div>
                )}

            {userJoinedClubs?.length > 0 ? (
                <div className="joined-clubs-section">
                    <h2>{"Clubs you've joined"}</h2>
                    <div className="profile-clubs-grid">
                        {userJoinedClubs?.map((club) => (
                            <div
                                key={club.id}
                                className="profile-club-card"
                                onClick={() => navigate(`/clubs/${club.id}`)}
                            >
                                <h3 className="profile-club-name">{club.club_name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )
                : (
                    <div className="pending-books-section">
                        <h2>{"Clubs you've joined"}</h2>
                        <h4 className='profile-book-author'>No Clubs joined</h4>
                        <button className='join-club-button' onClick={() => navigate('/clubs')}>Find a Club</button>
                    </div>
                )}
            {userOwnedClubs?.length > 0 ? (
                <div className="joined-clubs-section">
                    <h2>Clubs you own</h2>
                    <div className="profile-clubs-grid">
                        {userOwnedClubs?.map((club) => (
                            <div
                                key={club.id}
                                className="profile-club-card"
                                onClick={() => navigate(`/clubs/${club.id}`)}
                            >
                                <h3 className="profile-club-name">{club.club_name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )
                : (
                    <div className="pending-books-section">
                        <h2>Clubs you own</h2>
                        <h4 className='profile-book-author'>No Clubs owned</h4>
                        <button className='join-club-button' style={{ justifySelf: 'center' }} onClick={() => navigate('/clubs/create')}>Create a Club</button>
                    </div>
                )}
        </div>
    );
}
