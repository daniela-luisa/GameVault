import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

/**
* Gera um token JWT para um usuário
* @param {Object} usuario - Dados do usuário
* @returns {String} Token JWT
*/
function gerarToken(usuario) {
const payload = {
id_usuario: usuario.id_usuario,
usu_email: usuario.email,
iat: Math.floor(Date.now() / 1000) // Timestamp atual
};

return jwt.sign(payload, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || '24h'
});
}

/**
* Gera um token JWT para um administrador
* @param {Object} admin - Dados do administrador
* @returns {String} Token JWT
*/
function gerarTokenAdmin(admin) {
const payload = {
id_admin: admin.id_admin,
admin_email: admin.email,
isAdmin: true,
iat: Math.floor(Date.now() / 1000)
};
return jwt.sign(payload, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || '24h'
});
}


/**
* Verifica se um token JWT é válido
* @param {String} token - Token a ser verificado
* @returns {Object|null} Dados decodificados ou null se inválido
*/
function verificarToken(token) {
try {
return jwt.verify(token, process.env.JWT_SECRET);
} catch (error) {
console.log('Erro ao verificar token:', error.message);
return null;
}
}

/**
* Gera hash da senha usando bcrypt
* @param {String} senha - Senha em texto plano
* @returns {String} Hash da senha
*/
async function hashSenha(senha) {
const saltRounds = 10;
return await bcrypt.hash(senha, saltRounds);
}

/**
* Compara senha em texto plano com hash
* @param {String} senha - Senha em texto plano
* @param {String} hash - Hash armazenado no banco
* @returns {Boolean} True se as senhas coincidem
*/
async function compararSenha(senha, hash) {
return await bcrypt.compare(senha, hash);
}

export {gerarToken,gerarTokenAdmin,verificarToken,hashSenha,compararSenha};