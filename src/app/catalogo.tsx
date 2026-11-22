import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { buscarProdutos, Produto } from '../api';

export default function Catalogo() {
  const { nome } = useLocalSearchParams<{ nome: string }>();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarProdutos() {
    setCarregando(true);
    setErro('');

    try {
      const lista = await buscarProdutos();
      setProdutos(lista);
    } catch (e) {
      setErro('Não foi possível carregar os produtos. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function renderizarProduto({ item }: { item: Produto }) {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.imagem}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <Text style={styles.nomeProduto} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.categoria}>{item.category}</Text>
          <Text style={styles.preco}>US$ {item.price.toFixed(2)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>LojaFácil</Text>
          <Text style={styles.boasVindas}>Olá, {nome}!</Text>
        </View>
        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.sair}>Sair</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitulo}>Nossos produtos</Text>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#1E5BFF" />
          <Text style={styles.textoCentro}>Carregando produtos...</Text>
        </View>
      ) : erro !== '' ? (
        <View style={styles.centro}>
          <Text style={styles.erro}>{erro}</Text>
          <Pressable style={styles.botao} onPress={carregarProdutos}>
            <Text style={styles.textoBotao}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderizarProduto}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E5BFF',
  },
  boasVindas: {
    fontSize: 14,
    color: '#555555',
  },
  sair: {
    color: '#1E5BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E1E7F5',
  },
  imagem: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nomeProduto: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  categoria: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E5BFF',
    marginTop: 6,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  textoCentro: {
    marginTop: 12,
    color: '#555555',
  },
  erro: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#1E5BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
