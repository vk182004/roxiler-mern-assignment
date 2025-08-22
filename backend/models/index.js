// backend/models/index.js
import connectDB from '../config/db.js'; // Import Mongoose connection

// Import your Mongoose models - they auto-register with Mongoose
import './Store.js'; // This imports and registers the Store model
import './User.js';  // Import other models as needed

// Export just the connection function (no models needed since Mongoose handles this globally)
export { connectDB };
