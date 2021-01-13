const loaders = require('./loaders/index');
const express = require('express');

const PORT = require('./config/index').port;

async function startServer() {

    const app = express();

    await loaders({ expressApp: app });

    app.listen(PORT, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Your server is ready !`, PORT);
    });
}

startServer();