import React from 'react';
import { Router, Route } from 'react-router';
import Upload from './containers/Upload';


/**
 * The React Routes for both the server and the client.
 */
module.exports = (
	<Router>
		<Route component={Upload}>
			<Route path="/" component={Upload} />
			<Route path="/asda" component={Upload} />
		</Route>
	</Router>
);
