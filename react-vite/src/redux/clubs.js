import { csrfFetch } from './csrf';

const LOAD_CLUBS = 'clubs/LOAD_CLUBS';
const ADD_CLUB = 'clubs/ADD_CLUB';
const JOIN_CLUB = 'clubs/JOIN_CLUB';
const LEAVE_CLUB = 'clubs/LEAVE_CLUB';

const loadClubs = (clubs) => ({
    type: LOAD_CLUBS,
    clubs,
});

const addClub = (club) => ({
    type: ADD_CLUB,
    club,
});

const joinClub = (clubId, userId) => ({
    type: JOIN_CLUB,
    clubId,
    userId,
});

const leaveClub = (clubId, userId) => ({
    type: LEAVE_CLUB,
    clubId,
    userId,
});

export const thunkFetchClubs = () => async (dispatch) => {
    const response = await csrfFetch('/api/clubs/');
    if (response.ok) {
        const clubs = await response.json();
        dispatch(loadClubs(clubs));
    }
};

export const thunkCreateClub = (clubData) => async (dispatch) => {
    const response = await csrfFetch('/api/clubs/', {
        method: 'POST',
        body: JSON.stringify(clubData),
    });
    if (response.ok) {
        const newClub = await response.json();
        dispatch(addClub(newClub));
    }
};

export const thunkJoinClub = (clubId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/clubs/${clubId}/join`, {
        method: 'POST',
        body: JSON.stringify({ user_id: userId }),
    });
    if (response.ok) {
        dispatch(joinClub(clubId, userId));
    }
};

export const thunkLeaveClub = (clubId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/clubs/${clubId}/leave`, {
        method: 'POST',
        body: JSON.stringify({ user_id: userId }),
    });
    if (response.ok) {
        dispatch(leaveClub(clubId, userId));
    }
};

const initialState = {
    clubs: {},
};

export default function clubsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CLUBS: {
            const newState = { ...state, clubs: {} };
            action.clubs.forEach((club) => {
                newState.clubs[club.id] = {
                    ...club,
                    members: club.members || [],
                };
            });
            return newState;
        }
        case ADD_CLUB: {
            return {
                ...state,
                clubs: {
                    ...state.clubs,
                    [action.club.id]: { ...action.club, members: [] },
                },
            };
        }
        case JOIN_CLUB: {
            const { clubId, userId } = action;
            return {
                ...state,
                clubs: {
                    ...state.clubs,
                    [clubId]: {
                        ...state.clubs[clubId],
                        members: [...state.clubs[clubId].members, userId],
                    },
                },
            };
        }
        case LEAVE_CLUB: {
            const { clubId, userId } = action;
            return {
                ...state,
                clubs: {
                    ...state.clubs,
                    [clubId]: {
                        ...state.clubs[clubId],
                        members: state.clubs[clubId].members.filter(
                            (member) => member !== userId
                        ),
                    },
                },
            };
        }
        default:
            return state;
    }
}
