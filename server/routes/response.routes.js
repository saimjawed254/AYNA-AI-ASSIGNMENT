import express from "express";
import { deleteResponse } from "../controllers/response.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteResponse);

const responseRoutes=router;
export default responseRoutes;
