import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchClubs } from '../../redux/clubs';
import { thunkGetAllUsers } from '../../redux/users';
import './Clubs.css';

export default function Clubs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clubs = useSelector((state) => state.clubs?.clubs);
    const users = useSelector((state) => state.users?.all);

    useEffect(() => {
        dispatch(thunkFetchClubs());
        dispatch(thunkGetAllUsers())
    }, [dispatch]);

    return (
        <div className="clubs-page">
            <h1 className="clubs-header">Explore Our Clubs</h1>
            <div className="grid-container">
                {Object.values(clubs)?.map((club) => (
                    <div key={club.id} className="club-card" onClick={() => navigate(`/clubs/${club.id}`)}>
                        <h2 className="club-name">{club.club_name}</h2>
                        <p className="club-description">Owner: {Object.values(users)?.find(user => user?.id === club?.owner_id)?.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
