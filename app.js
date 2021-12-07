
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const app = express ();

// conexión db Mongo
mongoose.connect('mongodb://localhost/Formulario')
    .then(db => console.log('Db connected'))
    .catch(err => console.log('err'));

// importación R
const indexRoutes = require('./routes/index');


// configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//intermediarios
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads' ),
	filename:(req, file, cb, filename) => {
		cb(null, uuidv4() + path.extname(file.originalname));
	}
});

app.use(multer({ storage: storage }).single('image'));

//rutas
app.use('/', indexRoutes);

//archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicializador de servidor
app.listen (app.get('port'), () => {
console.log ('Server on port ${app.get(port)}');
});

