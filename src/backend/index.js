const express = require('express');
const cors = require('cors');
const db = require('./db');
const databaseRouter = require("./routes/datasets.js");
const filesRouter = require("./routes/files");
const requestRouter = require("./routes/request.js");
const printrequestRouter = require("./routes/printrequest.js");
const changestatus = require("./routes/changestatus.js");
const app = express();

app.use(cors({
  origin: '*'
}));

app.use("/datasets", databaseRouter);
app.use("/files", filesRouter);
app.use("/request", requestRouter);
app.use("/printrequest", printrequestRouter);
app.use("/changestatus",changestatus);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));