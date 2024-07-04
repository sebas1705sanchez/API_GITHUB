import express from 'express';  //framework para crear el servidor
import router from './src/routers/routes.js'; //importamos las rutas de routes.js


const app = express(); //instanciamos Express

app.use(express.json()); //usamos express para poder recibir y enviar archivos json

app.use("/api", router); // middleware para usar las rutas de routes.js

app.get('/', (req, res) => {
    console.log('Ruta raíz');
    res.send('Hello World!');
});

export default app; //exportamos app