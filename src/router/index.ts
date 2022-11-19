import express from "express";

const router = express.Router();

// router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/report", require("./report"));
router.use("/content", require("./content"));

export default router;
