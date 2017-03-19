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
	method: 'PUT',
	path: '/upload',
	config: {
		payload: {
			output: 'stream',
		},
	},
	handler: upload
}, {
	method: 'GET',
	path: '/getData/{filename}/{amount?}',
	handler: search
}, {
	method: 'GET',
	path: '/api/github/{path*}',
	handler: {
		proxy: {
			passThrough: true,
			mapUri (request, callback) {
				callback(null, url.format({
					protocol: 'https',
					host: 'api.github.com',
					pathname: request.params.path,
					query: request.query,
				}));
			},
			onResponse (err, res, request, reply, settings, ttl) {
				reply(res);
			},
		},
	},
} ];
