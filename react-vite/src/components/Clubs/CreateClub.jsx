import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateClub, thunkFetchClubs } from '../../redux/clubs';
import './Clubs.css';

export default function CreateClub() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clubName, setClubName] = useState('');
    const [errors, setErrors] = useState([]);
    const ownerId = useSelector((state) => state.session?.user?.id);
    const clubs = useSelector((state) => state.clubs.clubs);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (!clubName.trim()) {
            setErrors(['Club name cannot be empty']);
        }

        const clubsNamesArr = [];
        Object.values(clubs)?.map(club => clubsNamesArr.push(club?.club_name));


        if (clubsNamesArr.find(name => name === clubName)) setErrors([...errors, 'That Club Name is taken'])
        if (!errors.length) {
            dispatch(thunkCreateClub({ club_name: clubName, owner_id: ownerId }));
            navigate('/clubs');
        }
    }

    useEffect(() => {
        dispatch(thunkFetchClubs())
    }, [dispatch])

    return (
        <div className="create-club-page">
            <h1>Create a New Club</h1>
            <form onSubmit={handleSubmit} className="create-club-form">
                {errors.length ? errors[0] : null}
                <label>
                    Club Name:
                    <input
                        type="text"
                        value={clubName}
                        onChange={(e) => setClubName(e.target.value)}
                        placeholder="Enter club name"
                        className="club-name-input"
                        required
                    />
                </label>
                <button type="submit" className="submit-button">
                    Create Club
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={() => navigate('/clubs')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
