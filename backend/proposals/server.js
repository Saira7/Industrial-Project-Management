const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error: ', err));

const proposalRoutes = require('./routes/proposalRoutes');


app.use('/api/proposals', proposalRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
