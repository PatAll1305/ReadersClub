import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { thunkFetchClubs, thunkJoinClub } from "../../redux/clubs";
import './ClubModals.css';


export default function ConfirmJoinClubModal({ clubId }) {
    const { closeModal } = useModal();
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const club = useSelector(state => state.clubs.clubs[+clubId]);
    const user = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(thunkFetchClubs());
    }, [dispatch]);

    const handleConfirm = () => {
        dispatch(thunkJoinClub(+clubId, user?.id))
        dispatch(thunkFetchClubs())
        closeModal();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Join Club</h2>
                <p>Are you sure you want to join the club {club?.club_name}?</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={handleConfirm}>Yes, Join</button>
                    <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}