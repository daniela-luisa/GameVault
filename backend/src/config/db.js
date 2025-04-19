import mysql from 'mysql2/promise';

export async function conectar() 
{
    if (!global.conexao || global.conexao.state === 'disconnected') 
    {
    global.conexao = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'gamevault',
        });

    console.log('🟢 Conectado ao MySQL!');

  }

  return global.conexao;
}

