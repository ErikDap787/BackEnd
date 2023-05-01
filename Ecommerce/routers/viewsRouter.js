import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.render("realTimeProducts.hbs", {}));

export default router;
