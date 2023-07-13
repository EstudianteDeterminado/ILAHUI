const express = require('express');
const app = express();
const port = 3000;

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express.static('public'));

// Ruta para renderizar el archivo index.ejs
app.get('/index.ejs', (req, res) => {
  res.render('index');
});

// Ruta para renderizar el archivo index1.ejs
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
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}/index.ejs`);
});
