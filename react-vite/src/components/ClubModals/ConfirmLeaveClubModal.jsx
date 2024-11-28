import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { thunkFetchClubs, thunkLeaveClub } from "../../redux/clubs";
import './ClubModals.css';


export default function ConfirmLeaveClubModal({ clubId }) {
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const club = useSelector(state => state.clubs.clubs[+clubId]);
    const user = useSelector(state => state.session.user);

    const isOwner = user?.id === club?.owner_id


    useEffect(() => {
        dispatch(thunkFetchClubs());
    }, [dispatch]);

    const handleConfirm = () => {
        dispatch(thunkLeaveClub(+clubId, user?.id))
        closeModal();
        if (isOwner) {
            navigate('/clubs');
        }
        window.location.reload()
    };

    return (
        <div className="modal-overlay">
            {!isOwner ?

                <div className="modal-content">
                    <h2>Leave Club</h2>
                    <p>Are you sure you want to leave {club?.club_name}?</p>
                    <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleConfirm}>Yes, Leave</button>
                        <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                    </div>
                </div>
                :
                <div className="modal-content">
                    <h2>Leave Club</h2>
                    <p>Are you sure you want to leave {club?.club_name}?</p>
                    <p id="error-message">Leaving this club will delete it PERMANENTLY</p>
                    <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleConfirm}>Yes, Leave</button>
                        <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                    </div>
                </div>}
        </div>
    );
}