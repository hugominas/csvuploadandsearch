import { takeEvery, fork, call, put, select } from 'redux-saga/effects';

import { UPLOAD_FORM, UPLOAD_FORM_SUCCESSFUL } from './constants';
import { uploadCSVSuccessfull } from './actions';

export function *uploadFormFlow ({ payload, meta }) {
	try {
		//yield put(uploadCSVSuccessfull());
	} catch (error) {
		// console.log(routingLoadError(error));
	}
}

export function *uploadFormFlowWatcher () {
	yield takeEvery(UPLOAD_FORM, uploadFormFlow);
}
export default [
	fork(uploadFormFlowWatcher),
];
