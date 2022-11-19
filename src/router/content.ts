import { Router } from "express";
import { dummyData } from "../constants/dummy";
// Middleware
import { authMiddleware } from "../middlewares";
import { Request, Response } from "express";
// Controller

import { reportController } from "../controller";

const router: Router = Router();

router.get("", async (req: Request, res: Response) => {
  const { type } = req.query;
  if (Number(type) == 1) {
    const data = dummyData;
    return data.Good;
  }
  if (Number(type) == 0) {
    const data = dummyData;
    return data.Bad;
  }
});

module.exports = router;
