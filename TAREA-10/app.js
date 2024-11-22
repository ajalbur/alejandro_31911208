const express = require('express');
const db = require('./config');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

//Configurar sesion
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));


// Servir archivos estáticos (como CSS Y JS) desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));


//configuracion para el uso peticiones post
app.use(bodyParser.urlencoded({ extended: false }));


//platillas que sean dinamicas
app.set('view engine', 'ejs');


//iniciamos el server

//const hostname= '192.168.3.115';
const port = 3009;
app.listen(port, '0.0.0.0',()=>{
    console.log(`Servidor en funcionamiento desde http://0.0.0.0:${port}`);
});

//index
app.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    const message = req.session.message; // Capturamos el mensaje de la sesión
    req.session.message = null; // Limpiamos el mensaje de la sesión para evitar mostrarlo nuevamente

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.send('Error');
        } else {
            // console.log(results);
            res.render('index', { users: results, message: message });
        }
    });
});



//agregar usuarios
app.post('/add', (req, res) => {
    const { name, email, password, phone, address } = req.body;

    const query = `INSERT INTO users (name, email, password, phone, address) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [name, email, password, phone, address], (err) => {
        if (err) {
            console.error('Error adding user:', err);
            req.session.message = 'Ese correo ya está registrado';
        } else {
            req.session.message = 'Usuario agregado';
        }
        res.redirect('/');
    });
});

//buscar usuario
app.get('/find/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error finding user:', err);
            req.session.message = 'Error usuario no encontrado';
        } else {
            res.render('edit', { user: results[0] });
        }
    });
});

// Ruta para actualizar el usuario en la base de datos
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE users SET name = ? WHERE id = ?';

    db.query(query, [name, id], (err) => {
        if (err) {
            console.error('Error updating user:', err);
            res.send('Error');
        } else {
            req.session.message = 'Usuario actualizado';
            res.redirect('/');

        }
    });
});


//eliminar usuario
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting user:', err);
            req.session.message = 'Error al eliminar usuario';
        } else {
            req.session.message = 'Usuario eliminado';
        }
        res.redirect('/');
    });
});

