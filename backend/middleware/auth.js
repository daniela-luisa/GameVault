import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
* Middleware para verificar autenticação JWT
* Este middleware verifica se o usuário possui um token válido
*/
function verificarToken(req, res, next) {
// Buscar token no header Authorization ou nos cookies
let token = req.headers.authorization;

if (token && token.startsWith('Bearer ')) {
token = token.slice(7); // Remove 'Bearer ' do início
} else {
// Se não encontrou no header, busca nos cookies
token = req.cookies.token;
}
// Se não há token, redireciona para login
 if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
try {
// Verifica e decodifica o token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Adiciona os dados do usuário ao request
req.usuario = {
id_usuario: decoded.id_usuario,
usu_email: decoded.email
};
// Continua para a próxima função
next();

} catch (error) {
// Token inválido ou expirado
console.log('Token inválido:', error.message);
// Limpa o cookie se existir
res.clearCookie('token');
// Redireciona para login
 return res.status(401).json({ erro: 'Token inválido ou expirado' });
}
}

/**
* Middleware para verificar se o usuário é administrador
*/
function verificarAdmin(req, res, next) {
// Primeiro verifica se tem token válido
let token = req.headers.authorization;

 if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
 } else {
    token = req.cookies.adminToken;
 }

if (!token) {
    return res.status(401).json({ erro: 'Token de admin não fornecido' });
  }

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Verifica se é um token de admin
if (!decoded.isAdmin) {
  return res.status(403).json({ erro: 'Acesso negado: não é administrador' });
    
}

req.admin = {
id_admin: decoded.id_admin,
admin_email: decoded.email,
};

next();
} catch (error) {
console.log('Token de admin inválido:', error.message);
res.clearCookie('adminToken');
 return res.status(401).json({ erro: 'Token inválido ou expirado' });
}
}

export{verificarToken,verificarAdmin};
