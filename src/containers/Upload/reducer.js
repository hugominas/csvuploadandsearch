import {
    UPDATE_FORM,
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCEFUL,
} from './constants';

const initialState = {
	users: [],
	nextPage: 1,
	pagesToFetch: 30,
	isLoading: false,
};

export default function uploadReducer (state = initialState, action) {
	switch (action.type) {
		case UPDATE_FORM:
			return { ...state, [action.payload.name]: action.payload.value || null };
		case UPLOAD_FORM:
			return state;
		case UPLOAD_FORM_SUCCEFUL:
			return state;
		default:
			return state;
	}
}
