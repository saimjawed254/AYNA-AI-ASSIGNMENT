import express from "express";
import {
  deleteResponse,
  getAllResponseDates,
} from "../controllers/response.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteResponse);
router.get("/all-dates", verifyToken, getAllResponseDates);

const responseRoutes = router;
export default responseRoutes;
