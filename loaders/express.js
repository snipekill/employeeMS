const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('../api/index');

module.exports = async ({ app }) => {

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api/v1', routes());
    // ...More middlewares
    app.use((err, req, res, next)=>{
        console.log(err);
        res.send({ status: 0, msg: 'something went wrong' });
    })
    // Return the express app
    return app;
};