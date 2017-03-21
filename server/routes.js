import url from 'url';
import search from './controlers/search';
import upload from './controlers/upload';
/**
 * Attempt to serve static requests from the public folder.
 */
export default [ {
	method: 'GET',
	path: '/{params*}',
	handler: {
		file: (request) => 'static' + request.path,
	},
}, {
	method: 'POST',
	path: '/import',
	config: {
		payload: {
			maxBytes: 20 * 1024 * 1024,
			output: 'stream',
		},
	},
	handler: upload,
}, {
	method: 'POST',
	path: '/search',
	handler: search,
} ];
