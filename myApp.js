let express = require('express');
const logger = require('morgan');

let app = express();

require('dotenv').config()

// 1 lição - 
// console.log("Hello World!")

// 2 lição - 
//app.get("/", (req, res) => {
//     res.send('Hello Express');
// });

//4 lição - usar um estilo css na página tambem com o --dirname que possibilita utilizar um arquivo
app.use("/public", express.static(__dirname + "/public/"))


// 7 lição - criar um registrador simples que deve logar no console o seguinte formato: method, path e ip 
// e o next para o servidor não travar utilizando o app.use()
app.use(logger('dev'));
app.use((req,res,next)=> {
    console.log(`${req.method} ${req.path} oi ${req.ip}`)
    next();
})   

// 3 lição - exibir um arquivo html no servidor com--dirname que informa que se trata de um arquivo
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})


// 5 lição - exibir um objeto json com o endereõ /json

// app.get("/json", (req,res) => {
//     res.json({"message": "Hello json"})
// })


//6 licao modificar o codigo acima e acesse a variavel armazenada no . env, se process.env de MESSAGE STYLE 
// for igual a uppercase uma resposta em JSON sera enviada em upper case como HELLO JSON, como o resultado
//é verdadeiro a resposta é enviada

app.get("/json", (req,res) => {

    if (process.env["MESSAGE_STYLE"] == "uppercase") {
        res.json({"message": "HELLO JSON"})
    }
    else {
        res.json({"message":"Hello json"})
    }

})




























 module.exports = app;
