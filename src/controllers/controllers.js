import { Octokit } from "@octokit/rest";
import { config } from "dotenv";

// Cargar las variables de entorno
config();

// Verificar que la variable de entorno está cargada correctamente
console.log(`GITHUB_TOKEN: ${process.env.GITHUB_TOKEN}`);

// Configurar Octokit con el token de acceso personal
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Prueba para verificar la autentcación de usuario
/* (async () => {
  try {
    const { data } = await octokit.request('GET /user');
    console.log('Authenticated User:', data);
  } catch (error) {
    console.error('Authentication Error:', error);
  }
})(); */

export const getUsers = async (req, res) => {
  const { username } = req.params;

  console.log(`Requesting data for GitHub user: ${username}`);
  
  try {
    // Hacer una solicitud a la API de GitHub para obtener el usuario
    const { data } = await octokit.users.getByUsername({ username });

    res.status(200).json({
      message: "Get user",
      user: data,
    });
  } catch (error) {
    console.error('Error fetching user from GitHub:', error);
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};
