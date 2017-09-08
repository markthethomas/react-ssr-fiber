import React from 'react';
import fs from 'fs';
import { Transform } from 'stream';
import path from 'path';
import { createServer } from 'http';
import { parse as parseURL } from 'url';
import { renderToNodeStream } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { StaticRouter } from 'react-router';

import routes from './routes';
import Root from './Root';

class InterceptStream extends Transform {
    _transform(obj, encoding, callback) {
        const templateHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Server side rendering with React Router v4 and React 16 ("fiber")</title>
                <link rel="stylesheet" href="/static/css/main.css" />
            </head>
            <body>
                <div id="root">
                    ${obj.toString()}
                </div>
                <script async src="/static/js/main.js"></script>
            </body></html>
        `;
        return callback(null, templateHTML);
    }
}

createServer(async (req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        return res.end();
    }
    const url = parseURL(req.url);
    // Super basic static file serving
    if (url.pathname.indexOf('/static/') !== -1) {
        const fileToSend = path.resolve(
            __dirname,
            '..',
            'build',
            'static',
            url.pathname.split('/static/').slice(1)[0]
        );
        if (!fileToSend) {
            res.writeHead(404);
            return res.end('not found');
        }
        try {
            res.writeHead(200);
            return res.end(fs.readFileSync(fileToSend));
        } catch (e) {
            res.writeHead(404);
            return res.end('not found');
        }
    }
    const context = {};
    const route = routes.find(route => matchPath(req.url, route));
    const initialProps =
        route && route.getInitialProps ? await route.getInitialProps() : [];
    const htmlStream = renderToNodeStream(
        <StaticRouter location={req.url} context={context}>
            <Root {...initialProps} />
        </StaticRouter>
    );
    const templateIntercept = new InterceptStream();
    htmlStream.pipe(templateIntercept).pipe(res);
}).listen(3000);
