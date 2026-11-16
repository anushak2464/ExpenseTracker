import {
    getExpenses,
    getExpense,
    createExpense,
    editExpense,
    removeExpense
} from '../controllers/expensecontroller.js';
import { exportExpenses } from '../controllers/csvexportcontroller.js';
import { importExpenses } from '../controllers/csvimportcontroller.js';

export default async function expenseroutes(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const pathname = url.pathname;
    req.query = url.searchParams;

    if (req.method === 'GET' && pathname === '/api/expenses/export') {
        await exportExpenses(req, res);
        return true;
    }

if (req.method === 'POST' && pathname === '/api/expenses/import') {
    await importExpenses(req, res);
    return true;
}

    if (
        req.method === 'GET' &&
        pathname === '/api/expenses'
    ) {
        return await getExpenses(req, res);
    }

    if (
        req.method === 'POST' &&
        pathname === '/api/expenses'
    ) {
        return await createExpense(req, res);
    }
    const match = pathname.match(/^\/api\/expenses\/([^/]+)$/);

    if (match) {
        let id;

        try {
            id = decodeURIComponent(match[1]);
        } catch {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                message: 'Invalid expense ID'
            }));
        }

        if (req.method === 'GET') {
            return await getExpense(req, res, id);
        }

        if (req.method === 'PUT') {
            return await editExpense(req, res, id);
        }
        if (req.method === 'PATCH') {
            return await editExpense(req, res, id);
        }

        if (req.method === 'DELETE') {
            return await removeExpense(req, res, id);
        }
     res.writeHead(405, {
            'Content-Type': 'application/json; charset=utf-8',
            'Allow': 'GET, PUT, PATCH, DELETE'
        });

        return res.end(JSON.stringify({
            message: 'Method not allowed'
        }));   
    }
return false;
}
