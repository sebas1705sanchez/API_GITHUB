import { Octokit } from "@octokit/rest";

export const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      //para crear un nuevo usuario debemos tener un modelo de usuario (en este caso es User)
      const newUser = new User({
        username,
        email,
        password: passwordHash, //le decimos que la contraseña es nuestra contraseña encriptada
        role: "admin",
      });
      const userSaved = await newUser.save(); //guardamos el nuevo usuario en la base de datos
      const token = await createAccessToken({ id: userSaved._id }); //creamos el token de la id
      const tokenRole = await createAccessToken({ role: userSaved.role }); //creamos el token de la id
      //envia una cookie con el token y el tokenROle
      res.cookie("token", token);
      res.cookie("tokenRole", tokenRole);
  
      res.status(201).json({
        _id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        role: userSaved.role,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };