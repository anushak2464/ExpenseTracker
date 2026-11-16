export function errorHandler(error, req, res) {
    console.error('Request ID:', req.id);
    console.error(error);

    if (res.headersSent) {
        if (!res.writableEnded) {
            res.destroy(error);
        }
        return;
    }

    res.writeHead(500, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify({
        message: 'Internal server error',
        requestId: req.id
    }));
}