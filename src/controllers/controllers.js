import { Octokit } from "@octokit/rest";
import { config } from "dotenv";

import { isValidGitHubUsername } from "./utils.js";

config(); // Cargar las variables de entorno

// Configurar Octokit con el token de acceso personal
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/*
   Función para obtener un usuario de GitHub
   Parámetros de entrada:
   - req: objeto de solicitud Express
   - res: objeto de respuesta Express
*/
export const getUser = async (req, res) => {
  const { username } = req.params;
  const include_repos = req.query.include_repos === "true"; // Convertir a booleano

  if (!isValidGitHubUsername(username)) {
    return res.status(400).json({
      message: `400 Bad Request: El parámetro ${username} no es válido.`,
    });
  }

  try {
    // Hacer una solicitud a la API de GitHub para obtener el usuario
    const { data } = await octokit.users.getByUsername({ username });
    if (include_repos) {
      const reposResponse = await octokit.repos.listForUser({
        username,
      });

      // Mapear los datos básicos de repositorios
      const repos = reposResponse.data.map((repo) => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        updated_at: repo.updated_at,
      }));

      // Agregar la lista de repositorios a userData
      data.repos = repos;
    }

    res.status(200).json(data); // Pedido exitoso
  } catch (error) {
    if (error.status === 404) {
      // Si el usuario no existe, devolver un código de estado 404
      return res.status(404).json({
        message: "404 Not Found: El nombre de usuario proporcionado no existe.",
      });
    } else {
      console.error("Error fetching user from GitHub:", error);
      // Para otros errores, devolver un código de estado 500
      res.status(500).json({
        message: "500 Internal Server Error: Error del servidor al procesar la solicitud.",
      });
    }
  }
};
