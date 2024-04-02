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
const login = require('./server/login');
const genCars = require('./server/generateCars');
const genCarsAdmin = require('./server/generateCarsAdmin')
const addModify = require('./server/addModifyCar')
const acceptReject = require('./server/adminAcceptReject')
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use('/api', login);

app.use('/api', genCars);

app.use('/api', genCarsAdmin)

app.use('/api', addModify)

app.use('/api', acceptReject)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
