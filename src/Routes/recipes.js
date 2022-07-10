import express from 'express';
import recipesControllers from '../Controllers/recipes';
import recipesValidations from '../Validations/recipes';

const router = express.Router();

router
  .get('/', recipesControllers.getAllRecipes)
  .get('/', recipesControllers.getFilterRecipes)
  .get('/:id', recipesControllers.getRecipeById)
  .post('/', recipesValidations.RecipeCreation, recipesControllers.createRecipe)
  .put('/:id', recipesValidations.RecipeUpdate, recipesControllers.editRecipe);

export default router;
