import { Router } from "express";
import { PersonController } from "../controllers/people";

const router = Router();
const controller = new PersonController();

router.get("/", controller.getPeople);
router.get("/:id", controller.getPersonById);
router.post("/", controller.createPerson);
router.put("/:id", controller.updatePerson);
router.delete("/:id", controller.deletePerson);

export default router;
