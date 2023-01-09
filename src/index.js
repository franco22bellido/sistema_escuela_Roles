import express from 'express';
import morgan from 'morgan';
import {create} from 'express-handlebars';
import flash from 'connect-flash';
import session from 'express-session';
import mysql_store from 'express-mysql-session';
import {databaseKeys} from './keys.js';
import pool from './database.js';
import passport from 'passport';
import pasaporte from './lib/passport.js';
pasaporte;

//importar rutas
import alumno_routes from './routes/alumno_routes.js';
import auth_routes from './routes/auth.js';
import profesor_routes from './routes/profesor_routes.js';
import defecto_routes from './routes/defecto_routes.js';


//inicialización
const app = express();
//configuración
app.set('port', process.env.PORT || 4000);


const hbs = create({
    extname: ".hbs",
    partialsDir: ['./src/views/components']
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./src/views");




//sesiones flash
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(databaseKeys)
}))
app.use(flash());


//variables globales
app.use((req, res, next)=>{
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});
//middlewares sesión
app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static('src/public'));
app.use(express.json());


// rutas
app.use('/', alumno_routes);
app.use('/', auth_routes);
app.use('/', profesor_routes);
app.use('/', defecto_routes);

// public
app.use(express.static('public'));


//comenzar el servidor
app.listen(app.get('port'), ()=>{
    console.log("server on port: "+app.get('port'));
});


//validar el usuario que viene del req.body con express validator.
//verificar si el usuario ya esta registrado
//enviar correo