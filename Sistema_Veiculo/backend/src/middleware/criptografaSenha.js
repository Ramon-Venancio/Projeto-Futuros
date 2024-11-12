import bcrypt from 'bcryptjs';

async function criptografarSenha(req, res, next) {
  try {
    // Verifica se existe uma senha na requisição
    if (req.body.password) {
      const saltRounds = 10; // Define a quantidade de rounds
      console.log(req.body.password);
      req.body.password = await bcrypt.hash(String(req.body.password), saltRounds); // Corrigido aqui
    }
    next(); // Continua para o próximo middleware ou controlador
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: 'Erro ao criptografar a senha' });
  }
}

export default criptografarSenha;
