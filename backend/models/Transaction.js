import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    sold: { type: Boolean, default: false },
    dateOfSale: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
