module.exports = {
    port: process.env.PORT,
    db: {
        production: {
            host: '',
            // process.env.PROD_DB_HOST,
            port: process.env.PROD_DB_PORT,
            username: process.env.PROD_DB_USERNAME,
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_NAME,
            pool: {
                max: 20,
                min: 5,
            },
        },
        development: {
            host: process.env.DEV_DB_HOST,
            port: process.env.DEV_DB_PORT,
            username: process.env.DEV_DB_USERNAME,
            password: process.env.DEV_DB_PASSWORD,
            pool: {
                max: 20,
                min: 5,
            },
        },
    },
}
