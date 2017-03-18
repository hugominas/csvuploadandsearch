import { fromJS } from 'immutable';

import {
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCEFUL
} from './constants';

const initialState = {
    users: [],
    nextPage: 1,
    pagesToFetch: 30,
    isLoading: false
};

export default function uploadReducer(state = fromJS(initialState), action) {
    switch (action) {
        case UPLOAD_FORM:
            return state;
        case UPLOAD_FORM_SUCCEFUL:
            return state;
        default:
            return state;
    }
}
