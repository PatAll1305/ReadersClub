import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { thunkDeleteBook } from "../../redux/books";
import "./DeleteBookModal.css";

export default function DeleteBookModal({ bookId, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const handleConfirm = async () => {
        dispatch(thunkDeleteBook(bookId, user?.id));
        closeModal();
        navigate(`/users/${userId}`)
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this book?</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={handleConfirm}>
                        Yes
                    </button>
                    <button className="close-button" onClick={() => closeModal()}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
