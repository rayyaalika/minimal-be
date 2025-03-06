require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./routes/route');
const cors = require('cors');

app.use(cors({
    credentials: true,
    origin: (['http://localhost:8081']),
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome server Minimals",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});