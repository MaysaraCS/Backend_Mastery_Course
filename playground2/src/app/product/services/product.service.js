const productRepo = require('../repositories/product.repository');
const AppError = require('../../../common/error/AppError');

exports.create = async (name, price, quantity) => {
    if (!name || typeof name !== 'string') {
        throw new AppError('name is required and must be a string', 400);
    }
    if (price == null || typeof price !== 'number' || price < 0) {
        throw new AppError('price is required and must be a non-negative number', 400);
    }
    if (quantity == null || !Number.isInteger(quantity) || quantity < 0) {
        throw new AppError('quantity is required and must be a non-negative integer', 400);
    }
    // calculations , validations

    return productRepo.create({ name, price, quantity });
};

exports.getAll = async () => {
    return productRepo.getAll();
};

