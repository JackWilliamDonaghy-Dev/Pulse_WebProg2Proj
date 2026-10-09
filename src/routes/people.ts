import { Router } from 'express';
import { PeopleController } from '../controllers/people';

const router = Router();
const peopleController = new PeopleController();

router.get('/', peopleController.getPeople);
router.get('/:id', peopleController.getPersonById);
router.post('/', peopleController.createPerson);
router.put('/:id', peopleController.updatePerson);
router.delete('/:id', peopleController.deletePerson);

export default router;
