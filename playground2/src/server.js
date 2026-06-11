const express = require('express')
const productRoutes = require('./app/product/routes');
const app = express()

app.use(express.json());
const port = 8000;



// /products ->
app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);
// app.use('/users', userRoutes);

// app
// routerA, routerB, routerC



app.listen(port, () => {console.log(`Server started on port ${port}`)})