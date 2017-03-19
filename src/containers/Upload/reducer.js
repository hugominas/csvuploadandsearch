import {
    UPDATE_FORM,
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCESSFUL,
} from './constants';

const initialState = {
	isLoading: false,
    uploaded: false
};

export default function uploadReducer (state = initialState, action) {
    switch (action.type) {
		case UPDATE_FORM:
			return { ...state, [action.payload.name]: action.payload.value || null };
		case UPLOAD_FORM:
			return state;
		case UPLOAD_FORM_SUCCESSFUL:
            return { ...state, requestFile: action.payload.filename, uploaded: true};
		default:
			return state;
	}
}
