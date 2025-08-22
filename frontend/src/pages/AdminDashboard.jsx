import { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleAddStore = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/stores', 
        { name: storeName, address: storeAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setStoreName(''); // Clear form
      setStoreAddress('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error!');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>
      
      <h3>Add a New Store</h3>
      <form onSubmit={handleAddStore}>
        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Store Address"
          value={storeAddress}
          onChange={(e) => setStoreAddress(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Store</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminDashboard;
