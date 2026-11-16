
import {
    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
} from '../models/expensemodel.js';

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
}

function validateExpense(data) {
    if (
        typeof data.title !== 'string' ||
        !data.title.trim() ||
        typeof data.amount !== 'number' ||
        !Number.isFinite(data.amount) ||
        data.amount <= 0 ||
        typeof data.category !== 'string' ||
        !data.category.trim() ||
        typeof data.date !== 'string' ||
        !data.date.trim() ||
        Number.isNaN(Date.parse(data.date))
    ) {
        return false;
    }

    const validPaymentMethods = [
        'Cash',
        'Card',
        'UPI',
        'Bank Transfer'
    ];

    if (!validPaymentMethods.includes(data.paymentMethod)) {
        return false;
    }

    if (
        data.note !== undefined &&
        typeof data.note !== 'string'
    ) {
        return false;
    }

    return true;
}

export async function getExpenses(req, res) {
    let expenses = await getAllExpenses();

    const category = req.query.get('category');
    const date = req.query.get('date');

    // Filter by category
    if (category) {
        expenses = expenses.filter(
            expense =>
                expense.category.toLowerCase() === category.toLowerCase()
        );
        if (expenses.length === 0) {
        return sendResponse(res, 404, {
            message: 'Category not found'
        });
    }
    }
    
    // Filter by date
    if (date) {
    expenses = expenses.filter(
        expense => expense.date === date
    );

    if (expenses.length === 0) {
        return sendResponse(res, 404, {
            message: 'Expenses not found for this date'
        });
    }
}

    sendResponse(res, 200, {
        message: 'Expenses fetched successfully',
        expenses
    });
}

// GET expense by ID
export async function getExpense(req, res, id) {
    const expense = await getExpenseById(id);

    if (!expense) {
        return sendResponse(res, 404, {
            message: 'Expense not found'
        });
    }

    sendResponse(res, 200, {
        message: 'Expense fetched successfully',
        expense
    });
}

// POST create expense
export async function createExpense(req, res) {
    if (!validateExpense(req.body)) {
        return sendResponse(res, 400, {
            message: 'Invalid expense data'
        });
    }

    const expense = await addExpense({
        title: req.body.title.trim(),
        amount: req.body.amount,
        category: req.body.category.trim(),
        paymentMethod: req.body.paymentMethod,
        date: req.body.date,
        note: req.body.note?.trim() || '',
        createdAt: new Date().toISOString()
    });

    sendResponse(res, 201, {
        message: 'Expense added successfully',
        expense
    });
}


export async function editExpense(req, res, id) {
    const existingExpense = await getExpenseById(id);

    if (!existingExpense) {
        return sendResponse(res, 404, {
            message: 'Expense not found'
        });
    }
    

    if (
        !req.body ||
        typeof req.body !== 'object' ||
        Array.isArray(req.body)
    ) {
        return sendResponse(res, 400, {
            message: 'Invalid expense data'
        });
    }

    // PUT update all fields
    if (req.method === 'PUT') {
        const requiredFields = [
            'title',
            'amount',
            'category',
            'paymentMethod',
            'date'
        ];

        const missingFields = requiredFields.filter(
            field => req.body[field] === undefined
        );

        if (missingFields.length > 0) {
            return sendResponse(res, 400, {
                message: 'PUT requires all fields',
                missingFields
            });
        }
    }

    // PATCH updates only the fields 
    const updatedData = {
        ...existingExpense,
        ...req.body
    };

    if (!validateExpense(updatedData)) {
        return sendResponse(res, 400, {
            message: 'Invalid expense data'
        });
    }

    const expense = await updateExpense(id, {
        title: updatedData.title.trim(),
        amount: updatedData.amount,
        category: updatedData.category.trim(),
        paymentMethod: updatedData.paymentMethod,
        date: updatedData.date,
        note: updatedData.note?.trim() || '',
        createdAt: existingExpense.createdAt,
        updatedAt: new Date().toISOString()
    });

    sendResponse(res, 200, {
        message: 'Expense updated successfully',
        expense
    });
}

// DELETE expense
export async function removeExpense(req, res, id) {
    const deleted = await deleteExpense(id);

    if (!deleted) {
        return sendResponse(res, 404, {
            message: 'Expense not found'
        });
    }

    sendResponse(res, 200, {
        message: 'Expense deleted successfully'
    });
}















