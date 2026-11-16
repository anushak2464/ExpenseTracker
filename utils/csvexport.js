const headers = [
    'id',
    'title',
    'amount',
    'category',
    'paymentMethod',
    'date',
    'note',
    'createdAt',
    'updatedAt'
];

function escapeCsvValue(value) {
    const stringValue = String(value ?? '');

    if (
        stringValue.includes(',') ||
        stringValue.includes('"') ||
        stringValue.includes('\n') ||
        stringValue.includes('\r')
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
}

export function convertExpensesToCsv(expenses) {
    const headerRow = headers.join(',');

    const dataRows = expenses.map(expense => {
        return headers.map(header => {
            return escapeCsvValue(expense[header]);
        }).join(',');
    });

    return [headerRow, ...dataRows].join('\r\n');
}