import Joi from 'joi';

const IngredientCreation = (req, res, next) => {
  const ingredientSchema = Joi.object({
    name: Joi
      .string()
      .messages({
        'string.empty': 'name is a required field',
      })
      .required(),
    nutritionalValues: Joi.object({
      calories: Joi.number(),
      proteins: Joi.number(),
      carbs: Joi.number(),
      fats: Joi.number(),
    }),
    isVegetarian: Joi.bool().required(),
    isVegan: Joi.bool().required(),
    glutenFree: Joi.bool().required(),
    image: Joi.string().optional().allow('').allow(null),
  });
  const validation = ingredientSchema.validate(req.body);
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

const IngredientUpdate = (req, res, next) => {
  const ingredientSchema = Joi.object({
    name: Joi
      .string()
      .messages({
        'string.empty': 'name is a required field',
      }),
    nutritionalValues: Joi.object({
      calories: Joi.number(),
      proteins: Joi.number(),
      carbs: Joi.number(),
      fats: Joi.number(),
    }),
    isVegetarian: Joi.bool(),
    isVegan: Joi.bool(),
    glutenFree: Joi.bool(),
    image: Joi.string().optional().allow('').allow(null),
  });
  const validation = ingredientSchema.validate(req.body);
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
  IngredientCreation,
  IngredientUpdate,
};
