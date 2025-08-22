import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Transaction from "./models/Transaction.js";

dotenv.config();

const sampleTransactions = [
  {
    title: "Nike Running Shoes",
    price: 120,
    description: "Comfortable sports shoes",
    category: "Footwear",
    sold: true,
    dateOfSale: new Date("2024-02-10")
  },
  {
    title: "Leather Jacket",
    price: 250,
    description: "Black biker jacket",
    category: "Clothing",
    sold: false,
    dateOfSale: new Date("2024-03-18")
  },
  {
    title: "iPhone 14 Pro",
    price: 999,
    description: "Apple smartphone",
    category: "Electronics",
    sold: true,
    dateOfSale: new Date("2024-03-22")
  },
  {
    title: "Office Chair",
    price: 199,
    description: "Ergonomic chair",
    category: "Furniture",
    sold: true,
    dateOfSale: new Date("2024-03-15")
  },
  {
    title: "Bluetooth Headphones",
    price: 89,
    description: "Noise cancelling headphones",
    category: "Electronics",
    sold: false,
    dateOfSale: new Date("2024-02-14")
  },
  {
    title: "MacBook Air",
    price: 1200,
    description: "Laptop device",
    category: "Electronics",
    sold: true,
    dateOfSale: new Date("2024-01-28")
  },
  {
    title: "Adidas Hoodie",
    price: 75,
    description: "Comfortable cotton hoodie",
    category: "Clothing",
    sold: true,
    dateOfSale: new Date("2024-04-03")
  },
  {
    title: "Wooden Dining Table",
    price: 550,
    description: "6 seater wooden dining table",
    category: "Furniture",
    sold: false,
    dateOfSale: new Date("2024-03-07")
  },
  {
    title: "Samsung Galaxy S23",
    price: 950,
    description: "Android flagship phone",
    category: "Electronics",
    sold: true,
    dateOfSale: new Date("2024-03-20")
  },
  {
    title: "Gaming Keyboard",
    price: 110,
    description: "RGB mechanical keyboard",
    category: "Electronics",
    sold: false,
    dateOfSale: new Date("2024-02-27")
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Transaction.deleteMany(); // clear old data
    await Transaction.insertMany(sampleTransactions);
    console.log("✅ Sample Transactions Inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }
};
console.log(sampleTransactions)

importData();
