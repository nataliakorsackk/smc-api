const http = require('http');
const PORT = process.env.PORT || 5000;


var mysql = require("mysql");
require("dotenv").config();
const app = require("../src/api");

app.use((req, res, next) =>{
    next();
})

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smc'
})

/app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});