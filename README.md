# LojaFácil

Aplicativo mobile de catálogo de produtos, desenvolvido como trabalho acadêmico.

**Aluno:** João Victor Ribeiro Soares
**Curso / Disciplina:** Programação Para Dispositivos Móveis em Android


## Sobre o projeto

O LojaFácil permite que o usuário crie uma conta, faça login e navegue por um catálogo de produtos com imagens, preços e categorias. Ao tocar em um produto, é possível ver os detalhes completos.

## Requisitos atendidos

- Aplicativo com tema livre (catálogo de produtos).
- Banco de dados SQLite.
- Tela de cadastro de usuários, salvos no SQLite.
- Tela de login, que consulta o SQLite.
- Lista de produtos com imagens.
- Tela de detalhes do produto.
- Consulta a uma API externa (Fake Store API).

## Tecnologias utilizadas

| Pacote | Para que serve |
|---|---|
| expo | Framework para desenvolver e executar o aplicativo |
| react | Criação de componentes e controle de estados |
| react-native | Telas, botões, listas e campos |
| expo-router | Navegação entre as telas |
| expo-sqlite | Banco de dados SQLite |

Recursos do React Native utilizados: `useState`, `useEffect`, `FlatList`, `Image`, `TextInput`, `Pressable`, `StyleSheet` e `fetch`.

Os demais pacotes listados no `package.json` foram instalados automaticamente pelo template oficial do Expo (`create-expo-app`).

## API utilizada

[Fake Store API](https://fakestoreapi.com/products) — fornece produtos, imagens, preços (em dólar), categorias e descrições.

## Estrutura do projeto

```
LojaFacil/
├── assets/
├── src/
│   ├── app/
│   │   ├── _layout.tsx        Configuração da navegação (Stack)
│   │   ├── index.tsx          Tela de login
│   │   ├── cadastro.tsx       Tela de cadastro
│   │   ├── catalogo.tsx       Catálogo de produtos
│   │   └── produto/
│   │       └── [id].tsx       Detalhes do produto
│   ├── api.ts                 Consultas à Fake Store API
│   └── database.ts            Banco SQLite (usuários)
├── app.json
├── package.json
└── package-lock.json
```

## Fluxo do aplicativo

Login → Cadastro → Login → Catálogo → Detalhes do produto

## Como executar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

   ```
   npm install
   ```

3. Inicie o projeto:

   ```
   npx expo start
   ```

4. Abra o aplicativo:
   - **Celular:** instale o app **Expo Go** e escaneie o QR Code (celular e computador na mesma rede Wi-Fi).
   - **Emulador Android:** pressione `a` no terminal.

## Observações

- O aplicativo deve ser testado no **celular ou emulador**. O `expo-sqlite` não está configurado para o navegador (versão web).
- O banco de dados é criado no próprio dispositivo na primeira execução. Na primeira vez, é necessário **criar uma conta** na tela de cadastro antes de fazer login.
- As senhas são salvas em texto simples no SQLite, por simplicidade acadêmica. Em um aplicativo real, elas seriam criptografadas.
- Os preços são exibidos em dólar (US$), do jeito que a API os fornece.
