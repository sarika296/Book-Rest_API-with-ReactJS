import { FETCH_BOOK_FAILURE, FETCH_BOOK_REQUEST, FETCH_BOOK_SUCCESS } from "./bookTypes";
import axios from 'axios'

export const fetchBooks = (bookId) => {
    return dispatch => {
        dispatch(fetchBookRequest());
        axios.get("http://localhost:8081/rest/books/"+bookId)
            .then(res => {
                dispatch(fetchBookSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchBookFailure(err.message));
            });
    };
};

const fetchBookRequest = () => {
    return{
        type: FETCH_BOOK_REQUEST
    };
};

const fetchBookSuccess = (users) => {
    return{
        type: FETCH_BOOK_SUCCESS,
        payload: users
    };
};

const fetchBookFailure = (err) => {
    return{
        type: FETCH_BOOK_FAILURE,
        payload: err
    };
};
