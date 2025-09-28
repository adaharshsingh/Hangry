const app= require('./src/app');
const connectDB= require('./src/db/db');
connectDB();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT} (env=${process.env.NODE_ENV})`);
});