import express from 'express';
import utensilsControllers from '../Controllers/utensils';
import utensilsValidations from '../Validations/utensils';

const router = express.Router();

router
  .get('/', utensilsControllers.getAllUtensils)
  .get('/:id', utensilsControllers.getUtensilById)
  .post('/', utensilsValidations.UtensilCreation, utensilsControllers.createUtensil)
  .put('/:id', utensilsValidations.UtensilUpdate, utensilsControllers.editUtensil);

export default router;
