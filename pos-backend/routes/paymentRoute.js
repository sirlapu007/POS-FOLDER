const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { createOrder } = require("../controllers/paymentController");
const router = express.Router();

router.route("/create-order").post(isVerifiedUser, createOrder);

module.exports = router;