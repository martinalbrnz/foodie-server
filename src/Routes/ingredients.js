import express from 'express';
import ingredientControllers from '../Controllers/ingredients';

const router = express.Router();

router
  .get('/', ingredientControllers.getAllIngredients)
  .get('/:id', ingredientControllers.getIngredientById)
  .post('/', ingredientControllers.createIngredient)
  .put('/:id', ingredientControllers.editIngredient);

export default router;
