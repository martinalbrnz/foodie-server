import Ingredient from '../Models/Ingredients';

const getAllIngredients = async (req, res) => {
  try {
    const allIngredients = await Ingredient.find();
    return res.status(200)
      .json({
        message: 'All ingredients',
        data: allIngredients,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Please provide an ID',
        data: {},
        error: true,
      });
    }

    const ingredient = await Ingredient.findById(id);

    if (!ingredient) {
      return res.status(404)
        .json({
          message: 'Ingredient not found',
          data: {},
          error: true,
        });
    }

    return res.status(200)
      .json({
        message: `Ingredient with id: ${id}`,
        data: ingredient,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const createIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    const createdIngredient = await ingredient.save();

    return res.status(201)
      .json({
        message: 'Ingredient created',
        data: createdIngredient,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has occurred',
        data: error,
        error: true,
      });
  }
};

const editIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400)
        .json({
          message: 'Please provide an ID',
          data: {},
          error: true,
        });
    }

    const updatedIngredient = await Ingredient.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedIngredient) {
      return res.status(404)
        .json({
          message: 'Ingredient not found',
          data: {},
          error: true,
        });
    }

    return res.status(200)
      .json({
        message: 'Ingredient updated',
        data: updatedIngredient,
        error: false,
      });
  } catch (error) {
    return res.status(400)
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
