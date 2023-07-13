const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const artRouter = require("./routes/index.js"); // Changed "routers" to "routes"
const PORT = process.env.PORT || 3000;

// Configuración BD
const FileDB = require("lowdb/adapters/FileSync");
const adapter = new FileDB("db.json");
const db = low(adapter);

db.defaults({ articulos: [] }).write();

// Configuración Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Registro de usuario",
      version: "1.0.0",
      description: "Se registra un usuario",
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/index", artRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.static('public'));
app.get('/index.ejs', (req, res) => {
    res.render('index');
  });
  
  app.get('/index1.ejs',function(req, res){
    res.render('index1');
  });
  
  app.get('/index_acceso.ejs',function(req,res){
    res.render('index_acceso');
  })
  
  app.get('/catalogo.ejs',function(req,res){
    res.render('catalogo');
  })
  
  app.get('/B_S.ejs',function(req,res){
    res.render('B_S');
  })
  
  app.get('/golosinas.ejs',function(req,res){
    res.render('golosinas');
  })
  
  app.get('/papeleria.ejs',function(req,res){
    res.render('papeleria');
  })
  
  app.get('/tecnologia.ejs',function(req,res){
    res.render('tecnologia');
  })
  
  app.get('index_acceso.ejs',function(req,res){
    req.render(index)
  })

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');

// Configuración de la ruta de las vistas
app.set('views', path.join(__dirname, ''));

// Ruta para renderizar el archivo EJS
app.get("/", (req, res) => {
  res.render("index1"); // Changed from "index" to "index1"
});

app.listen(PORT, () =>
  console.log(`Servidor iniacido en http://localhost:3000`)
);
