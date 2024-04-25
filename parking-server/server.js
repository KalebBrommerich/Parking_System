//npm run dev
//npm install axios bcryptjs jsonwebtoken
//npm install -g serve

//to build and deploy do this
//npm run build
//serve -s build
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const login = require('./server/login');
const genCars = require('./server/generateCars');
const genCarsAdmin = require('./server/generateCarsAdmin');
const add = require('./server/addUpdateCar');
const acceptReject = require('./server/adminAcceptReject');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.use(bodyParser.json());

app.use(cors());

app.use('/api', login);

app.use('/api', genCars);

app.use('/api', genCarsAdmin);

app.use('/api', add);

app.use('/api', acceptReject);



app.listen(PORT, '199.17.162.16', () => {
    console.log(`Server running, listening at http://199.17.162.16:${PORT}`)
});
