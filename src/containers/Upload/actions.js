import { createAction } from 'redux-actions';

import {
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCESSFUL
} from './constants';

export const uploadCSV = createAction(UPLOAD_FORM, (name, value) => ({ name, value }));
export const uploadCSVSuccessfull = createAction(UPLOAD_FORM_SUCCESSFUL, (name, value) => ({ name, value }));

