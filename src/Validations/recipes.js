import Joi from 'joi';

const RecipeCreation = (req, res, next) => {
  const recipeSchema = Joi.object({
    name: Joi.string().required(),
    vegetarian: Joi.bool(),
    vegan: Joi.bool(),
    glutenFree: Joi.bool(),
    image: Joi.string().allow('').allow(null),
    ingredients: Joi.array().items(
      {
        ingredient: Joi.string().length(24).required(),
        amount: Joi.number().required(),
        unit: Joi.string().valid('g', 'unit', 'ml'),
      },
    ),
    utensils: Joi.array().items(Joi.string().length(24).alphanum().optional()),
    instructions: Joi.array().items(Joi.string().required()),
    estimatedTime: Joi.number(),
  });
  const validation = recipeSchema.validate(req.body);
  if (validation.error) {
    return res.status(400)
      .json({
        message: 'There has been an error in the validation',
        data: validation.error.details,
        error: true,
      });
  }
  return next();
};

const RecipeUpdate = (req, res, next) => {
  const recipeSchema = Joi.object({
    name: Joi.string(),
    vegetarian: Joi.bool(),
    vegan: Joi.bool(),
    glutenFree: Joi.bool(),
    image: Joi.string().allow('').allow(null),
    ingredients: Joi.array().items({
      ingredient: Joi.string().length(24).alphanum(),
      amount: Joi.number(),
      unit: Joi.string().valid('g', 'unit', 'ml'),
    }),
    utensils: Joi.array().items(Joi.string().length(24).alphanum().optional()),
    instructions: Joi.array().items(Joi.string()),
    estimatedTime: Joi.number(),
  });
  const validation = recipeSchema.validate(req.body);
  if (validation.error) {
    return res.status(400)
      .json({
        message: 'There has been an error in the validation',
        data: validation.error.details,
        error: true,
      });
  }
  return next();
};

export default {
  RecipeCreation,
  RecipeUpdate,
};
