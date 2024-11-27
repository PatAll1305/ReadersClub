import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchClubs } from "../../redux/clubs";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetAllUsers } from "../../redux/users";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ConfirmJoinClubModal from "../ClubModals/ConfirmJoinClubModal";


export default function ClubsById() {
    const { clubId } = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const club = useSelector(state => state.clubs.clubs[clubId]);
    const users = useSelector(state => state.users.all);

    useEffect(() => {
        dispatch(thunkFetchClubs());
        dispatch(thunkGetAllUsers());
    }, [dispatch]);



    return (
        <div className="club-container">
            <h1 className="club-header">{club.club_name}</h1>
            <p>Owned By: {Object.values(users)?.find(user => user.id === club.owner_id)?.username}</p>
            <p>Members:</p>
            <ul>
                {club.members.map(member => {
                    {/*onClick={() => navigate(`/users/${member.user_id}`)}*/ }
                    return (
                        <li className='club-members' key={member.id}>{member.user.username}</li>
                    )
                })}
            </ul>
            <OpenModalMenuItem
                itemText={'Join Club'}
                className={'join-club-button'}
                modalComponent={
                    <ConfirmJoinClubModal
                        clubId={+clubId}
                    />
                }
            />
        </div>
    );
}