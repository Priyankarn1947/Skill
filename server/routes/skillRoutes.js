import express from "express";
import { addSkill, getAllSkills, deleteSkill, findMatches } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSkills);
router.post("/", protect, addSkill);
router.delete("/:id", protect, deleteSkill);
router.get("/match/:id", protect, findMatches);

export default router;
