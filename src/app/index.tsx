import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LojaFácil</Text>
      <Text style={styles.subtitulo}>Tela de login (em construção)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FF',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E5BFF',
  },
  subtitulo: {
    marginTop: 8,
    fontSize: 16,
    color: '#555555',
  },
});
