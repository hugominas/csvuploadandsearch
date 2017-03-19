import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import uploadReducer from 'containers/Upload/reducer';

const rootReducer = combineReducers({
	upload: uploadReducer,
	routing: routerReducer,
});

export default rootReducer;
