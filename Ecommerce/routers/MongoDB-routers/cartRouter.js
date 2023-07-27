import { Router } from "express";
import {
  getCartsCtrl,
  get1CartCtrl,
  addCartCtrl,
  addProdToCartCtrl,
  deleteAllProdsFromCartCtrl,
  delete1ProdFromCartCtrl,
  update1ProdFromCartCtrl,
  updateAllProdsFromCartCtrl,
} from "../../controllers/cartController.js";

const router = Router();

router.get("/", getCartsCtrl);

router.get("/:cid", get1CartCtrl);

router.post("/", addCartCtrl);

router.post("/:cid/product/:pid", addProdToCartCtrl);

router.delete("/:cid", deleteAllProdsFromCartCtrl);

router.delete("/:cid/product/:pid", delete1ProdFromCartCtrl);

router.put("/:cid/product/:pid", update1ProdFromCartCtrl);

router.put("/:cid", updateAllProdsFromCartCtrl);

export default router;
