import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Render persistent disk path or local path
const dbPath = process.env.RENDER_DISK_PATH 
    ? path.join(process.env.RENDER_DISK_PATH, 'database.sqlite')
    : path.resolve(__dirname, 'database.sqlite');

// Ensure target folder exists before opening SQLite file.
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath, { verbose: console.log });
console.log('Connected to the SQLite database.');

initializeDatabase();

function initializeDatabase() {
    // Products Table
    db.exec(`CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        model_group_id TEXT,
        item_code TEXT NOT NULL UNIQUE,
        name TEXT,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Price_History Table
    db.exec(`CREATE TABLE IF NOT EXISTS Price_History (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        price INTEGER NOT NULL,
        price_type TEXT CHECK(price_type IN ('LIST', 'SALE')),
        recorded_at DATE NOT NULL,
        change_reason TEXT,
        FOREIGN KEY (product_id) REFERENCES Products(id)
    )`);

    console.log('Database tables initialized.');
}

export default db;
