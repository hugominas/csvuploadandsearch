import {takeEvery, fork, call, put, select} from 'redux-saga/effects';
import axios from 'axios';
import {UPLOAD_FORM, SEARCH_TEXT_REQUEST} from './constants';
import {uploadCSVSuccessfull} from './actions';

export function * uploadFormFlow({payload, meta}) {
    try {
        const data = new FormData();
        data.append('file', payload.file);

        const config = {
            method: 'PUT',
            url: '/upload',
            data,
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                document.getElementById('uploading').innerHTML = `${percentCompleted}% file upload complete`;
            },
        };

        const result = yield call(axios, config);
        yield put(uploadCSVSuccessfull(result.data));
    } catch (error) {
        console.log(error);
        // console.log(routingLoadError(error));
    }
}

export function * uploadFormFlowWatcher() {
    yield takeEvery(UPLOAD_FORM, uploadFormFlow);
}

export function * searchTextFlow({payload, meta}) {
    try {

        const config = {
            method: 'GET',
            url: `/getData/${encodeURIComponent(payload)}/20`
        };

        const result = yield call(axios, config);
        console.log(result);
        //yield put(uploadCSVSuccessfull(result.data));
    } catch (error) {
        console.log(error);
        // console.log(routingLoadError(error));
    }
}

export function * searchTextFlowWatcher() {
    yield takeEvery(SEARCH_TEXT_REQUEST, searchTextFlow);
}

export default [
    fork(uploadFormFlowWatcher),
    fork(searchTextFlowWatcher),
];