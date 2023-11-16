const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes/routes');
const app = express();


var corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
    }


app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

const PORT = 8080;

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');

})


app.listen(
    PORT,
    console.log(`running host:${PORT}`)
)


