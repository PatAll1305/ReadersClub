const SET_BOOKS = 'books/setBooks';
const SET_USER_LIKED_BOOKS = 'books/setUserLikedBooks';

const setBooks = (books) => ({
    type: SET_BOOKS,
    payload: books,
});

const setUserLikedBooks = (likedBooks) => ({
    type: SET_USER_LIKED_BOOKS,
    payload: likedBooks,
});

import { csrfFetch } from './csrf';

export const thunkFetchBooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/books');
    if (response.ok) {
        const data = await response.json();

        const groupedBooks = data.reduce((acc, book) => {
            acc[book.genre] = acc[book.genre] || [];
            acc[book.genre].push(book);
            return acc;
        }, {});

        dispatch(setBooks(groupedBooks));
    }
};

export const thunkFetchUserLikedBooks = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/liked-books`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setUserLikedBooks(data));
    }
};


const initialState = {
    booksByGenre: {},
    userLikedBooks: [],
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOOKS:
            return { ...state, booksByGenre: action.payload };
        case SET_USER_LIKED_BOOKS:
            return { ...state, userLikedBooks: action.payload };
        default:
            return state;
    }
}

export default booksReducer;
