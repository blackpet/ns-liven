import http from 'http';
import sirv from 'sirv';
import polka from 'polka';
import {createProxyMiddleware} from 'http-proxy-middleware'
import compression from 'compression';
import * as sapper from '@sapper/server';
import LivenServer from "./server/liven-server";
import {env} from './env'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

polka({server})
	.use('/api', createProxyMiddleware({
		changeOrigin: true,
		logLevel: 'debug',
		target: env.nsedu,
		pathRewrite: {
			'^/api': ''
		},
		router: {
			'172.26.10.103:4003': 'http://172.26.10.103:8080',
			'172.26.10.101:5000': 'http://172.26.10.101:8080',
			'vod.nscampus.net': 'http://172.25.1.104:8023',
		}
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				ns: undefined,
				role: undefined,
				user: req.user
			})
		})
	)
	.listen(PORT || 5000, err => {
		if (err) console.log('error', err);
	});


/**
 * socket.io configuration
 */

const io = LivenServer(server);
