/**
 * Step 15: Advanced API Contract Engineering
 * Architecture: RESTful Level 3 (HATEOAS), Idempotent Mechanics, & Cursor Pagination
 * Standard: Enterprise/Cloud-Native Grade
 */

const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// In-Memory cache to store Idempotency Keys (TTL usually handled by Redis in production)
const idempotencyCache = new Set();

// --- 🛡️ Architectural Middleware: Idempotency Enforcer ---
// Ensures that retried requests (e.g., due to network drops) do not create duplicate resources.
const requireIdempotencyKey = (req, res, next) => {
    const key = req.headers['x-idempotency-key'];
    if (!key) {
        return res.status(400).json({ error: 'System Fault: Missing X-Idempotency-Key header for state-mutating operation.' });
    }
    if (idempotencyCache.has(key)) {
        return res.status(409).json({ error: 'Conflict: This operation has already been processed.' });
    }
    idempotencyCache.add(key);
    next();
};

// --- 🌐 API Endpoints (Richardson Maturity Model Level 3) ---

// 1. GET: Cursor-Based Pagination & HATEOAS Implementation
app.get('/api/v2/projects', (req, res) => {
    // Simulating database cursor logic for highly scalable data fetching
    const cursor = req.query.cursor || null;
    
    const responsePayload = {
        data: [
            { id: 'prj_9a8b7', title: 'Data-Driven Management Core', status: 'active' }
        ],
        meta: {
            pagination: {
                has_next: true,
                next_cursor: 'cursor_eyJpZCI6MTB9' // Base64 encoded cursor pointer
            }
        },
        // HATEOAS: Hypermedia as the Engine of Application State
        // The server dictates to the client what actions are legally available next.
        _links: {
            self: { href: '/api/v2/projects' },
            create_new: { href: '/api/v2/projects', method: 'POST' },
            view_metrics: { href: '/api/v2/projects/prj_9a8b7/metrics', method: 'GET' }
        }
    };
    
    res.status(200).json(responsePayload);
});

// 2. POST: Secure, Idempotent Resource Provisioning
app.post('/api/v2/projects', requireIdempotencyKey, (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Validation Error: Title is required' });
    }

    const newResource = {
        id: `prj_${crypto.randomBytes(4).toString('hex')}`,
        title,
        created_at: new Date().toISOString()
    };
    
    res.status(201).json({
        message: 'Resource provisioned successfully',
        data: newResource,
        _links: {
            self: { href: `/api/v2/projects/${newResource.id}` },
            delete: { href: `/api/v2/projects/${newResource.id}`, method: 'DELETE' }
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Advanced API Contracts Engine running on Port ${PORT}`);
    console.log(`🛡️ Idempotency constraints and HATEOAS links are active.`);
});
