const express = require("express");
const routes = require("./Routes");
const app = express();
const port = 12345;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(routes);

app.listen(port, () =>{
    console.log("API rodando na porta: " + port);
})