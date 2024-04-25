const jwt = require('jsonwebtoken');
const secretKey = '182397yasdbhp9g1280vu7gyfasdsdoy8bv6q9b7viubsado8231bv7898'; // this is really bad, should be in env, but here for testing

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
      } catch (ex) {
        return null;
      }
}

module.exports = { validateToken };