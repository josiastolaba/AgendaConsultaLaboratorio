import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import indexRoutes from './routes/indexRoutes.js'
import inicioRoutes from './routes/inicioRoutes.js'
import session from 'express-session'
import { verificarAutenticador } from './middlewares/autenticacionMiddleware.js'
import agendaRoutes from './routes/agendaRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import medicoRoutes from './routes/medicoRoutes.js'
import turnoRoutes from './routes/turnoRoutes.js'

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const initSessionStore = async () => {
    const MySQLStoreImport = await import('express-mysql-session');
    const MySQLStore = MySQLStoreImport.default(session);
    const options = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
    const sessionStore = new MySQLStore(options);
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
};

initSessionStore().then(() => {
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.url)
    if(req.session.usuario != null && req.url == '/usuario/login'){
        res.redirect('/')
        return
    }
    next()
    
})
app.use('/turno',verificarAutenticador, turnoRoutes)
app.use('/medico',verificarAutenticador, medicoRoutes)
app.use('/usuario',verificarAutenticador, usuarioRoutes)
app.use('/agendas', verificarAutenticador, agendaRoutes)
app.use('/inicio', inicioRoutes);
app.use('/',verificarAutenticador , indexRoutes);
app.get((req,res)=>{
    
})
app.listen(port, ()=>{
    console.log("servidor corriendo en el puerto", port)
})
}).catch(error => {
    console.error('Error al inicializar el store de sesión:', error);
})
