const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
    //Get token from the header
    const token = req.header('x-auth');
    if (!token) {
        return res.status(401).json({ msg: 'no token . authorization denied' });
    }
    //verify the token 
    try {

        const decoded = jwt.verify(token, config.get('jwtToken'));
        req.user = decoded.user;
        req.token = token;
        next();

    }
    catch (err) {
        res.status(401).json({ msg: 'invalid token .authorization denied' })
    }
}