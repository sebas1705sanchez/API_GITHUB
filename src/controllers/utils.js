// Función para validar el nombre de usuario de GitHub
export const isValidGitHubUsername = (username) => {
    // Expresión regular para verificar caracteres válidos
    const validUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  
    // Verificar longitud del nombre de usuario
    if (username.length < 1 || username.length > 39) {
      return false;
    }
  
    // Verificar caracteres permitidos
    if (!validUsernameRegex.test(username)) {
      return false;
    }
  
    // Verificar que no comience ni termine con guión
    if (username.startsWith('-') || username.endsWith('-')) {
      return false;
    }
  
    return true;
  }