const express = require('express');
const productController = require('./controllers/product.controller');

const router = express.Router();

router.post('/', productController.create);
router.get('/', productController.getAll);

router.get("/hello", (req, res) => {
    res.json("hello page");
})

// router.post('/hello2', productController.create2);

module.exports = router;
