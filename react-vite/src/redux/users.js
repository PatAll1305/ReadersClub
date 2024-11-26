import { csrfFetch } from "./csrf";

const GET_ALL_USERS = 'users/getAllUsers'

const getUsers = (payload) => ({
    type: GET_ALL_USERS,
    payload
});

export const thunkGetAllUsers = () => async (dispatch) => {
    const response = await csrfFetch("/api/users");

    if (response.ok) {
        const payload = await response.json()
        dispatch(getUsers(payload));
    }
};

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, all: action.payload };
        default:
            return state;
    }
}

