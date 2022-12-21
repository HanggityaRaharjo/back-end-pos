import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/Users.js';

import { IsAuth, IsAdmin } from '../middleware/Authentication.js';

const router = express.Router();

router.get('/users', IsAuth, IsAdmin, getUsers);
router.get('/users/:id', IsAuth, IsAdmin, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', IsAuth, IsAdmin, updateUser);
router.delete('/users/:id', IsAuth, IsAdmin, deleteUser);

export default router;
