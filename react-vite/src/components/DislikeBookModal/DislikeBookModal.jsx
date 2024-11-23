import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { userDislikeBook, thunkFetchUserLikedBooks, thunkFetchUserDislikedBooks } from "../../redux/books";
import { useEffect } from "react";
import "./DislikeBookModal.css";

export default function LikeBookModal({ bookId, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dislikedBooks = useSelector(state => state.books?.userDislikedBooks);
    const likedBooks = useSelector(state => state.books?.userLikedBooks);

    const handleConfirm = async () => {
        let books = [];

        for (const likedBook of likedBooks) {
            books.push(likedBook.book)
        }
        for (const dislikedBook of dislikedBooks) {
            books.push(dislikedBook.book)
        }

        const likedBook = books.filter(book => book.id === +bookId)
        const dislikedBook = books.filter(book => book.id === +bookId)

        if (!likedBook.length && !dislikedBook.length) {
            dispatch(userDislikeBook({ "book_id": +bookId, "user_id": +userId }))
            navigate(`/users/${userId}`)
        } else {
            window.alert('You already disliked this book! Must be really bad :(')
            closeModal()
        }
    };

    useEffect(() => {
        dispatch(thunkFetchUserLikedBooks(+userId))
        dispatch(thunkFetchUserDislikedBooks(+userId))
    }, [dispatch, userId])

    return (
        <div className="modal-overlay">
            {userId ?
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
                :
                <div>
                    <h1>Please log in or sign up to dislike this book</h1>
                    <button className='close-button' onClick={() => {
                        closeModal()
                        navigate('/login')
                    }}>
                        Okay!
                    </button>

                </div>
            }
        </div >
    );
}