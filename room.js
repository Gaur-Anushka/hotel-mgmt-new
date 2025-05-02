const express = require('express');
const router = express.Router();
const { getRooms, createRoom, updateRoom, deleteRoom ,getRoomById,getAvailableRoomsByDate } = require('../Controllers/rooms');
const authenticateUser = require('../Middleware/auth');


router.get('/', getRooms);
router.post('/',authenticateUser, createRoom);
router.put('/:roomId', updateRoom);
router.delete('/:roomId', deleteRoom);
router.get('/available',getAvailableRoomsByDate )
router.get('/:roomId', getRoomById);
module.exports = router;
