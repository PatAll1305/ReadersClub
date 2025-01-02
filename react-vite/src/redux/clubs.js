import { csrfFetch } from './csrf';

const LOAD_CLUBS = 'clubs/LOAD_CLUBS';
const ADD_CLUB = 'clubs/ADD_CLUB';
const JOIN_CLUB = 'clubs/JOIN_CLUB';
const LEAVE_CLUB = 'clubs/LEAVE_CLUB';
const LOAD_CLUB_MESSAGES = 'clubs/LOAD_CLUB_MESSAGES';
const ADD_CLUB_MESSAGE = 'clubs/ADD_CLUB_MESSAGE';
const DELETE_CLUB_MESSAGE = 'clubs/DELETE_CLUB_MESSAGE';
const EDIT_CLUB_MESSAGE = 'clubs/EDIT_CLUB_MESSAGE';

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

const addClubMessage = (clubId, userId, message) => ({
    type: ADD_CLUB_MESSAGE,
    clubId,
    userId,
    message
});

const editClubMessage = (clubId, userId, message) => ({
    type: EDIT_CLUB_MESSAGE,
    clubId,
    userId,
    message
});

const loadClubMessages = (clubId) => ({
    type: LOAD_CLUB_MESSAGES,
    clubId,
});

const deleteClubMessage = (messageId) => ({
    type: DELETE_CLUB_MESSAGE,
    messageId
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

export const thunkFetchClubMessages = (clubId) => async (dispatch) => {
    const response = await csrfFetch(`/api/club_messages/${clubId}`);
    if (response.ok) {
        const messages = await response.json();
        dispatch(loadClubMessages(clubId, messages));
    }
};

export const thunkAddClubMessage = (clubId, messageData) => async (dispatch) => {
    const response = await csrfFetch(`/api/club_messages/${clubId}`, {
        method: 'POST',
        body: JSON.stringify(messageData),
    });
    if (response.ok) {
        const message = await response.json();
        dispatch(addClubMessage(clubId, message));
    }
};

export const thunkEditClubMessage = (messageId, messageData) => async (dispatch) => {
    const response = await csrfFetch(`/api/club_messages/message/${messageId}`, {
        method: 'PUT',
        body: JSON.stringify(messageData),
    });
    if (response.ok) {
        const message = await response.json();
        dispatch(editClubMessage(message.club_id, message));
    }
};

export const thunkDeleteClubMessage = (clubId, messageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/club_messages/message/${messageId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteClubMessage(clubId, messageId));
    }
};

const initialState = {
    clubs: {},
    messages: {}
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
        case LOAD_CLUB_MESSAGES: {
            const newState = { ...state, messages: { ...state.messages } };
            newState.messages[action.clubId] = action.messages;
            return newState;
        }
        case ADD_CLUB_MESSAGE: {
            const { clubId, message } = action;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [clubId]: [...(state.messages[clubId] || []), message],
                },
            };
        }
        case EDIT_CLUB_MESSAGE: {
            const { clubId, message } = action;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [clubId]: state.messages[clubId].map((msg) =>
                        msg.id === message.id ? message : msg
                    ),
                },
            };
        }
        case DELETE_CLUB_MESSAGE: {
            const { clubId, messageId } = action;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [clubId]: state.messages[clubId].filter((msg) => msg.id !== messageId),
                },
            };
        }
        default:
            return state;
    }
}
