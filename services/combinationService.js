const db = require('../config/database');
const generateCombinations = require('../utils/generateCombinations');

async function generateAndStoreCombinations(inputItems, combinationLength) {
    const items = new Set();
    const prefixes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    inputItems.forEach((count, index) => {
        const prefix = prefixes[index];
        for (let j = 1; j <= count; j++) {
            items.add(`${prefix}${j}`);
        }
    });

    const itemsToInsert = Array.from(items);

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [existingItems] = await connection.query('SELECT name FROM items');
        const existingItemNames = new Set(existingItems.map(item => item.name));

        const newItems = itemsToInsert.filter(item => !existingItemNames.has(item));
        const itemsValues = newItems.map(name => [name]);

        if (itemsValues.length > 0) {
            await connection.query('INSERT INTO items (name) VALUES ?', [itemsValues]);
        }

        const combinations = generateCombinations(inputItems, combinationLength);

        for (const combo of combinations) {
            await connection.query('INSERT INTO combinations (combination) VALUES (?)', [JSON.stringify(combo)]);
        }

        const [responseResult] = await connection.query(
            'INSERT INTO responses (response) VALUES (?)',
            [JSON.stringify(combinations)]
        );

        await connection.commit();

        return {
            id: responseResult.insertId,
            combination: combinations,
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { generateAndStoreCombinations };
