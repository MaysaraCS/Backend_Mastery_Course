const productService = require('../services/product.service');

exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const{ name, price, quantity } = req.body;
       //  const name = req.body.name;
       //  const price = req.body.price;
       //  const quantity = req.body.quantity;
        const product = await productService.create(name, price, quantity);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getAll = async (req, res) => {
    const products = await productService.getAll();
    res.status(200).json(products);
};

