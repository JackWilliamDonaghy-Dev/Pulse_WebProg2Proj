
import { Router } from "express";
import { InteractionController } from "../controllers/interactions"
import { validate } from "../middleware/validate.middleware";
import { createInteractionZSchema, updateInteractionZSchema } from "../models/interaction";


const router = Router();
const controller = new InteractionController();

router.get("/", controller.getInteractions);
router.get("/:id", controller.getInteractionById);
router.post("/", validate(createInteractionZSchema), controller.createInteraction);
router.put("/:id", validate(updateInteractionZSchema), controller.updateInteraction);
router.delete("/:id", controller.deleteInteraction);

export default router;
