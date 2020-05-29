import http from 'http';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import LivenServer from "./server/liven-server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

polka({server})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});


/**
 * socket.io configuration
 */

const io = LivenServer(server);

// // listen on /liven-{namespace}
// const nsp = io.of(/^\/liven-.*$/).on('connection', LivenServer.listenOnNsp);
//
// // middleware
// io.use(LivenServer.middlewareDefault);
//
// // listen on globally
// io.on('connection', LivenServer.listenOnDefault);
//
