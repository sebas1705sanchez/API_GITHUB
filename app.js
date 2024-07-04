import express from 'express';  //framework para crear el servidor
import router from './src/routers/routes.js'; //importamos las rutas de routes.js
/* import path from 'path';
import pg from "pg"; // Importamos pg (PostgreSQL client) */


const app = express(); //instanciamos Express

app.use(express.json()); //usamos express para poder recibir y enviar archivos json

app.use("/api", router); // middleware para usar las rutas de routes.js

app.get('/', (req, res) => {
    console.log('Ruta raíz');
    res.send('Hello World!');
    /* res.sendFile(path.join(process.cwd(), './routers/routes.json')); */
});

export default app; //exportamos app

/* const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ping", async (req, res) => {
    const result =await pool.query("SELECT NOW()"); // Le consulta la fecha actual a la base de datos
    
    return res.json(result.rows[0]);
  });

app.listen(3000);
console.log("Server running on port 3000");
 */