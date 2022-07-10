import express from 'express';
import utensilsControllers from '../Controllers/utensils';

const router = express.Router();

router
  .get('/', utensilsControllers.getAllUtensils)
  .get('/:id', utensilsControllers.getUtensilById)
  .post('/', utensilsControllers.createUtensil)
  .put('/:id', utensilsControllers.editUtensil);

export default router;
