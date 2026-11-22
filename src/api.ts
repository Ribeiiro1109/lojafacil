const URL_BASE = 'https://fakestoreapi.com';

export type Produto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export async function buscarProdutos(): Promise<Produto[]> {
  const resposta = await fetch(`${URL_BASE}/products`);

  if (!resposta.ok) {
    throw new Error('Falha ao carregar os produtos.');
  }

  const dados: Produto[] = await resposta.json();
  return dados;
}
