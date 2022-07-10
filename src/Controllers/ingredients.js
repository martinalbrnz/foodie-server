import Ingredient from '../Models/Ingredients';

const getAllIngredients = async (req, res) => {
  try {
    const allIngredients = await Ingredient.find();
    res.status(200)
      .json({
        message: 'All ingredients',
        data: allIngredients,
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

const getIngredientById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({
        message: 'Please provide an ID',
        data: {},
        error: true,
      });
    }

    const ingredient = await Ingredient.findById(id);

    if (!ingredient) {
      res.status(404)
        .json({
          message: 'Ingredient not found',
          data: {},
          error: true,
        });
    }

    res.status(200)
      .json({
        message: `Ingredient with id: ${id}`,
        data: ingredient,
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

const createIngredient = async (req, res) => {
  const {
    name, nutritionValues, isVegetarian, glutenFree, image,
  } = req.body;
  try {
    const ingredient = new Ingredient({
      name, nutritionValues, isVegetarian, glutenFree, image,
    });
    const createdIngredient = await ingredient.save();

    res.status(201)
      .json({
        message: 'Ingredient created',
        data: createdIngredient,
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

const editIngredient = async (req, res) => {
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

    const updatedIngredient = await Ingredient.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedIngredient) {
      res.status(404)
        .json({
          message: 'Ingredient not found',
          data: {},
          error: true,
        });
    }

    res.status(200)
      .json({
        message: 'Ingredient updated',
        data: updatedIngredient,
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
  getAllIngredients,
  getIngredientById,
  createIngredient,
  editIngredient,
};
