import fs from 'fs-extra';
import url from 'url';
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
	handler: function (request, reply) {
        // This is the directory you wish to place the files.
		const uploadDir = './uploads/';
        // Create stream where the files will go.
		const writeStream = fs.createWriteStream(uploadDir + request.payload.file.hapi.filename);

        // Pipe the payload file into the write stream.
		request.payload.file.pipe(writeStream);

        // On stream end or error send a response.
		request.payload.file.on('end', function () {
			reply({ 'Status': 'Done' });
		}).on('error', function (e) {
			reply(e);
		});
	},
}, {
	method: 'PUT',
	path: '/getData/{amount}',
	config: {
		payload: {
			output: 'stream',
		},
	},
	handler: function (request, reply) {

	},
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
