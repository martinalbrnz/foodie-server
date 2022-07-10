import Joi from 'joi';

const RecipeCreation = (req, res, next) => {
  const recipeSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    vegetarian: Joi.bool(),
    vegan: Joi.bool(),
    glutenFree: Joi.bool(),
    image: Joi.string(),
    ingredients: Joi.array().items({
      ingredient: Joi.string(24).alphanum().required(),
      amount: Joi.number().required(),
      unit: Joi.string().valid(['g', 'unit', 'ml']),
    }),
    utensils: Joi.array().items(Joi.string(24).alphanum().required()),
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
    name: Joi.string().alphanum(),
    vegetarian: Joi.bool(),
    vegan: Joi.bool(),
    glutenFree: Joi.bool(),
    image: Joi.string(),
    ingredients: Joi.array().items({
      ingredient: Joi.string(24).alphanum(),
      amount: Joi.number(),
      unit: Joi.string().valid(['g', 'unit', 'ml']),
    }),
    utensils: Joi.array().items(Joi.string(24).alphanum()),
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
