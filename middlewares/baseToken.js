const jwt = require('jsonwebtoken');

const cookieParser = require("cookie-parser");

// create a new JWT based on the provided payload data
const parseToken = (data) => {
    let token = jwt.sign({ data }, process.env.JWT_SECRET_KEY, { algorithm: 'HS256', expiresIn: "10y" });
    return token;
}

//verify the validity of a given JWT
const checkToken = (token) => {
    try {
        let checkT = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
    const token = req.cookies?.token;
    const verifyToken = checkToken(token);
    console.log('verifyToken', verifyToken)
    if (verifyToken.checkData) {
        next();
    } 
    else {
        res.clearCookie('token');
        res.redirect("/login")
    }

}

const decodeToken = (token) => {
    if (!token) {
        return res.redirect("/")
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decode;
    } catch (error) {
        // Handle token verification error
        throw new Error('Invalid token');
    }
}

const isCanboQuan = (req, res, next) => {
    const token = req.cookies?.token;
    // console.log(token, "-")
    if (!token) {
        return res.redirect("/")
    }

    try {
        const content = decodeToken(token).data
        // console.log(content.role)
        if (content.role == "1"){
            next();
        } else {
            return res.redirect("/")
        }

    } catch (error) {
        // Handle token verification error
        throw new Error('Invalid token');
    }
}

const isCanboPhuong = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.redirect("/")
    }

    try {
        const content = decodeToken(token).data

        if (content.role == "2"){
            next();
        } else {
            return res.redirect("/")
        }

    } catch (error) {
        // Handle token verification error
        throw new Error('Invalid token');
    }
}

const isCanboSo = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.redirect("/")
    }

    try {
        const content = decodeToken(token).data

        if (content.role == "3"){
            next();
        } else {
            return res.redirect("/")
        }

    } catch (error) {
        // Handle token verification error
        throw new Error('Invalid token');
    }
}

const isCanboPhuongOrQuan = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.redirect("/")
    }

    try {
        const content = decodeToken(token).data

        if (content.role == "1" || content.role == "2"){
            next();
        } else {
            return res.redirect("/")
        }

    } catch (error) {
        // Handle token verification error
        throw new Error('Invalid token');
    }
}

module.exports = { parseToken, checkToken, verifyToken, decodeToken, isCanboQuan, isCanboPhuong, isCanboPhuongOrQuan, idCanboSo }
