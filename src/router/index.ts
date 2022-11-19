import express from "express";

const router = express.Router();

// router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/report", require("./report"));

export default router;
