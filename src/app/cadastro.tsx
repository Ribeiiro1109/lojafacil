import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { cadastrarUsuario } from '../database';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleCadastrar() {
    setErro('');

    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não são iguais.');
      return;
    }

    setCarregando(true);
    try {
      const resultado = await cadastrarUsuario(nome, email, senha);
      if (resultado.ok) {
        Alert.alert('Sucesso', resultado.mensagem, [
          { text: 'OK', onPress: () => router.replace('/') },
        ]);
      } else {
        setErro(resultado.mensagem);
      }
    } catch (e) {
      setErro('Erro ao salvar o cadastro. Tente novamente.');
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
      <Text style={styles.subtitulo}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Pressable
        style={[styles.botao, carregando && styles.botaoDesabilitado]}
        onPress={handleCadastrar}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/')}>
        <Text style={styles.link}>Já tenho conta? Voltar ao login</Text>
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
