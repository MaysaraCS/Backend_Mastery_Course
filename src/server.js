const express = require('express'); 
const app = express(); 
app.use(express.json());
const port = 8000;
const userRouter = require('./user/routes.js');

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});