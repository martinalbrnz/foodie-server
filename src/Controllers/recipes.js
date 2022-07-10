import Recipe from '../Models/Recipes';

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find()
      .populate('ingredients.ingredient')
      .populate('utensils');

    res.status(200)
      .json({
        message: 'All recipes',
        data: allRecipes,
        error: false,
      });
  } catch (error) {
    res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const getFilterRecipes = async (req, res) => {
  const {
    name = '', vegetarian, vegan, glutenFree, ingredients, utensils, estimatedTime,
  } = req.body;
  try {
    const filterRecipes = await Recipe
      .find({
        name: { $regex: new RegExp(name, 'i') },
        vegetarian,
        vegan,
        glutenFree,
        ingredients,
        utensils,
        estimatedTime,
      })
      .populate('ingredients.ingredient')
      .populate('utensils');

    if (!filterRecipes) {
      res.status(404)
        .json({
          message: 'Recipes not found',
          data: {},
          error: true,
        });
    }

    res.status(200)
      .json({
        message: 'Recipes with filters:',
        data: filterRecipes,
        error: false,
      });
  } catch (error) {
    res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400)
        .json({
          message: 'Please provide an ID',
          data: {},
          error: true,
        });
    }

    const recipe = await Recipe.findById(id)
      .populate('ingredients.ingredient')
      .populate('utensils');

    if (!recipe) {
      res.status(404)
        .json({
          message: 'Recipe not found',
          data: {},
          error: true,
        });
    }

    res.status(200)
      .json({
        message: `Recipe with id: ${id}`,
        data: recipe,
        error: false,
      });
  } catch (error) {
    res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const createdRecipe = await recipe.save();

    res.status(201)
      .json({
        message: 'Recipe created',
        data: createdRecipe,
        error: false,
      });
  } catch (error) {
    res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400)
        .json({
          message: 'Please provide an ID',
          data: {},
          error: true,
        });
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRecipe) {
      res.status(404)
        .json({
          message: 'Recipe not found',
          data: {},
          error: true,
        });
    }

    res.status(200)
      .json({
        message: 'Recipe updated',
        data: updatedRecipe,
        error: false,
      });
  } catch (error) {
    res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

export default {
  getAllRecipes,
  getFilterRecipes,
  getRecipeById,
  createRecipe,
  editRecipe,
};
