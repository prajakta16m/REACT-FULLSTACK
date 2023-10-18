const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {

    const accesstoken = req.header("accessToken");

    if(!accesstoken) {
        return res.json({error: "User not logged in!"});
    }

    // check access token validaity
    try {
        const validToken = verify(accesstoken, "importantsecret");
        req.user = validToken;
        if(validToken) {
            // move forward with request
            return next();
        }
    } catch (err) {
        return res.json({error: "Invalid login."});
    }
};

module.exports = { validateToken};