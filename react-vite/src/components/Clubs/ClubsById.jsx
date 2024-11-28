import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchClubs } from "../../redux/clubs";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetAllUsers } from "../../redux/users";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ConfirmJoinClubModal from "../ClubModals/ConfirmJoinClubModal";
import ConfirmLeaveClubModal from "../ClubModals/ConfirmLeaveClubModal";


export default function ClubsById() {
    const { clubId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const club = useSelector(state => state.clubs.clubs[clubId]);
    const users = useSelector(state => state.users.all);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(thunkFetchClubs());
        dispatch(thunkGetAllUsers());
    }, [dispatch]);

    const userIdArr = [];
    if (!club) return <h1 className="club-header">Club not found</h1>
    return (
        <div className="club-id-container">
            <h1 className="club-header">{club?.club_name}</h1>
            <p>Owned By: {users && Object.values(users)?.find(user => user.id === club?.owner_id)?.username}</p>
            <p>Members:</p>
            <ul>
                {club?.members?.map(member => {
                    {/*onClick={() => navigate(`/users/${member.user_id}`)}*/ }
                    userIdArr.push(member?.user_id)
                    return (
                        <li onClick={() => window.alert("Feature coming soon!")} className='club-members' key={member.id}>{member?.user?.username}</li>
                    )
                })}
            </ul>
            {currentUser && !userIdArr.find(id => id === currentUser?.id) && club?.owner_id !== currentUser?.id ?
                < OpenModalMenuItem
                    itemText={'Join Club'}
                    className={'join-club-button'}
                    modalComponent={
                        <ConfirmJoinClubModal
                            clubId={+clubId}
                        />
                    }
                />
                : currentUser && (userIdArr.find(id => id === currentUser?.id) || club?.owner_id === currentUser?.id) ?
                    <OpenModalMenuItem
                        itemText={'Leave Club'}
                        className={'leave-club-button'}
                        modalComponent={
                            <ConfirmLeaveClubModal
                                clubId={+clubId} />
                        }
                    /> :
                    null
            }
        </div>
    );
}