import { csrfFetch } from './csrf';
const SET_BOOKS_BY_GENRE = 'books/setBooksByGenre';
const SET_USER_LIKED_BOOKS = 'books/setUserLikedBooks';
const SET_USER_DISLIKED_BOOKS = 'books/setUserDislikedBooks';
const GET_ALL_BOOKS = 'books/getAllBooks';
const LIKE_BOOK = 'books/likeBook';
const DISLIKE_BOOK = 'books/dislikeBook';


const setBooksByGenre = (books) => ({
    type: SET_BOOKS_BY_GENRE,
    payload: books,
});

const getAllBooks = (books) => ({
    type: GET_ALL_BOOKS,
    payload: books,
});

const setUserLikedBooks = (likedBooks) => ({
    type: SET_USER_LIKED_BOOKS,
    payload: likedBooks,
});

const setUserDisikedBooks = (likedBooks) => ({
    type: SET_USER_DISLIKED_BOOKS,
    payload: likedBooks,
});

const likeBook = (bookAndUserId) => ({
    type: LIKE_BOOK,
    payload: bookAndUserId,
});

const dislikeBook = (bookAndUserId) => ({
    type: DISLIKE_BOOK,
    payload: bookAndUserId,
});



export const thunkFetchBooksByGenre = () => async (dispatch) => {
    const response = await csrfFetch('/api/books');
    if (response.ok) {
        const data = await response.json();

        const groupedBooks = data.reduce((acc, book) => {
            acc[book.genre] = acc[book.genre] || [];
            acc[book.genre].push(book);
            return acc;
        }, {});

        dispatch(setBooksByGenre(groupedBooks));
    }
};

export const thunkFetchBooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/books');
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllBooks(data));
    }
};

export const thunkFetchUserLikedBooks = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/liked-books`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setUserLikedBooks(data));
    }
};

export const thunkFetchUserDislikedBooks = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/disliked-books`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setUserDisikedBooks(data));
    }
};

export const userLikeBook = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/liked_books`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(likeBook(data));
    }
};
export const userDislikeBook = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/disliked_books`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(dislikeBook(data));
    }
};

const initialState = {
    booksByGenre: {},
    userLikedBooks: [],
    userDislikedBooks: [],
    all: []
};

export default function booksReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOOKS_BY_GENRE:
            return { ...state, booksByGenre: action.payload };
        case SET_USER_LIKED_BOOKS:
            return { ...state, userLikedBooks: action.payload };
        case SET_USER_DISLIKED_BOOKS:
            return { ...state, userDislikedBooks: action.payload };
        case GET_ALL_BOOKS:
            return { ...state, all: action.payload };
        case LIKE_BOOK:
            return {
                ...state,
                userLikedBooks: [...state.userLikedBooks, action.payload]
            };
        default:
            return state;
    }
}