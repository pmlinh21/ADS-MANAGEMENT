const jwt = require('jsonwebtoken');

// create a new JWT based on the provided payload data
const parseToken = (data) => {
    let token = jwt.sign({ data }, "bimat", { algorithm: 'HS256', expiresIn: "10y" });
    return token;
}

//verify the validity of a given JWT
const checkToken = (token) => {
    try {
        let checkT = jwt.verify(token, "bimat");
        if (checkT) {
            return { checkData: true, messagse: "" };
        } else {
            return { checkData: false, messagse: "Token không hợp lệ" };
        }
    } catch (error) {
        return { checkData: false, message: error.message };
    }
}

// protect routes that require authentication. Verifies token and allows or denies access based on the result of verification 
const verifyToken = (req, res, next) => {
    const { token } = req.headers;
    const verifyToken = checkToken(token);
    if (verifyToken.checkData) {
        next();
    } else {
        res.status(401).send(verifyToken.message);
    }
}

const clearLocalStorage = (name) => {
    localStorage.removeItem(name);
}

module.exports = { parseToken, checkToken, verifyToken, clearLocalStorage }