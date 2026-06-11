const fs = require('fs/promises');
const path = require('path');

// C:\Users\ABDULLAH\WebstormProjects\playground2/src/app/products.json
const PRODUCTS_FILE = path.join(__dirname, '../products.json');

const readProducts = async () => {
    try {
        const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
};

const writeProducts = async (products) => {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

exports.create = async (product) => {
    const products = await readProducts(); // Promise resolved
    const newProduct = { id: Date.now(), ...product }; // {id, name, price, quantity}
    products.push(newProduct);
    await writeProducts(products);
    return newProduct;
};

exports.getAll = async () => {
    return await readProducts();
};

