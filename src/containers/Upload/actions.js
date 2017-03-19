import { createAction } from 'redux-actions';

import {
    UPDATE_FORM,
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCESSFUL,
    SEARCH_TEXT_REQUEST
} from './constants';

export const updateForm = createAction(UPDATE_FORM, (name, value) => ({ name, value }));
export const uploadCSV = createAction(UPLOAD_FORM, (file) => ({ file }));
export const uploadCSVSuccessfull = createAction(UPLOAD_FORM_SUCCESSFUL, (payload) => payload);
export const searchText = createAction(SEARCH_TEXT_REQUEST, (payload) => payload);
