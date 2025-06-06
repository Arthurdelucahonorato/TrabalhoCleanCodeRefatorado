import ApiRequestBuilder from '../components/requisicaoGPT/ApiRequestBuilder';

global.fetch = jest.fn();

describe('ApiRequestBuilder - Interface Fluente', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('deve construir requisição básica com interface fluente', () => {
    const builder = new ApiRequestBuilder()
      .withApiKey('test-key')
      .withUserMessage('Olá!')
      .withMaxTokens(500);

    const config = builder.getConfig();

    expect(config.headers.Authorization).toBe('Bearer test-key');
    expect(config.config.messages).toContainEqual({
      role: 'user',
      content: 'Olá!'
    });
    expect(config.config.max_tokens).toBe(500);
  });

  test('deve configurar parâmetros para resposta criativa', () => {
    const builder = new ApiRequestBuilder()
      .forCreativeResponse();

    const config = builder.getConfig();

    expect(config.config.temperature).toBe(1.2);
    expect(config.config.top_p).toBe(0.9);
  });

  test('deve configurar parâmetros para resposta precisa', () => {
    const builder = new ApiRequestBuilder()
      .forPreciseResponse();

    const config = builder.getConfig();

    expect(config.config.temperature).toBe(0.3);
    expect(config.config.top_p).toBe(1);
  });

  test('deve adicionar múltiplas mensagens', () => {
    const builder = new ApiRequestBuilder()
      .withSystemMessage('Você é um assistente útil')
      .withUserMessage('Qual é a capital do Brasil?')
      .withAssistantMessage('A capital do Brasil é Brasília');

    const config = builder.getConfig();

    expect(config.config.messages).toHaveLength(3);
    expect(config.config.messages[0]).toEqual({
      role: 'system',
      content: 'Você é um assistente útil'
    });
    expect(config.config.messages[1]).toEqual({
      role: 'user',
      content: 'Qual é a capital do Brasil?'
    });
    expect(config.config.messages[2]).toEqual({
      role: 'assistant',
      content: 'A capital do Brasil é Brasília'
    });
  });

  test('deve validar limites de temperatura', () => {
    const builder = new ApiRequestBuilder()
      .withTemperature(3.0) 
      .withTemperature(-1.0);

    const config = builder.getConfig();

    expect(config.config.temperature).toBe(0);
  });

  test('deve validar limites de top_p', () => {
    const builder = new ApiRequestBuilder()
      .withTopP(2.0)
      .withTopP(-0.5);

    const config = builder.getConfig();

    expect(config.config.top_p).toBe(0);
  });

  test('deve executar requisição com configuração correta', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Resposta simulada' } }]
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    const result = await new ApiRequestBuilder()
      .withApiKey('test-key')
      .withUserMessage('Teste')
      .withMaxTokens(100)
      .execute();

    expect(fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-key'
        }),
        body: expect.stringContaining('"max_tokens":100')
      })
    );

    expect(result).toEqual(mockResponse);
  });

  test('deve tratar erros na execução', async () => {
    fetch.mockRejectedValueOnce(new Error('Erro de rede'));

    await expect(
      new ApiRequestBuilder()
        .withApiKey('test-key')
        .withUserMessage('Teste')
        .execute()
    ).rejects.toThrow('Erro de rede');
  });

  test('deve permitir encadeamento completo de métodos', () => {
    const builder = new ApiRequestBuilder()
      .withApiKey('test-key')
      .withModel('gpt-4')
      .withTemperature(0.7)
      .withMaxTokens(1500)
      .withTopP(0.9)
      .withSystemMessage('Sistema')
      .withUserMessage('Usuário')
      .forCreativeResponse();

    const config = builder.getConfig();

    expect(config.headers.Authorization).toBe('Bearer test-key');
    expect(config.config.model).toBe('gpt-4');
    expect(config.config.temperature).toBe(1.2);
    expect(config.config.max_tokens).toBe(1500);
    expect(config.config.top_p).toBe(0.9);
    expect(config.config.messages).toHaveLength(2);
  });
});
