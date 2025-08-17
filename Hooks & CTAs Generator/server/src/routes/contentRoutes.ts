import { Router } from "express";
import { ContentController } from "../controllers/contentController";

const router = Router();
const contentController = new ContentController();

// POST /api/generateContent - Generate hooks and CTAs for a topic
router.post("/generateContent", (req, res) => {
  contentController.generateContent(req, res);
});

export default router;
