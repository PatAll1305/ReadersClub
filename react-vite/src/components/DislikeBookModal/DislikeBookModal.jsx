import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { userDislikeBook, thunkFetchUserLikedBooks, thunkFetchUserDislikedBooks, removeLikedBook } from "../../redux/books";
import { useEffect, useState } from "react";
import "./DislikeBookModal.css";

export default function DislikeBookModal({ bookId, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dislikedBooks = useSelector((state) => state.books?.userDislikedBooks || []);
    const likedBooks = useSelector((state) => state.books?.userLikedBooks || []);
    const [confirmDislike, setConfirmDislike] = useState(false);

    const handleConfirm = async () => {
        const allBooks = [
            ...likedBooks.map((likedBook) => [likedBook?.book, "liked"]),
            ...dislikedBooks.map((dislikedBook) => [dislikedBook?.book, "disliked"]),
        ];

        const likedBook = allBooks.find(([book, liked]) => book?.id === +bookId && liked === 'liked');
        const dislikedBook = allBooks.find(([book, disliked]) => book?.id === +bookId && disliked === 'disliked');

        if (likedBook?.length) {
            setConfirmDislike(true);
        } else if (!dislikedBook?.length) {
            dispatch(userDislikeBook({ book_id: +bookId, user_id: +userId }));
            closeModal();
            navigate(`/users/${userId}`);
        } else {
            window.alert("You already disliked this book! Must be really bad :(");
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
                confirmDislike ? (
                    <div className="modal-content">
                        <h3>Remove Like to Dislike</h3>
                        <p>You have already liked this book. Do you want to remove the like and dislike it?</p>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={async () => {
                                    dispatch(removeLikedBook({ book_id: +bookId, user_id: +userId }));
                                    dispatch(userDislikeBook({ book_id: +bookId, user_id: +userId }));
                                    dispatch(thunkFetchUserDislikedBooks(userId))
                                    closeModal();
                                    navigate(`/users/${userId}`);
                                }}
                            >
                                Yes
                            </button>
                            <button className="close-button" onClick={() => setConfirmDislike(false)}>
                                No
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="modal-content">
                        <h3>Confirm Dislike</h3>
                        <p>Are you sure you dislike this book?</p>
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
                    <h1>Please log in or sign up to dislike this book</h1>
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
