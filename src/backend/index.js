const express = require('express');
const cors = require('cors');
const db = require('./db');
const databaseRouter = require("./routes/datasets.js");
const filesRouter = require("./routes/files");

const app = express();

app.use(cors({
  origin: '*'
}));

app.use("/datasets", databaseRouter);
app.use("/files", filesRouter);


const PORT = 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));