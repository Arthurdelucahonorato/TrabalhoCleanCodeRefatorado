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

### 5. Abra no emulador Android (recomendado)

Após executar `npm start`, pressione **'A'** no terminal para abrir automaticamente no emulador do Android Studio.

**Pré-requisitos:**
- Android Studio instalado
- Emulador Android configurado e em execução
- Expo Go instalado no emulador (opcional)

### 6. Abra no VS Code (opcional)

```bash
code .
```

## Scripts Disponíveis

### Desenvolvimento
- **`npm start`**: Inicia o servidor de desenvolvimento Expo
- **`npm run start:clean`**: Inicia com cache limpo (recomendado para warnings)
- **`npm run android`**: Executa no emulador Android
- **`npm run android:clean`**: Executa no Android com cache limpo
- **`npm run ios`**: Executa no simulador iOS
- **`npm run web`**: Executa no navegador web

### Qualidade de Código
- **`npm run lint`**: Verifica problemas de código com ESLint
- **`npm run lint:fix`**: Corrige automaticamente problemas do ESLint

### Testes
- **`npm test`**: Executa todos os testes
- **`npm run test:watch`**: Executa testes em modo watch
- **`npm run test:coverage`**: Executa testes com relatório de cobertura

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **Expo Router** para navegação
- **SQLite** para banco de dados local
- **ESLint** para qualidade de código
- **Jest** + **Testing Library** para testes automatizados

## Estrutura do Projeto

```
├── __tests__/          # Testes automatizados
├── components/         # Componentes reutilizáveis
├── constants/          # Constantes e cores
├── database/           # Configuração e operações do banco
├── hooks/              # Custom hooks
├── src/app/            # Páginas da aplicação
├── coverage/           # Relatórios de cobertura de testes
└── .github/workflows/  # CI/CD com GitHub Actions
```

## CI/CD

O projeto possui um workflow do GitHub Actions que executa automaticamente o linter em todos os Pull Requests para verificar a qualidade do código.

## 🧪 Testes Automatizados

O projeto possui uma suíte completa de testes automatizados com **99.16% de cobertura**.

### 📊 Cobertura de Testes

- **Statements**: 99.16%
- **Branches**: 100%
- **Functions**: 96.66%
- **Lines**: 99.15%
- **Total de Testes**: 129 testes passando

### 🚀 Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (desenvolvimento)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### 📁 Estrutura de Testes

```
__tests__/
├── Botoes.test.jsx                    # Componente de botões
├── Cards.test.jsx                     # Cards de refeições
├── ChamaApi.test.jsx                  # Integração com API
├── Colors.test.jsx                    # Constantes de cores
├── FormularioFisico.test.jsx          # Formulário físico
├── FormularioGeral.test.jsx           # Formulário geral
├── FormularioHistorico.test.jsx       # Formulário histórico
├── FormularioNaoIncluir.test.jsx      # Formulário exclusões
├── FormularioProblemasAlimentares.test.jsx # Formulário alergias
├── Header.test.jsx                    # Componente de header
├── JanelaAtual.test.jsx              # Janela atual
└── useLoadFonts.test.jsx             # Hook de fontes
```

### ✅ Componentes com 100% de Cobertura

1. **Botoes.jsx** - Navegação e interações
2. **Cards.jsx** - Estados assíncronos e checkbox
3. **Header.jsx** - Renderização condicional
4. **JanelaAtual.jsx** - Exibição de título
5. **ChamaApi.jsx** - Requisições HTTP e tratamento de erros
6. **FormularioFisico.jsx** - Radio buttons e inputs
7. **FormularioHistorico.jsx** - Campo de texto multiline
8. **FormularioNaoIncluir.jsx** - Lista de alimentos
9. **FormularioProblemasAlimentares.jsx** - Alergias e intolerâncias

### 🔧 Configuração de Testes

O projeto utiliza:
- **Jest 29.7.0** - Framework de testes
- **@testing-library/react-native** - Utilitários para testes
- **Mocks complexos** para componentes third-party
- **ESLint** configurado para arquivos de teste

### 📈 Benefícios dos Testes

- ✅ **Qualidade garantida** - Detecta bugs antes da produção
- ✅ **Refatoração segura** - Permite mudanças com confiança
- ✅ **Documentação viva** - Testes servem como documentação
- ✅ **CI/CD integrado** - Execução automática no GitHub Actions

## ⚠️ Problemas Conhecidos e Soluções

### Avisos Durante Execução

Durante a execução do projeto (`npm start` + tecla 'A'), alguns avisos podem aparecer:

#### 1. **ViewPropTypes Deprecated**
```
ERROR ViewPropTypes will be removed from React Native
```
**Status**: ✅ **Suprimido** - App funciona normalmente
**Causa**: Expo Router usando ViewPropTypes deprecated
**Solução**: Configurado `metro.config.js` para filtrar warnings não críticos

#### 2. **Node.js Deprecation Warnings**
```
DeprecationWarning: The `punycode` module is deprecated
DeprecationWarning: The `util.isArray` API is deprecated
```
**Status**: ✅ **Suprimido** - Warnings do sistema
**Causa**: Dependências internas do Expo/Metro bundler
**Solução**: Filtrados automaticamente pelo Metro config

### 🔧 Supressão de Warnings

Para uma experiência de desenvolvimento mais limpa, implementamos filtros automáticos:

- **Warnings suprimidos**: ViewPropTypes, punycode, util.isArray
- **Warnings preservados**: Erros críticos, problemas de código
- **Scripts disponíveis**: `npm run start:clean` e `npm run android:clean`
- **Configuração**: `metro.config.js` com filtros específicos

#### 3. **Require Cycle Warning**
```
WARN Require cycle: database\variaveis.jsx -> database\database.jsx
```
**Status**: Resolvido
**Solução**: Refatorado dependências circulares entre arquivos do banco

### Compatibilidade

- ✅ **Android**: Testado no emulador Android Studio
- ✅ **Expo Go**: Funciona corretamente
- ✅ **Metro Bundler**: Build bem-sucedido
- ✅ **Funcionalidades**: Todas operacionais

## 📚 Documentação Adicional

- [CHANGELOG.md](./CHANGELOG.md) - Histórico de mudanças e refatorações
