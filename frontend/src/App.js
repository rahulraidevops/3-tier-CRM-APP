import React, {useEffect, useState} from "react";
import axios from "axios";

const API_URL = "/api/customers";

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({name: "", email: "", phone: "", company: ""});
  const [editId, setEditId] = useState(null);

  // Fetch customers
  useEffect(() => {
    axios.get(API_URL).then(res => setCustomers(res.data));
  }, []);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      // Edit
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      // Add
      await axios.post(API_URL, form);
    }
    setForm({name: "", email: "", phone: "", company: ""});
    setEditId(null);
    const res = await axios.get(API_URL);
    setCustomers(res.data);
  };

  const handleEdit = c => {
    setForm({name: c.name, email: c.email, phone: c.phone || "", company: c.company || ""});
    setEditId(c._id);
  };

  const handleDelete = async id => {
    await axios.delete(`${API_URL}/${id}`);
    setCustomers(customers.filter(c => c._id !== id));
    if (editId === id) {
      setForm({name: "", email: "", phone: "", company: ""});
      setEditId(null);
    }
  };

  return (
    <div style={{margin: 40, maxWidth: 600}}>
      <h1>CRM</h1>
      <form onSubmit={handleSubmit} style={{marginBottom: 32}}>
        <input required name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
        <input required name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange}/>
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({name:"",email:"",phone:"",company:""})}}>Cancel Edit</button>}
      </form>
      <table border="1" cellPadding={6} width="100%">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Actions</th></tr>
        </thead>
        <tbody>
        {customers.map(c =>
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>{c.company}</td>
            <td>
              <button onClick={()=>handleEdit(c)}>Edit</button>
              <button onClick={()=>handleDelete(c._id)}>Delete</button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

