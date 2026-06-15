const AppError = require("../../common/error/AppError");

module.exports={
    UserAlreadyExistsError: new AppError('User already exists', 400),
    IncorrectCredentialsError: new AppError('Incorrect credentials', 401)
} 
    