import {
    UPDATE_FORM,
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCESSFUL,
    SEARCH_TEXT_SUCCESSFUL,
} from './constants';

const initialState = {
    isLoading: false,
    uploaded: false
};

export default function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FORM:
            return {...state, [action.payload.name]: action.payload.value || null};
        case UPLOAD_FORM:
            return state;
        case SEARCH_TEXT_SUCCESSFUL:
            console.log(action);

            return {...state, requestData: action.payload.filename};
        case UPLOAD_FORM_SUCCESSFUL:
            return {...state, requestFile: action.payload, uploaded: true};
        default:
            return state;
    }
}
