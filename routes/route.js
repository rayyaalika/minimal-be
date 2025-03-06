const router = require("express").Router();
const r_Auth = require("./api/r_Auth");
const r_Products = require("./api/r_Products");

router.use("/api", r_Auth, r_Products);

module.exports = router;