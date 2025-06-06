# Implementação de Interface Fluente

Este documento descreve as interfaces fluentes implementadas no projeto, que permitem configuração de objetos de forma encadeada e legível, seguindo o padrão Builder.

## 📋 Visão Geral

As interfaces fluentes foram implementadas para melhorar a legibilidade e facilitar a configuração de:

1. **ApiRequestBuilder** - Configuração de requisições para API ChatGPT
2. **UserDataBuilder** - Gerenciamento de dados do usuário

## 🔧 ApiRequestBuilder

Localização: `components/requisicaoGPT/ApiRequestBuilder.jsx`

### Uso Básico

```javascript
import ApiRequestBuilder from './components/requisicaoGPT/ApiRequestBuilder';

// Configuração básica
const response = await new ApiRequestBuilder()
  .withApiKey('sua-api-key')
  .withUserMessage('Olá, como você está?')
  .withMaxTokens(1000)
  .execute();
```

### Métodos Disponíveis

#### Configuração de API
- `withApiKey(apiKey)` - Define a chave da API
- `withModel(model)` - Define o modelo (ex: 'gpt-3.5-turbo', 'gpt-4')

#### Configuração de Parâmetros
- `withTemperature(temperature)` - Define temperatura (0-2)
- `withMaxTokens(maxTokens)` - Define número máximo de tokens
- `withTopP(topP)` - Define parâmetro top_p (0-1)

#### Configuração de Mensagens
- `withUserMessage(content)` - Adiciona mensagem do usuário
- `withSystemMessage(content)` - Adiciona mensagem do sistema
- `withAssistantMessage(content)` - Adiciona mensagem do assistente

#### Configurações Predefinidas
- `forCreativeResponse()` - Configura para respostas criativas (temperatura: 1.2, top_p: 0.9)
- `forPreciseResponse()` - Configura para respostas precisas (temperatura: 0.3, top_p: 1)

#### Execução e Utilitários
- `execute()` - Executa a requisição
- `getConfig()` - Retorna configuração atual (útil para debug)

### Exemplos Avançados

```javascript
// Resposta criativa
const creativeResponse = await new ApiRequestBuilder()
  .withApiKey('sua-api-key')
  .withSystemMessage('Você é um escritor criativo')
  .withUserMessage('Escreva uma história sobre robôs')
  .forCreativeResponse()
  .execute();

// Resposta precisa para dados técnicos
const preciseResponse = await new ApiRequestBuilder()
  .withApiKey('sua-api-key')
  .withUserMessage('Explique como funciona o HTTP')
  .withMaxTokens(500)
  .forPreciseResponse()
  .execute();

// Configuração personalizada
const customResponse = await new ApiRequestBuilder()
  .withApiKey('sua-api-key')
  .withModel('gpt-4')
  .withTemperature(0.7)
  .withMaxTokens(2000)
  .withTopP(0.9)
  .withSystemMessage('Você é um assistente técnico')
  .withUserMessage('Como otimizar performance em React?')
  .execute();
```

### Funções Convenientes

No arquivo `ChamaApi.jsx`, foram criadas funções que utilizam o builder:

```javascript
import { 
  fetchChatGPTResponseFluent, 
  fetchCreativeResponse, 
  fetchPreciseResponse 
} from './components/requisicaoGPT/ChamaApi';

// Substitui a função original
const response1 = await fetchChatGPTResponseFluent(apiKey, prompt, tokens);

// Para respostas criativas
const response2 = await fetchCreativeResponse(apiKey, prompt, tokens);

// Para respostas precisas
const response3 = await fetchPreciseResponse(apiKey, prompt, tokens);
```

## 👤 UserDataBuilder

Localização: `database/UserDataBuilder.jsx`

### Uso Básico

```javascript
import UserDataBuilder from './database/UserDataBuilder';

// Configuração e salvamento
await new UserDataBuilder()
  .withNome('João Silva')
  .withIdade('30')
  .withAltura('175')
  .withPeso('70')
  .withGenero('Masculino')
  .build();
```

### Métodos Disponíveis

#### Dados Básicos
- `withNome(nome)` - Define nome do usuário
- `withIdade(idade)` - Define idade (validação: 0-150 anos)
- `withAltura(altura)` - Define altura em cm (validação: 50-300 cm)
- `withPeso(peso)` - Define peso em kg (validação: 20-500 kg)
- `withGenero(genero)` - Define gênero ('Masculino' ou 'Feminino')

#### Dados Físicos
- `withNivelDeAtividade(nivel)` - Define nível de atividade física
- `withGordura(gordura)` - Define percentual de gordura corporal
- `withCalorias(calorias)` - Define calorias diárias necessárias

#### Dados Médicos
- `withHistoricoMedico(historico)` - Define histórico médico
- `withIntolerancias(intolerancias)` - Define intolerâncias alimentares
- `withExcluirAlimentos(alimentos)` - Define alimentos a excluir

#### Configuração em Lote
- `withDadosBasicos({nome, idade, altura, peso, genero})` - Configura dados básicos
- `withDadosFisicos({gordura, calorias, nivelDeAtividade})` - Configura dados físicos
- `withDadosMedicos({historicoMedico, intolerancias, excluirAlimentos})` - Configura dados médicos

#### Operações
- `validate()` - Valida dados obrigatórios
- `apply()` - Aplica dados às variáveis globais
- `save()` - Valida, aplica e salva no banco
- `build()` - Alias para save()
- `getData()` - Retorna dados atuais
- `clear()` - Limpa todos os dados

### Exemplos Avançados

```javascript
// Configuração completa em etapas
const userData = await new UserDataBuilder()
  .withDadosBasicos({
    nome: 'Maria Santos',
    idade: '28',
    altura: '165',
    peso: '60',
    genero: 'Feminino'
  })
  .withDadosFisicos({
    gordura: '18',
    calorias: '1800',
    nivelDeAtividade: 'Moderado'
  })
  .withDadosMedicos({
    historicoMedico: 'Hipertensão controlada',
    intolerancias: 'Lactose',
    excluirAlimentos: 'Crustáceos'
  })
  .build();

// Configuração individual com validação
try {
  const builder = new UserDataBuilder()
    .withNome('João')
    .withIdade('25')
    .withAltura('180')
    .withPeso('75')
    .withGenero('Masculino');
  
  const validation = builder.validate();
  if (validation.isValid) {
    await builder.save();
    console.log('Dados salvos com sucesso!');
  } else {
    console.log('Erros encontrados:', validation.errors);
  }
} catch (error) {
  console.error('Erro ao salvar:', error.message);
}

// Aplicação apenas (sem salvar no banco)
const builder = new UserDataBuilder()
  .withNome('Pedro')
  .withIdade('35')
  .apply(); // Apenas aplica às variáveis globais

// Limpeza de dados
const cleanBuilder = new UserDataBuilder()
  .withNome('Teste')
  .clear() // Limpa todos os campos
  .withNome('Novo Nome');
```

### Uso no FormularioGeral

O `FormularioGeral.jsx` foi atualizado para usar a interface fluente:

```javascript
// Método antigo (mantido como fallback)
const handleSubmitOld = () => {
  BsetNome(nome);
  BsetIdade(idade);
  BsetAltura(altura);
  BsetPeso(peso);
  BsetGenero(genero);
  inserirOuAtualizarUsuario();
};

// Novo método com interface fluente
const handleSubmit = async () => {
  try {
    await new UserDataBuilder()
      .withDadosBasicos({
        nome,
        idade,
        altura,
        peso,
        genero
      })
      .build();
    
    router.push('/PerfilUsuario/Fisico');
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    // Fallback para método antigo
    handleSubmitOld();
  }
};
```

## ✅ Validações

### ApiRequestBuilder
- Temperature limitada entre 0 e 2
- Top_p limitado entre 0 e 1
- Max_tokens mínimo de 1

### UserDataBuilder
- Nome obrigatório (não vazio)
- Idade entre 0 e 150 anos
- Altura entre 50 e 300 cm
- Peso entre 20 e 500 kg
- Gênero deve ser 'Masculino' ou 'Feminino'

## 🧪 Testes

Os testes cobrem:

### ApiRequestBuilder (`__tests__/ApiRequestBuilder.test.jsx`)
- Configuração básica com interface fluente
- Configurações predefinidas (criativa/precisa)
- Adição de múltiplas mensagens
- Validação de limites de parâmetros
- Execução de requisições
- Tratamento de erros
- Encadeamento completo de métodos

### UserDataBuilder (`__tests__/UserDataBuilder.test.jsx`)
- Configuração de dados básicos
- Métodos de configuração em lote
- Validações de entrada
- Aplicação às variáveis globais
- Salvamento no banco de dados
- Tratamento de erros
- Limpeza de dados
- Encadeamento completo de métodos

Execute os testes:
```bash
npm test -- --testPathPattern="ApiRequestBuilder|UserDataBuilder"
```

## 🎯 Benefícios da Implementação

1. **Legibilidade**: Código mais legível e autodocumentado
2. **Flexibilidade**: Configuração encadeada permite diferentes combinações
3. **Validação**: Validação automática de dados de entrada
4. **Manutenibilidade**: Centralização da lógica de configuração
5. **Reutilização**: Builders podem ser reutilizados em diferentes contextos
6. **Compatibilidade**: Mantém compatibilidade com código existente
7. **Testabilidade**: Facilita criação de testes unitários

## 🔄 Migração

A implementação foi feita de forma **não disruptiva**:

- **ApiRequestBuilder**: Funções originais mantidas, novas funções fluentes adicionadas
- **UserDataBuilder**: Método original mantido como fallback no FormularioGeral
- **Testes**: Novos testes criados sem afetar testes existentes
- **Funcionalidade**: Zero impacto na funcionalidade existente

## 📝 Próximos Passos

Áreas que podem se beneficiar de interfaces fluentes no futuro:

1. **Configuração de Componentes**: Builder para props de componentes complexos
2. **Configuração de Banco**: Builder para queries SQL complexas
3. **Configuração de Estilo**: Builder para StyleSheet dinâmicos
4. **Configuração de Formulários**: Builder para validação de formulários
5. **Configuração de Navegação**: Builder para rotas e parâmetros
