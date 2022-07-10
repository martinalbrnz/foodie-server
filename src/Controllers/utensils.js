import Utensil from '../Models/Utensils';

const getAllUtensils = async (req, res) => {
  try {
    const allUtensils = await Utensil.find();
    return res.status(200)
      .json({
        message: 'All utensils',
        data: allUtensils,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has ocurred',
        data: error,
        error: true,
      });
  }
};

const getUtensilById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400)
        .json({
          message: 'Please provide an ID',
          data: {},
          error: true,
        });
    }

    const utensil = await Utensil.findById(id);

    if (!utensil) {
      return res.status(404)
        .json({
          message: 'Utensil not found',
          data: {},
          error: true,
        });
    }

    return res.status(200)
      .json({
        message: `Utensil with id: ${id}`,
        data: utensil,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has ocurred',
        data: error,
        error: true,
      });
  }
};

const createUtensil = async (req, res) => {
  try {
    const utensil = new Utensil(req.body);
    const createdUtensil = await utensil.save();

    return res.status(201)
      .json({
        message: 'Utensil created',
        data: createdUtensil,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has ocurred',
        data: error,
        error: true,
      });
  }
};

const editUtensil = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400)
        .json({
          message: 'Please provide an ID',
          data: {},
          error: true,
        });
    }

    const updatedUtensil = await Utensil.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUtensil) {
      return res.status(404)
        .json({
          message: 'Utensil not found',
          data: {},
          error: true,
        });
    }

    return res.status(200)
      .json({
        message: 'Utensil updated',
        data: updatedUtensil,
        error: false,
      });
  } catch (error) {
    return res.status(400)
      .json({
        message: 'An error has ocurred',
        data: error,
        error: true,
      });
  }
};

export default {
  getAllUtensils,
  getUtensilById,
  createUtensil,
  editUtensil,
};
