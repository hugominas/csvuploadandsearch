import { Server } from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import configureStore from './store.js';
import RadiumContainer from './containers/RadiumContainer';
import { Provider } from 'react-redux';
import routesContainer from './routes';
import serveRoutes from '../server/routes';

let routes = routesContainer;

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const initialState = store.getState();
/**
 * Start Hapi server
 */
var envset = {
	production: process.env.NODE_ENV === 'production',
};

const hostname = envset.production ? (process.env.HOSTNAME || process['env'].HOSTNAME) : 'localhost';
var port = envset.production ? (process.env.PORT || process['env'].PORT) : 8000;
const server = new Server();

server.connection({ host: hostname, port: port });

server.register(
	[
		h2o2,
		inert,
        // WebpackPlugin
	],
    (err) => {
	if (err) {
		throw err;
	}

	server.start(() => {
		console.info('==> ✅  Server is listening');
		console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase());
	});
});
server.route(serveRoutes);

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext('onPreResponse', (request, reply) => {
	if (typeof request.response.statusCode !== 'undefined') {
		return reply.continue();
	}

	match({ routes, location: request.path }, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			reply.redirect(redirectLocation.pathname + redirectLocation.search);
			return;
		}
		if (error || !renderProps) {
			reply.continue();
			return;
		}
		const reactString = ReactDOM.renderToString(
			<Provider store={store}>
				<RadiumContainer radiumConfig={{ userAgent: request.headers['user-agent'] }}>
					<RouterContext {...renderProps} />
				</RadiumContainer>
			</Provider>
        );
		const webserver = process.env.NODE_ENV === 'production' ? '' : `//${hostname}:8080`;
		const output = (
            `<!doctype html>
		<html lang="en-us">
			<head>
				<meta charset="utf-8">
				<title>CSV Upload and Search</title>
				<link rel="shortcut icon" href="/favicon.ico">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">

			</head>
			<body>
				<div id="react-root">${reactString}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
					window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
				</script>
				<script src=${webserver}/dist/client.js></script>
			</body>
		</html>`
        );
		reply(output);
	});
});

if (__DEV__) {
	if (module.hot) {
		console.log('[HMR] Waiting for server-side updates');

		module.hot.accept('./routes', () => {
			routes = require('./routes');
		});

		module.hot.addStatusHandler((status) => {
			if (status === 'abort') {
				setTimeout(() => process.exit(0), 0);
			}
		});
	}
}
