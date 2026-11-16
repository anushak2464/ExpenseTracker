import { performance } from 'node:perf_hooks';

export function logger(req, res, next) {
    const start = performance.now();

    res.on('finish', () => {
        const duration = (performance.now() - start).toFixed(2);

        console.log(
            `${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
        );
    });

    next();
}