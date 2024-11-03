const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const setupTables = require('./models/setupTables');
const combinationRoutes = require('./routes/combinationRoutes');

dotenv.config();
const app = express();
setupTables();

app.use(bodyParser.json());
app.use('/api', combinationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
