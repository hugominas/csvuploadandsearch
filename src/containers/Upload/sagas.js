import { takeEvery, fork, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_FORM, UPLOAD_FORM_SUCCESSFUL } from './constants';


export function * uploadFormFlow ({ payload, meta }) {
    try {
        const data = new FormData();
        data.append('file', payload.file);

        const config = {
            method: 'PUT',
            url:'/upload',
            data,
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            },
        };

        const result = yield call(axios, config);

        console.log(result);

        // yield put(uploadCSVSuccessfull());
    } catch (error) {
        console.log(error);
        // console.log(routingLoadError(error));
    }
}

export function * uploadFormFlowWatcher () {
    yield takeEvery(UPLOAD_FORM, uploadFormFlow);
}
export default [
    fork(uploadFormFlowWatcher),
];