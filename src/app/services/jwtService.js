const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_JWT; // Replace with your own secret key

function generateAccessToken(user, otherOptions = {}) {
    console.log({ container: user.containers })
    const payload = {
        email: user.email,
        containers: user.containers[0],
        id: user.id,
        type: user.type,
    };

    const options = {
        expiresIn: '2h',
        ...otherOptions
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log({ decoded })
        return decoded;
    } catch (err) {
        console.log("Invalid token")
        return false;
    }
}

module.exports = {
    generateAccessToken,
    verifyToken,
};