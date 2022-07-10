import Joi from 'joi';

const UtensilCreation = (req, res, next) => {
  const utensilSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
  });
  const validation = utensilSchema.validate(req.body);
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

const UtensilUpdate = (req, res, next) => {
  const utensilSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
  });
  const validation = utensilSchema.validate(req.body);
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
  UtensilCreation,
  UtensilUpdate,
};
