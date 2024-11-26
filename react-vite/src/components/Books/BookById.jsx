import { useEffect } from "react";
import { thunkFetchBooks } from "../../redux/books";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LikeBookModal from "../LikeBookModal/LikeBookModal";
import DislikeBookModal from "../DislikeBookModal/DislikeBookModal";
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal";
import "./Books.css";

export default function BookById() {
    const { bookId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.session.user);
    const book = useSelector((state) => state.books?.all[bookId]);
    // const userClubs = useSelector((state) =>
    //     state.clubs?.filter((club) => club.owner_id === user?.id)
    // );

    useEffect(() => {
        dispatch(thunkFetchBooks());
    }, [dispatch]);

    if (book?.status === 'pending' && user.id !== book?.user_id) return (
        <h1 className="book-title">Sorry, you cannot view this book until it is approved.</h1>
    )
    return (
        <div className="book-container">
            <img className="book-cover" src={book?.image_url} alt={`${book?.title} cover`} />
            <div className="book-details">
                <h2 className="book-title">{book?.title}</h2>
                <h4 className="book-author">By: {book?.author}</h4>
                <p className="book-genre">{book?.genre}</p>
                <p className="book-description">{book?.description}</p>
                {user && book?.status !== 'pending' ? < div className="button-container">

                    <OpenModalMenuItem
                        className="like-button"
                        itemText="Like"
                        modalComponent={<LikeBookModal userId={user?.id} bookId={bookId} />}
                    />
                    <OpenModalMenuItem
                        className="dislike-button"
                        itemText="Dislike"
                        modalComponent={<DislikeBookModal userId={user?.id} bookId={bookId} />}
                    />
                </div>
                    /* {userClubs.length > 0 &&
                userClubs.map((club) => (
                    <OpenModalMenuItem
                        key={club.id}
                        itemText={`Add to ${club.name}`}
                        modalComponent={<p>Feature coming soon!</p>}
                    />
                ))} */
                    : null
                }
                {user?.id === book?.user_id ?
                    < div className="button-container">
                        <div className='edit-button' onClick={() => navigate(`/books/${bookId}/edit`)}>Edit Book</div>
                        <OpenModalMenuItem
                            className="delete-button"
                            itemText="Delete Book"
                            modalComponent={<DeleteBookModal userId={user?.id} bookId={bookId} />}
                        />
                    </div> :
                    null}
            </div>
        </div >
    );
}
