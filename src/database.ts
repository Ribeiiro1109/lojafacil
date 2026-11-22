import * as SQLite from 'expo-sqlite';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

export type Resultado = {
  ok: boolean;
  mensagem: string;
};

let db: SQLite.SQLiteDatabase | null = null;

async function abrirBanco(): Promise<SQLite.SQLiteDatabase> {
  if (db === null) {
    db = await SQLite.openDatabaseAsync('lojafacil.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      );
    `);
  }
  return db;
}

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
): Promise<Resultado> {
  const banco = await abrirBanco();
  const emailLimpo = email.trim().toLowerCase();

  const existente = await banco.getFirstAsync<Usuario>(
    'SELECT * FROM usuarios WHERE email = ?',
    [emailLimpo]
  );

  if (existente !== null) {
    return { ok: false, mensagem: 'Este e-mail já está cadastrado.' };
  }

  await banco.runAsync(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome.trim(), emailLimpo, senha]
  );

  return { ok: true, mensagem: 'Cadastro realizado com sucesso!' };
}

export async function verificarLogin(
  email: string,
  senha: string
): Promise<Usuario | null> {
  const banco = await abrirBanco();
  const emailLimpo = email.trim().toLowerCase();

  const usuario = await banco.getFirstAsync<Usuario>(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [emailLimpo, senha]
  );

  return usuario;
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const banco = await abrirBanco();
  return await banco.getAllAsync<Usuario>('SELECT * FROM usuarios');
}
