import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function Catalogo() {
  const { nome } = useLocalSearchParams<{ nome: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LojaFácil</Text>
      <Text style={styles.boasVindas}>Olá, {nome}!</Text>
      <Text style={styles.subtitulo}>Catálogo em construção</Text>

      <Pressable style={styles.botao} onPress={() => router.replace('/')}>
        <Text style={styles.textoBotao}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FF',
    padding: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E5BFF',
  },
  boasVindas: {
    fontSize: 20,
    marginTop: 12,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555555',
    marginTop: 8,
    marginBottom: 24,
  },
  botao: {
    backgroundColor: '#1E5BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});