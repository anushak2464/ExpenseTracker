import http from 'node:http';
import expenseroutes from './routes/expenseroutes.js';

import { requestId } from './middleware/requestId.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { logger } from './middleware/logger.js';
const PORT = 3000;
const server = http.createServer(async(req,res)=>{
    requestId(req,res,async() =>{
        logger(req, res, async () => {
    
try {
    const chunks = [];

    if (
        req.method === 'POST' ||
        req.method === 'PUT' ||
        req.method === 'PATCH'
    ) {
        const contentType = req.headers['content-type'] || '';
        const url = new URL(req.url, 'http://localhost');

        const isCsvImport =
            req.method === 'POST' &&
            url.pathname === '/api/expenses/import';
        if (isCsvImport && !contentType.includes('text/csv') &&
            !contentType.includes('text/plain')) {
            res.writeHead(415, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                message: 'Content-Type must be text/csv'
            }));
        }

        if (!isCsvImport && !contentType.includes('application/json')) {
            res.writeHead(415, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                message: 'Content-Type must be application/json'
            }));
        }
        let bodySize = 0;

        for await (const chunk of req) {
            bodySize += chunk.length;

            if (bodySize > 1024 * 1024) {
                res.writeHead(413, {
                    'Content-Type': 'application/json'
                });

                return res.end(JSON.stringify({
                    message: 'Request body too large'
                }));
            }

            chunks.push(chunk);
        }

        const rawBody = Buffer.concat(chunks).toString('utf8');

        if (isCsvImport) {
            req.body = rawBody;
        } else {
            try {
                req.body = rawBody ? JSON.parse(rawBody) : {};
            } catch {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                return res.end(JSON.stringify({
                    message: 'Invalid JSON format'
                }));
            }
        }
    }

    const handled = await expenseroutes(req, res);

    if (!handled && !res.writableEnded) {
        notFound(req, res);
    }

    } catch(error){
           errorHandler(error, req, res); 
        }
    });
});
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
