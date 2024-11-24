const express = require('express');

const checkAuth = require('../middleware/auth');
const { createOrder, getAllOrders, getAllMyOrders, deleteOrder, getOneOrder, updateOrder } = require('../Controlles/Orders');

const router = express.Router();

router.get('/', checkAuth, getAllOrders);
router.get('/my-orders', checkAuth, getAllMyOrders);
router.get('/:id', checkAuth, getOneOrder);
router.post('/', checkAuth, createOrder);
router.put('/:id', checkAuth, updateOrder);
router.delete('/:id', checkAuth, deleteOrder);

module.exports = router;