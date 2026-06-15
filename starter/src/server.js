const express = require('express')
const userRoutes = require('./app/user/routes')

const app = express()
const errorHandler = require('./common/error/errorHandler');
const correlationIdMiddleware = require('./common/correlation/correlationId');

app.use(express.json());
const port = 8000
app.use(correlationIdMiddleware);

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {console.log(`Server started on port ${port}`)})