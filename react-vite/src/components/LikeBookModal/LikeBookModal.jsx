import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { userLikeBook } from "../../redux/books";
import "./LikeBookModal.css";

export default function LikeBookModal({ bookId, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const likedBooks = useSelector(state => state.books?.userLikedBooks)

    const handleConfirm = async () => {
        const likedBook = Object.values(likedBooks).filter(likedBook => likedBook.book?.id === bookId)

        console.log(likedBook)
        if (!likedBook.length) {
            dispatch(userLikeBook({ "book_id": bookId, "user_id": userId }))
        } else {
            window.alert('You already liked this book! Must be really good :)')
            closeModal()
        }
    };

    return (
        <div className="modal-overlay">
            {userId ?
                <div className="modal-content">
                    <h3>Confirm Like</h3>
                    <p>Are you sure like this book?</p>
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
                    <h1>Please log in or sign up to like this book</h1>
                    <button onClick={() => {
                        closeModal()
                        navigate('/login')
                    }
                    }>Okay!
                    </button>

                </div>
            }
        </div >
    );
}