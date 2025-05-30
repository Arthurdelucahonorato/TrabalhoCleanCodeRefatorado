# VGB

Bem-vindo ao repositório do VGB!

## Integrantes

- Arthur de Luca Honorato
- Diego Hahn
- João Eduardo Milak Farias

## Como executar

### 1. Clone o repositório

Abra o terminal/cmd, escolha um local para baixar o projeto e digite o seguinte comando:

```bash
git clone https://github.com/Arthurdelucahonorato/TrabalhoCleanCodeRefatorado.git
```

### 2. Navegue para o diretório

```bash
cd TrabalhoCleanCodeRefatorado
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm start
```

### 5. Abra no VS Code (opcional)

```bash
code .
```

## Scripts Disponíveis

- **`npm start`**: Inicia o servidor de desenvolvimento Expo
- **`npm run android`**: Executa no emulador Android
- **`npm run ios`**: Executa no simulador iOS
- **`npm run web`**: Executa no navegador web
- **`npm run lint`**: Verifica problemas de código com ESLint
- **`npm run lint:fix`**: Corrige automaticamente problemas do ESLint

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **Expo Router** para navegação
- **SQLite** para banco de dados local
- **ESLint** para qualidade de código

## Estrutura do Projeto

```
├── components/          # Componentes reutilizáveis
├── constants/          # Constantes e cores
├── database/           # Configuração e operações do banco
├── hooks/              # Custom hooks
├── src/app/            # Páginas da aplicação
└── .github/workflows/  # CI/CD com GitHub Actions
```

## CI/CD

O projeto possui um workflow do GitHub Actions que executa automaticamente o linter em todos os Pull Requests para verificar a qualidade do código.

## Changelog

### 📋 Análise Inicial do ESLint

O linter identificou **192 problemas** no código, sendo **8 erros críticos** e **184 warnings**.

#### 🚨 **Erros Críticos Identificados**

##### Chaves Duplicadas
- `FormularioFisico.jsx` e `FormularioGeral.jsx`: Propriedade `paddingTop` duplicada nos styles

##### Variáveis Read-Only
- `leitura.jsx`: Tentativa de modificar `Bjson_texto` e `Bjson_ingredientes` que são importadas

##### Padrões Vazios
- `_layout.jsx`: Objetos de desestruturação vazios `{ }` em props de ícones

##### Variáveis Globais Não Definidas
- `ChamaApi.jsx`: `fetch` não está definido no escopo global

#### ⚠️ **Warnings Principais**

##### Imports Não Utilizados (Mais Comum)
Componentes importados mas não usados em quase todos os arquivos:
- `React`, `View`, `Text`, `StyleSheet`
- `LinearGradient`, `Header`, `Botoes`
- Componentes de formulário e navegação

##### Variáveis Não Utilizadas
- Props de função não usadas (`urlProximo`, `id`, etc.)
- Variáveis de estado (`loading` em alguns componentes)
- Imports de variáveis do banco de dados

##### Parâmetros de Callback Não Usados
- Parâmetros `_`, `result`, `error` em funções de callback do SQLite

#### 📊 **Arquivos Mais Problemáticos**
1. `FormularioGeral.jsx`: 22 warnings
2. `FormularioHistorico.jsx`: 25 warnings
3. `GerarGuia.jsx`: 10 warnings
4. `Cards.jsx`: 8 warnings

#### 🔧 **Ações Pendentes**

##### Correções Feitas
- Remover imports não utilizados
- Corrigir formatação e pontuação
- Refatoração no GerarGuia.jsx para paralelizar chamadas à API com Promise.all, reduzindo tempo de espera
- Melhoria na UX de ListaCompras.jsx com ActivityIndicator e mensagens de carregamento/vazio

##### Correções Manuais Necessárias
- Resolver chaves duplicadas nos styles
- Corrigir modificação de variáveis read-only
- Adicionar global `fetch` ou importar polyfill
- Remover parâmetros de função não utilizados

##### Melhorias de Código
- Implementar tree-shaking para imports
- Revisar arquitetura de componentes
- Otimizar imports de bibliotecas externas

---

### 🔄 **Próximas Refatorações**
_Esta seção será atualizada conforme o progresso das melhorias..._
