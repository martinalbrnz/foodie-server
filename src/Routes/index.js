import express from 'express';
import ingredients from './ingredients';
import recipes from './recipes';
import user from './user';
import utensils from './utensils';

const router = express.Router();

router.use('/ingredients', ingredients);
router.use('/recipes', recipes);
router.use('/user', user);
router.use('/utensils', utensils);

export default router;
