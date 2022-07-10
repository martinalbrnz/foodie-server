import express from 'express';
import ingredientControllers from '../Controllers/ingredients';
import ingredientValidations from '../Validations/ingredients';

const router = express.Router();

router
  .get('/', ingredientControllers.getAllIngredients)
  .get('/:id', ingredientControllers.getIngredientById)
  .post('/', ingredientValidations.IngredientCreation, ingredientControllers.createIngredient)
  .put('/:id', ingredientValidations.IngredientUpdate, ingredientControllers.editIngredient);

export default router;
