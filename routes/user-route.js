import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controller/user-controller.js';

const router = express.Router();

router.post('/create', createUser)
router.get('/all',getAllUsers)
router.get('/:id',getUserById)
router.patch('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)

export default router;