import { Router } from "express";

import { reportController } from "../controller";

const router: Router = Router();

router.post('/', reportController.writePoint);
router.post('/end', reportController.finishReport);

export default router;