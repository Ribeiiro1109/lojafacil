import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { buscarProduto, Produto } from '../../api';

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarProduto() {
    setCarregando(true);
    setErro('');

    try {
      const dado = await buscarProduto(id);
      setProduto(dado);
    } catch (e) {
      setErro('Não foi possível carregar o produto.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProduto();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar ao catálogo</Text>
        </Pressable>
      </View>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#1E5BFF" />
          <Text style={styles.textoCentro}>Carregando produto...</Text>
        </View>
      ) : erro !== '' || produto === null ? (
        <View style={styles.centro}>
          <Text style={styles.erro}>
            {erro !== '' ? erro : 'Produto não encontrado.'}
          </Text>
          <Pressable style={styles.botao} onPress={carregarProduto}>
            <Text style={styles.textoBotao}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.conteudo}>
          <View style={styles.caixaImagem}>
            <Image
              source={{ uri: produto.image }}
              style={styles.imagem}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.categoria}>{produto.category}</Text>
          <Text style={styles.nome}>{produto.title}</Text>
          <Text style={styles.preco}>US$ {produto.price.toFixed(2)}</Text>

          <Text style={styles.tituloDescricao}>Descrição</Text>
          <Text style={styles.descricao}>{produto.description}</Text>
        </ScrollView>
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
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  voltar: {
    color: '#1E5BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  caixaImagem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E7F5',
    padding: 16,
    marginBottom: 20,
  },
  imagem: {
    width: '100%',
    height: 260,
  },
  categoria: {
    fontSize: 14,
    color: '#777777',
    textTransform: 'capitalize',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
  },
  preco: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E5BFF',
    marginTop: 10,
  },
  tituloDescricao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 6,
  },
  descricao: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333333',
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
