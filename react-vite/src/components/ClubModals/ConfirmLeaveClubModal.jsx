import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { thunkFetchClubs, thunkLeaveClub } from "../../redux/clubs";
import './ClubModals.css';


export default function ConfirmLeaveClubModal({ clubId }) {
    const { closeModal } = useModal();
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const club = useSelector(state => state.clubs.clubs[+clubId]);
    const user = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(thunkFetchClubs());
    });

    const handleConfirm = () => {
        dispatch(thunkLeaveClub(+clubId, user?.id))
        closeModal();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Join Club</h2>
                <p>Are you sure you want to leave the club {club?.club_name}?</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={handleConfirm}>Yes, Leave</button>
                    <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}