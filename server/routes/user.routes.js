import express from 'express';
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('[DEBUG] Masuk ke rute GET /api/v1/users');
    next();
}, getUsers);

router.get('/:id', (req, res, next) => {
    console.log('[DEBUG] Masuk ke rute GET /api/v1/users/:id');
    next();
}, getUser);

router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;