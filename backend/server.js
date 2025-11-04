const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/crmdb';


// Connect
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));


// Simple Customer schema
const customerSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String },
phone: { type: String }
}, { timestamps: true });


const Customer = mongoose.model('Customer', customerSchema);


// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));


// CRUD (basic)
app.get('/api/customers', async (req, res) => {
const customers = await Customer.find().sort({ createdAt: -1 });
res.json(customers);
});


app.post('/api/customers', async (req, res) => {
try {
const { name, email, phone } = req.body;
if (!name) return res.status(400).json({ error: 'name required' });
const c = new Customer({ name, email, phone });
await c.save();
res.status(201).json(c);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal error' });
}
});


app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
