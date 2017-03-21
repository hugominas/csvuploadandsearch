import { takeEvery, fork, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_FORM, SEARCH_TEXT_REQUEST } from './constants';
import { uploadCSVSuccessfull, searchSuccessful } from './actions';
import { selectDataFileName } from './selectors';

export function * uploadFormFlow ({ payload, meta }) {
	try {
		const data = new FormData();
		data.append('file', payload.file);

		const config = {
			method: 'POST',
			url: '/import',
			data,
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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

export function * uploadFormFlowWatcher () {
	yield takeEvery(UPLOAD_FORM, uploadFormFlow);
}

export function * searchTextFlow ({ payload, meta }) {
	try {
		const config = {
			method: 'POST',
			url: `/search`,
			data: {
				query: `${encodeURIComponent(payload)}`,
			},
		};

		const result = yield call(axios, config);
		yield put(searchSuccessful(result.data.results));
	} catch (error) {
		console.log(error);
	}
}

export function * searchTextFlowWatcher () {
	yield takeEvery(SEARCH_TEXT_REQUEST, searchTextFlow);
}

export default [
	fork(uploadFormFlowWatcher),
	fork(searchTextFlowWatcher),
];
