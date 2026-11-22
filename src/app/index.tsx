import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { verificarLogin } from '../database';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleEntrar() {
    setErro('');

    if (!email.trim() || !senha) {
      setErro('Informe e-mail e senha.');
      return;
    }

    setCarregando(true);
    try {
      const usuario = await verificarLogin(email, senha);

      if (usuario === null) {
        setErro('E-mail ou senha incorretos.');
      } else {
        router.replace({
          pathname: '/catalogo',
          params: { nome: usuario.nome },
        });
      }
    } catch (e) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>LojaFácil</Text>
      <Text style={styles.subtitulo}>Entre para ver os produtos</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Pressable
        style={[styles.botao, carregando && styles.botaoDesabilitado]}
        onPress={handleEntrar}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/cadastro')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F8FF',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E5BFF',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D7E5',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  erro: {
    color: '#D32F2F',
    marginBottom: 12,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#1E5BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#1E5BFF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
