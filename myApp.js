let express = require('express');
const logger = require('morgan');

let bodyParser = require('body-parser')

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
    
// 11 - usar body-parser para solicitações POST 
app.use(bodyParser.urlencoded({extended:false}))

// 7 lição - criar um registrador simples que deve logar no console o seguinte formato: method, path e ip 
// e o next para o servidor não travar utilizando o app.use()
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  });    

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
// 8 - encadeando o middleware para criar um servidor de tempo
// function obterHorarioAtualString(req,res){
//     return new Date().toString()
// }
app.get("/now",(req,res,next) => {
    // req.time = obterHorarioAtualString()
    req.time = new Date().toString()
    next()
}, function(req,res){
    res.json({
        time: req.time
    });
}
)

// 9 - Obter a entrada do parâmetro de roteamento do client
// Crie um servidor de eco, 
// montado na rota GET /:word/echo. Responda com um documento JSON, pegando a estrutura {echo: word}.
// ao escrever alguma coisa ex http//localhost:3000/oilinda/echo eu vou receber o objeto json
// {word : oi linda}

app.get("/:word/echo", (req,res) => {
    res.json({
      echo : req.params.word
  })
})
// 10 - obter nomes inseridos na URL (duas strings)
app.get("/name",(req,res) => {
  
  res.json({
    name: req.query.first + " " + req.query.last
  })
})


// 12 - obs: os nomes das rotas podem ser os mesmos nomes se os métodos forem diferentes
//

app.post("/name",(req,res) => {
  res.json({
    name: req.body.first + " " + req.body.last
  })
})
























 module.exports = app;
