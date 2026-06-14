const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const port = 8000;

let users = [];

const ACCESS_SECRET = 'mykey';
const REFERESH_SECRET = 'myrefkey';

//1. register a user (paswrord should be hashed)
app.post('/users', async (req, res) => {
  const {email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user ={
    email,
    password: hashedPassword
  }
  console.log(user.password)
  users.push(user);
  res.status(201).json({message: 'User created successfully'});
  
});

//2. login a user (verify password and generate tokens)
app.post('/users/login', async (req, res) => {
  const {email, password} = req.body;
  const user = users.find(u => u.email === email);
  if(!user){
    return res.status(401).json({message: 'Invalid email or password'});
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    return res.status(401).json({message: 'Invalid password'});
  }
  // Generate access token
  const accessToken = createAccessToken(user);
  // Generate refresh token
  const refreshToken = createRefreshToken(user);

  res.status(200).json({accessToken, refreshToken});
});

//Get my info
app.get('/users/me', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) {return res.status(401).json({message: 'Unauthorized'})}

    try{
      const decoded = jwt.verify(token, ACCESS_SECRET);
      res.status(200).json({decoded});
    } catch (error) {
      res.status(401).json({message: 'Invalid token'});
    }
  
});
// POST /users/refresh-token
app.post('/users/refresh-token', (req, res) => {
  const token = req.body.token;
  if(!token) {return res.status(401).json({message: 'Unauthorized'})}

    try{
      const decoded = jwt.verify(token, REFERESH_SECRET);
      const newAccessToken = createAccessToken({decoded});
      res.status(200).json({newAccessToken});
    } catch (error) {
      res.status(401).json({message: 'Invalid token'});
    }
  
});
function createAccessToken(user){
  return jwt.sign({email: user.email}, ACCESS_SECRET, {expiresIn: '15m'});
}

function createRefreshToken(user){ 
  return jwt.sign({email: user.email}, REFERESH_SECRET, {expiresIn: '3d'});
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});