import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export async function conectar() 
{
    if (!global.conexao || global.conexao.state === 'disconnected') 
    {
    global.conexao = await mysql.createConnection(
        {
            host : process.env.DB_HOST || 'localhost',
            port : process.env.DB_PORT || 3306,
            user : process.env.DB_USER || 'root',
            password : process.env.DB_PASSWORD || '',
            database : process.env.DB_NAME || 'gamevault'
        });

    console.log(' Conectado ao MySQL!');

  }

  return global.conexao;
}

