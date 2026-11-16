
import { parseCsv } from '../utils/csvimport.js';
import { addExpense } from '../models/expensemodel.js';

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify(data));
}

export async function importExpenses(req, res) {
    try {
        const csvData = req.body;

        if (typeof csvData !== 'string' || !csvData.trim()) {
            return sendResponse(res, 400, {
                message: 'CSV data is required'
            });
        }

        const rows = parseCsv(csvData);

        const importedExpenses = [];

        for (const row of rows) {
            const amount = Number(row.amount);

            if (
                !row.title?.trim() ||
                !Number.isFinite(amount) ||
                amount <= 0 ||
                !row.category?.trim() ||
                !row.date?.trim() ||
                Number.isNaN(Date.parse(row.date)) ||
                !['Cash', 'Card', 'UPI', 'Bank Transfer']
            ) {
                return sendResponse(res, 400, {
                    message: 'Invalid expense data in CSV',
                    row
                });
            }
        }

        for (const row of rows) {
            const expense = await addExpense({
                title: row.title.trim(),
                amount: Number(row.amount),
                category: row.category.trim(),
                paymentMethod: row.paymentMethod.trim().toLowerCase(),
                date: row.date,
                note: row.note?.trim() || '',
                createdAt: new Date().toISOString()
            });

            importedExpenses.push(expense);
        }

        return sendResponse(res, 201, {
            message: 'Expenses imported successfully',
            count: importedExpenses.length,
            expenses: importedExpenses
        });

    } catch (error) {
        return sendResponse(res, 400, {
            message: error.message
        });
    }
}
