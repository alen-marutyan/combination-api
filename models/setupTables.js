const db = require('../config/database');

const setupTables = async () => {
    const createItemsTable = `CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    )`;

    const createCombinationsTable = `CREATE TABLE IF NOT EXISTS combinations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        combination JSON NOT NULL
    )`;

    const createResponsesTable = `CREATE TABLE IF NOT EXISTS responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        response JSON NOT NULL
    )`;

    try {
        await db.query(createItemsTable);
        await db.query(createCombinationsTable);
        await db.query(createResponsesTable);
        console.log("Tables set up successfully.");
    } catch (error) {
        console.error("Error setting up tables:", error);
    }
};

module.exports = setupTables;
