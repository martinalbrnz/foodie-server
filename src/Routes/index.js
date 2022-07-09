import express from 'express';
import ingredients from './ingredients';
import recipes from './recipes';
import user from './user';
import utensils from './utensils';

const router = express.Router();

router.use('/', ingredients);
router.use('/', recipes);
router.use('/', user);
router.use('/', utensils);

export default router;
