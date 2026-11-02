import { Router } from "express";
import { PersonController } from "../controllers/people";
import { validate } from "../middleware/validate.middleware";
import { createPersonZSchema, updatePersonZSchema } from "../models/people";

const router = Router();
const controller = new PersonController();

router.get("/", controller.getPeople);
router.get("/:id", controller.getPersonById);
router.post("/", validate(createPersonZSchema), controller.createPerson);
router.put("/:id", validate(updatePersonZSchema), controller.updatePerson);
router.delete("/:id", controller.deletePerson);

export default router;
