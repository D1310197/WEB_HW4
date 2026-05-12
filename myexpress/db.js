import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Products Table
        db.run(`CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            model_group_id TEXT,
            item_code TEXT NOT NULL UNIQUE,
            name TEXT,
            category TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Price_History Table
        db.run(`CREATE TABLE IF NOT EXISTS Price_History (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            price INTEGER NOT NULL,
            price_type TEXT CHECK(price_type IN ('LIST', 'SALE')),
            recorded_at DATE NOT NULL,
            change_reason TEXT,
            FOREIGN KEY (product_id) REFERENCES Products(id)
        )`);

        console.log('Database tables initialized.');
    });
}

export default db;
