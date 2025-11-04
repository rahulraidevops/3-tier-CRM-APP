import React, { useEffect, useState } from 'react';


const API_BASE = process.env.REACT_APP_API_URL || '/api';


function App() {
const [customers, setCustomers] = useState([]);
const [form, setForm] = useState({ name: '', email: '', phone: '' });
const [loading, setLoading] = useState(false);


useEffect(() => {
fetch(`${API_BASE}/api/customers`)
.then(r => r.json())
.then(setCustomers)
.catch(console.error);
}, []);


const add = async () => {
if (!form.name) return alert('name required');
setLoading(true);
try {
const res = await fetch(`${API_BASE}/api/customers`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form)
});
const created = await res.json();
setCustomers(prev => [created, ...prev]);
setForm({ name: '', email: '', phone: '' });
} catch (err) {
console.error(err);
alert('failed to add');
} finally { setLoading(false); }
};


return (
<div style={{ padding: 20 }}>
<h1>Mini CRM</h1>
<div style={{ marginBottom: 10 }}>
<input placeholder="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
<input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
<input placeholder="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
<button onClick={add} disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
</div>
<ul>
{customers.map(c => (
<li key={c._id}>{c.name} — {c.email} — {c.phone}</li>
))}
</ul>
</div>
);
}


export default App;
