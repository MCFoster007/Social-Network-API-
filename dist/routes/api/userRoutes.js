import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUser, addFriend, removeFriend, } from '../../controllers/UserController.js';
// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);
export { router as userRouter };
