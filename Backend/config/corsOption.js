

const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    // When a browser sends a preflight request to check if a cross-origin request is allowed, 
    // your server should respond with the specified status code if the preflight request is successful.
    // we can also use 204 but thsi will chokes on smart tv browser
    optionsSuccessStatus: 200
}

module.exports = corsOptions 