import express from 'express';
import recipesControllers from '../Controllers/recipes';

const router = express.Router();

router
  .get('/', recipesControllers.getAllRecipes)
  .get('/', recipesControllers.getFilterRecipes)
  .get('/:id', recipesControllers.getRecipeById)
  .post('/', recipesControllers.createRecipe)
  .put('/:id', recipesControllers.editRecipe);

export default router;
