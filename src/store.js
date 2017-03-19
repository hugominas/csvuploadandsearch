import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import rootSagas from './sagas';
import createSagaMiddleware from 'redux-saga';

export default function (initialState) {
    // create the saga middleware
	const sagaMiddleware = createSagaMiddleware();

	const finalCreateStore = compose(
		applyMiddleware(sagaMiddleware),
		typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
	)(createStore);

	const store = finalCreateStore(rootReducer, initialState);

    // then run the saga
	sagaMiddleware.run(rootSagas);

	if (module.hot) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', () => {
	      	const nextRootReducer = require('./reducers').default;
	      	store.replaceReducer(nextRootReducer);
	    });
	}

	return store;
}
