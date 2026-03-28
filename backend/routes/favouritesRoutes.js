import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getFavourites, addFavourite, removeFavourite } from "../controllers/favouritesController.js";

const router = express.Router();

// all routes protected
router.use(protect);

router.get("/", getFavourites);
router.post("/", addFavourite);
router.delete("/:propertyId", removeFavourite);

export default router;