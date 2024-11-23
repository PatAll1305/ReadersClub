import { useEffect } from "react";
import { thunkFetchBooks } from "../../redux/books";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LikeBookModal from "../LikeBookModal/LikeBookModal";
import DislikeBookModal from "../DislikeBookModal/DislikeBookModal";
import "./Books.css";

export default function BookById() {
    const { bookId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const book = useSelector((state) => state.books?.all[+bookId - 1]);
    // const userClubs = useSelector((state) =>
    //     state.clubs?.filter((club) => club.owner_id === user?.id)
    // );

    useEffect(() => {
        dispatch(thunkFetchBooks());
    }, [dispatch]);

    return (
        <div className="book-container">
            <img className="book-cover" src={book?.image_url} alt={`${book?.title} cover`} />
            <div className="book-details">
                <h2 className="book-title">{book?.title}</h2>
                <h4 className="book-author">By: {book?.author}</h4>
                <p className="book-genre">{book?.genre}</p>
                <p className="book-description">{book?.description}</p>
                {user && <div className="button-container">

                    <button >
                        <OpenModalMenuItem
                            itemText="Like"
                            modalComponent={<LikeBookModal userId={user?.id} bookId={bookId} />}
                        />
                    </button>
                    <button >
                        <OpenModalMenuItem
                            itemText="Dislike"
                            modalComponent={<DislikeBookModal userId={user?.id} bookId={bookId} />}
                        />
                    </button>
                </div>
                    /* {userClubs.length > 0 &&
                        userClubs.map((club) => (
                            <OpenModalMenuItem
                            key={club.id}
                            itemText={`Add to ${club.name}`}
                            modalComponent={<p>Feature coming soon!</p>}
                            />
                            ))} */
                }
            </div>
        </div>
    );
}
