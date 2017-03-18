import { createSelector } from 'reselect';

const selectDataLayer = state => state.get('dataLayer');

// Wasn't able to memoize this function (would not rerender in React)
// Need to get rid of this anyway, so it's ok for now...
const selectFromDataLayer = (selector = '', defaultReturnValue = undefined) => {
	const splittedSelector = selector.toString().split('.');
	return createSelector(
		[ selectDataLayer ],
		dataLayerState => dataLayerState.getIn(splittedSelector) || defaultReturnValue
	);
};

export {
	selectDataLayer,
	selectFromDataLayer,
};
