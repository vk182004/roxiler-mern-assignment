// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function UserDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [month, setMonth] = useState("03");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transactions?month=${month}&search=${search}&page=${page}&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(res.data.data);
        setTotal(res.data.total);

        const statsRes = await axios.get(`http://localhost:5000/api/transactions/stats?month=${month}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsRes.data);

        const barRes = await axios.get(`http://localhost:5000/api/transactions/bar?month=${month}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const barChartData = Object.keys(barRes.data).map(key => ({
          range: key,
          count: barRes.data[key]
        }));
        setBarData(barChartData);

        const pieRes = await axios.get(`http://localhost:5000/api/transactions/pie?month=${month}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const pieChartData = Object.keys(pieRes.data).map(key => ({
          name: key,
          value: pieRes.data[key]
        }));
        setPieData(pieChartData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [month, search, page, token]);

  const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#8884d8","#82ca9d"];

  return (
    <div className="container">
      <h2>📊 User Dashboard</h2>
      
      {/* Your existing dashboard UI code here */}
      {/* ... rest of your component ... */}
      
    </div>
  );
}

export default UserDashboard; 
