import express from 'express';
import db from '../db.js';

const router = express.Router();

/**
 * GET /api/products/search
 * 關鍵字篩選或搜尋商品
 */
router.get('/search', (req, res) => {
    const query = req.query.q || '';
    const sql = `SELECT * FROM Products WHERE name LIKE ? OR item_code LIKE ?`;
    const params = [`%${query}%`, `%${query}%`];

    try {
        const rows = db.prepare(sql).all(params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * GET /api/products/:id/history
 * 獲取歷史價格清單
 */
router.get('/:id/history', (req, res) => {
    const sql = `SELECT * FROM Price_History WHERE product_id = ? ORDER BY recorded_at ASC`;
    try {
        const rows = db.prepare(sql).all(req.params.id);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * POST /api/prices
 * 手動輸入 (日期, 商品名稱, 價格)
 * 若商品名稱不存在則自動創建
 */
router.post('/prices', (req, res) => {
    const { date, name, price, item_code } = req.body;
    
    if (!date || !name || !price) {
        return res.status(400).json({ error: 'Missing date, name, or price' });
    }

    try {
        // 1. Find or create product
        let product = db.prepare(`SELECT id FROM Products WHERE name = ?`).get(name);

        let productId;
        if (product) {
            productId = product.id;
        } else {
            const code = item_code || `MANUAL-${Date.now()}`;
            const info = db.prepare(`INSERT INTO Products (name, item_code) VALUES (?, ?)`).run(name, code);
            productId = info.lastInsertRowid;
        }

        // 2. Insert price
        // 檢查是否已存在相同日期與價格的資料
        const checkSql = `SELECT id FROM Price_History WHERE product_id = ? AND recorded_at = ? AND price = ?`;
        const existingRow = db.prepare(checkSql).get(productId, date, price);
        
        if (existingRow) {
            // 資料已存在，不重複插入
            return res.json({ success: true, message: '資料已存在，跳過重複錄入', id: existingRow.id });
        }

        const sql = `INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) 
                        VALUES (?, ?, 'LIST', ?, ?)`;
        const info = db.prepare(sql).run(productId, price, date, '手動輸入');
        res.json({ success: true, id: info.lastInsertRowid });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
