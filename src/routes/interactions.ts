
import { Router } from "express";
import { InteractionController } from "../controllers/interactions"

const router = Router();
const controller = new InteractionController();

router.get("/", controller.getInteractions);
router.get("/:id", controller.getInteractionById);
router.post("/", controller.createInteraction);
router.put("/:id", controller.updateInteraction);
router.delete("/:id", controller.deleteInteraction);

export default router;
