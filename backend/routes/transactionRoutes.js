import express from "express";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /api/transactions
 * @desc Get all transactions (with optional month + search filter + pagination)
 * @access Private
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    let { month, search, page = 1, limit = 10 } = req.query;

    let filter = {};

    // 🔍 Filter by month
    if (month) {
      const startDate = new Date(`2024-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      filter.dateOfSale = { $gte: startDate, $lt: endDate };
    }

    // 🔍 Search by title / description / category
    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { category: new RegExp(search, "i") }
      ];
    }

    // 📑 Pagination
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: transactions
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
});

/**
 * @route GET /api/transactions/stats
 * @desc Get statistics for selected month
 */
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Month is required" });

    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate }
    });
const totalSaleAmount=100;
   /* const totalSaleAmount = transactions.reduce((sum, t) => sum + (t.sold ? t.price : 0), 0); */


    const totalSoldItems = transactions.filter(t => t.sold).length;
    const totalNotSoldItems = transactions.filter(t => !t.sold).length;

    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).json({ message: "Error generating stats", error: error.message });
  }
});

/**
 * @route GET /api/transactions/bar
 * @desc Data for Bar Chart (price ranges)
 */
router.get("/bar", authMiddleware, async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Month is required" });

    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate }
    });

    // Create buckets
    const priceRanges = [
      "0-100", "101-200", "201-300", "301-400", "401-500",
      "501-600", "601-700", "701-800", "801-900", "901-above"
    ];

    const result = {};
    priceRanges.forEach(range => (result[range] = 0));

    transactions.forEach(t => {
      if (t.price <= 100) result["0-100"]++;
      else if (t.price <= 200) result["101-200"]++;
      else if (t.price <= 300) result["201-300"]++;
      else if (t.price <= 400) result["301-400"]++;
      else if (t.price <= 500) result["401-500"]++;
      else if (t.price <= 600) result["501-600"]++;
      else if (t.price <= 700) result["601-700"]++;
      else if (t.price <= 800) result["701-800"]++;
      else if (t.price <= 900) result["801-900"]++;
      else result["901-above"]++;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error generating bar chart data", error: error.message });
  }
});

/**
 * @route GET /api/transactions/pie
 * @desc Data for Pie Chart by Category
 */
router.get("/pie", authMiddleware, async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Month is required" });

    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate }
    });

    const categoryCount = {};
    transactions.forEach(t => {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    });

    res.json(categoryCount);
  } catch (error) {
    res.status(500).json({ message: "Error generating pie chart data", error: error.message });
  }
});

export default router;
