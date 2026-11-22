import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cadastrarUsuario, listarUsuarios, Usuario } from '../database';

export default function Login() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mensagem, setMensagem] = useState('');

  async function carregarUsuarios() {
    const lista = await listarUsuarios();
    setUsuarios(lista);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function testarCadastro() {
    const resultado = await cadastrarUsuario('Usuario Teste', 'teste@email.com', '123456');
    setMensagem(resultado.mensagem);
    await carregarUsuarios();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Teste do SQLite</Text>

      <Pressable style={styles.botao} onPress={testarCadastro}>
        <Text style={styles.textoBotao}>Cadastrar usuário de teste</Text>
      </Pressable>

      <Text style={styles.mensagem}>{mensagem}</Text>
      <Text style={styles.mensagem}>Usuários no banco: {usuarios.length}</Text>

      {usuarios.map((u) => (
        <Text key={u.id}>
          {u.id} - {u.nome} - {u.email}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FF',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E5BFF',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#1E5BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mensagem: {
    marginVertical: 10,
  },
});
