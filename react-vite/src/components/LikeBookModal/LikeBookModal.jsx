import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { userLikeBook, thunkFetchUserLikedBooks, thunkFetchUserDislikedBooks, removeDislikedBook } from "../../redux/books";
import { useEffect, useState } from "react";
import "./LikeBookModal.css";

export default function LikeBookModal({ bookId, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dislikedBooks = useSelector((state) => state.books?.userDislikedBooks || []);
    const likedBooks = useSelector((state) => state.books?.userLikedBooks || []);
    const [confirmLike, setConfirmLike] = useState(false);

    const handleConfirm = async () => {
        const allBooks = [
            ...likedBooks.map((likedBook) => [likedBook.book, "liked"]),
            ...dislikedBooks.map((dislikedBook) => [dislikedBook.book, "disliked"]),
        ];

        const likedBook = allBooks.find(([book, liked]) => book?.id === +bookId && liked === 'liked');
        const dislikedBook = allBooks.find(([book, disliked]) => book?.id === +bookId && disliked === 'disliked');

        if (dislikedBook?.length) {
            setConfirmLike(true);
        } else if (!likedBook?.length) {
            dispatch(userLikeBook({ book_id: +bookId, user_id: +userId }));
            navigate(`/users/${userId}`);
            closeModal();
        } else {
            window.alert("You already liked this book! Must be really good! :)");
            closeModal();
        }
    };

    useEffect(() => {
        dispatch(thunkFetchUserLikedBooks(+userId));
        dispatch(thunkFetchUserDislikedBooks(+userId));
    }, [dispatch, userId]);

    return (
        <div className="modal-overlay">
            {userId ? (
                confirmLike ? (
                    <div className="modal-content">
                        <h3>Remove Dislike to Like</h3>
                        <p>You have already disliked this book. Do you want to remove the dislike and like it?</p>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={async () => {
                                    dispatch(removeDislikedBook({ book_id: +bookId, user_id: +userId }));
                                    dispatch(userLikeBook({ book_id: +bookId, user_id: +userId }));
                                    dispatch(thunkFetchUserLikedBooks(userId))
                                    closeModal();
                                    navigate(`/users/${userId}`);
                                }}
                            >
                                Yes
                            </button>
                            <button className="close-button" onClick={() => setConfirmLike(false)}>
                                No
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="modal-content">
                        <h3>Confirm Like</h3>
                        <p>Are you sure you like this book?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={handleConfirm}>
                                Yes
                            </button>
                            <button className="close-button" onClick={() => closeModal()}>
                                No
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <div className="modal-content">
                    <h1>Please log in or sign up to like this book</h1>
                    <button
                        className="close-button"
                        onClick={() => {
                            closeModal();
                            navigate("/login");
                        }}
                    >
                        Okay!
                    </button>
                </div>
            )}
        </div>
    );
}