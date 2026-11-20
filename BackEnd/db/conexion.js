require('dotenv').config();
const db = require('mysql2');

// Crear la conexión a la base de datos usando variables de entorno
const conection = db.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'DBFoodin_line',
    user: process.env.DB_USER || 'foodin1',
    password: process.env.DB_PASSWORD || 'foodeable'
});

// Intentar conectar a la base de datos
conection.connect(function(err) {
    if (err) {
        console.error('Fallo al conectar a MySQL:', err.message);
    } else {
        console.log('Conexion exitosa');
    }
});

// Exporta la conexión para poder usarla en otros archivos
module.exports = conection;