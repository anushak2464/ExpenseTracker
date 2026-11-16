
export function parseCsv(csvData) {
    const rows = [];
    let row = [];
    let field = '';
    let insideQuotes = false;

    for (let i = 0; i < csvData.length; i++) {
        const char = csvData[i];

        if (char === '"') {
            if (insideQuotes && csvData[i + 1] === '"') {
                field += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            row.push(field);
            field = '';
        } else if (
            (char === '\n' || char === '\r') &&
            !insideQuotes
        ) {
            if (char === '\r' && csvData[i + 1] === '\n') {
                i++;
            }

            row.push(field);

            if (row.some(value => value.trim() !== '')) {
                rows.push(row);
            }

            row = [];
            field = '';
        } else {
            field += char;
        }
    }

    if (insideQuotes) {
        throw new Error('Invalid CSV: unclosed quotation mark');
    }

    row.push(field);

    if (row.some(value => value.trim() !== '')) {
        rows.push(row);
    }

    if (rows.length < 2) {
        throw new Error('CSV must contain headers and at least one data row');
    }

    const headers = rows[0].map(header => header.trim());

    if (headers.some(header => !header)) {
        throw new Error('CSV contains an empty header');
    }

    if (new Set(headers).size !== headers.length) {
        throw new Error('CSV contains duplicate headers');
    }

    return rows.slice(1).map(values => {
        if (values.length !== headers.length) {
            throw new Error('CSV row has an incorrect number of columns');
        }

        return Object.fromEntries(
            headers.map((header, index) => [
                header,
                values[index]
            ])
        );
    });
}
