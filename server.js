const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8082"
};
app.use(cookieParser())
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
/*const Role = db.role;*/

db.sequelize.sync();
//force: true will drop the table if it already exists
/*db.sequelize.sync({force: true}).then(() => {
console.log('Drop and Re-sync Database with { force: true }');
//initial();
});*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to pass_wallet application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/entry.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});