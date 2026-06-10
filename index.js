const express = require('express');
const app = express();
app.use(express.json());
const port = 8000;


const human = [{
  name: 'John Doe',
  age: 30,
  brother: {
    name: 'Jane Doe',
    age: 25,
    education: 'Bachelor\'s Degree'
  },
  occupation: 'Software Engineer'
}];

//GET
app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello World!' });
  res.status(201).json({message: 'Hello World!'});
});

//POST
app.post('/hello-name', (req, res) => {
  const name = req.body.name;
  res.status(201).json({message: `Hello, ${name}!`});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});