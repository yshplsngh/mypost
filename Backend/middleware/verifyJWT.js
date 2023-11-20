const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers.authorization || req.headers.Authorization

    // console.log(authHeader)

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized // token not found in header' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden \\ token expired' })
            req.user = decoded.UserInfo.email
            req.roles = decoded.UserInfo.roles
            // console.log(decoded.UserInfo.email)
            next()
        }
    )
}

module.exports = verifyJWT 