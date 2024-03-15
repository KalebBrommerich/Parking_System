//npm run dev
//npm install axios bcryptjs jsonwebtoken
//npm install -g serve

//to build and deploy do this
//npm run build
//serve -s build
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const login = require('./server/routes/login');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use('/api', login);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

module.exports = router;