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
    database: 'SMC'
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});