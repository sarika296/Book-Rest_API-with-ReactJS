import { FETCH_BOOK_FAILURE, FETCH_BOOK_SUCCESS, FETCH_BOOK_REQUEST } from "./bookTypes";

const initialState = {
    books: [],
    err: ''
}

const bookReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FETCH_BOOK_REQUEST:
            return{
                ...state
            };
        case FETCH_BOOK_SUCCESS:
            return {
                books: action.payload,
                err: ''
            };
        case FETCH_BOOK_FAILURE:
            return {
                books: [],
                err: action.payload
            };

        default:
            return state
    }
}

export default bookReducer;
