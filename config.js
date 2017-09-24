const DEFAULT_PORT = 3000; // port to use if ENV PORT not set

const config = {
    express: {
        port: process.env.PORT || DEFAULT_PORT,
    },
};

module.exports = config;