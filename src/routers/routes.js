import { Router } from "express"; //importamos Router de express que nos ayuda a crear las rutas
import { getUser } from "../controllers/controllers.js"; //importamos las funciones de auth.controllers.js

const router = Router(); //Instanciamos Router

router.get("/", (req, res) => {
  console.log("Rutas de la api");
  //creamos una ruta get para la raiz de nuestro servidor
  res.send("Rutas de la api"); //enviamos un mensaje
});

router.get("/github/users/:username", getUser); // Ruta para obtener un usuario de GitHub. query: ?include_repos=true

export default router; //Exportamos las rutas
