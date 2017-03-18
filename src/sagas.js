import uploadSagas from 'containers/Upload/sagas';

export default function *root () {
	// Add your global sagas here, stuff that has to be able to run everywhere
	yield [
		...uploadSagas,
	];
};
