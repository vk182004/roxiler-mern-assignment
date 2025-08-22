// backend/models/User.js
import mongoose from 'mongoose'; // ✅ Change to import

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Admin', 'StoreOwner', 'User'],
    default: 'User'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema); // ✅ Change to export default
