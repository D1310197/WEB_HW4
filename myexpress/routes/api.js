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

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

/**
 * GET /api/products/:id/history
 * 獲取歷史價格清單
 */
router.get('/:id/history', (req, res) => {
    const sql = `SELECT * FROM Price_History WHERE product_id = ? ORDER BY recorded_at ASC`;
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
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

    // 1. Find or create product
    db.get(`SELECT id FROM Products WHERE name = ?`, [name], (err, product) => {
        if (err) return res.status(500).json({ error: err.message });

        if (product) {
            insertPrice(product.id);
        } else {
            const code = item_code || `MANUAL-${Date.now()}`;
            db.run(`INSERT INTO Products (name, item_code) VALUES (?, ?)`, [name, code], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                insertPrice(this.lastID);
            });
        }
    });

    function insertPrice(productId) {
        // 檢查是否已存在相同日期與價格的資料
        const checkSql = `SELECT id FROM Price_History WHERE product_id = ? AND recorded_at = ? AND price = ?`;
        db.get(checkSql, [productId, date, price], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            
            if (row) {
                // 資料已存在，不重複插入
                return res.json({ success: true, message: '資料已存在，跳過重複錄入', id: row.id });
            }

            const sql = `INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) 
                         VALUES (?, ?, 'LIST', ?, ?)`;
            db.run(sql, [productId, price, date, '手動輸入'], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, id: this.lastID });
            });
        });
    }
});

export default router;
