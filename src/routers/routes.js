import { Router } from "express"; //importamos Router de express que nos ayuda a crear las rutas
/* import {
    registerAdmin,
    register,
    login,
    logout,
    profile,
    getUsers,
  } from "../controllers/controllers.js"; //importamos las funciones de auth.controllers.js */

const router = Router(); //Instanciamos Router

router.get("/", (req, res) => {
    console.log("Rutas de la api");
    //creamos una ruta get para la raiz de nuestro servidor
    res.send("Rutas de la api"); //enviamos un mensaje
  });

export default router; //Exportamos las rutas