import { fetchChatGPTResponse } from '../components/requisicaoGPT/ChamaApi';

// Mock do fetch global
global.fetch = jest.fn();

describe('ChamaApi', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchChatGPTResponse', () => {
    const mockApiKey = 'sk-test-key-123';
    const mockPrompt = 'Test prompt';
    const mockTokens = 100;

    it('deve fazer uma requisição bem-sucedida para a API do ChatGPT', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Test response from ChatGPT',
            },
          },
        ],
        usage: {
          total_tokens: 50,
        },
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: mockPrompt,
            },
          ],
          temperature: 0.8,
          max_tokens: mockTokens,
          top_p: 1,
        }),
      });

      expect(result).toEqual(mockResponse);
    });

    it('deve construir corretamente o corpo da requisição com os parâmetros fornecidos', async () => {
      const customPrompt = 'Custom test prompt';
      const customTokens = 200;
      const customKey = 'sk-custom-key';

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ test: 'response' }),
      });

      await fetchChatGPTResponse(customKey, customPrompt, customTokens);

      const callArgs = fetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.messages[0].content).toBe(customPrompt);
      expect(requestBody.max_tokens).toBe(customTokens);
      expect(callArgs[1].headers.Authorization).toBe(`Bearer ${customKey}`);
      expect(requestBody.model).toBe('gpt-3.5-turbo');
      expect(requestBody.temperature).toBe(0.8);
      expect(requestBody.top_p).toBe(1);
    });

    it('deve incluir os headers corretos na requisição', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ test: 'response' }),
      });

      await fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens);

      const callArgs = fetch.mock.calls[0];
      const headers = callArgs[1].headers;

      expect(headers['Content-Type']).toBe('application/json');
      expect(headers.Authorization).toBe(`Bearer ${mockApiKey}`);
    });

    it('deve tratar erros de rede', async () => {
      const networkError = new Error('Network error');
      fetch.mockRejectedValueOnce(networkError);

      // Mock do console.error para evitar logs durante os testes
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens))
        .rejects.toThrow('Network error');

      expect(consoleSpy).toHaveBeenCalledWith(networkError);
      consoleSpy.mockRestore();
    });

    it('deve tratar erros de parsing JSON', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens))
        .rejects.toThrow('Invalid JSON');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('deve retornar a resposta mesmo quando a API retorna erro (status não-ok)', async () => {
      const errorResponse = {
        error: {
          message: 'API key invalid',
          type: 'invalid_request_error',
        },
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => errorResponse,
      });

      const result = await fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens);

      expect(result).toEqual(errorResponse);
    });

    it('deve funcionar com diferentes tipos de conteúdo no prompt', async () => {
      const prompts = [
        'Simple text prompt',
        'Prompt with números 123 and símbolos @#$',
        'Multi\nline\nprompt',
        '',
      ];

      for (const prompt of prompts) {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ content: 'response' }),
        });

        await fetchChatGPTResponse(mockApiKey, prompt, mockTokens);

        const callArgs = fetch.mock.calls[fetch.mock.calls.length - 1];
        const requestBody = JSON.parse(callArgs[1].body);
        expect(requestBody.messages[0].content).toBe(prompt);
      }
    });

    it('deve funcionar com diferentes valores de tokens', async () => {
      const tokenValues = [1, 100, 1000, 4000];

      for (const tokens of tokenValues) {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ content: 'response' }),
        });

        await fetchChatGPTResponse(mockApiKey, mockPrompt, tokens);

        const callArgs = fetch.mock.calls[fetch.mock.calls.length - 1];
        const requestBody = JSON.parse(callArgs[1].body);
        expect(requestBody.max_tokens).toBe(tokens);
      }
    });

    it('deve manter a estrutura correta da mensagem', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ test: 'response' }),
      });

      await fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens);

      const callArgs = fetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.messages).toHaveLength(1);
      expect(requestBody.messages[0]).toHaveProperty('role', 'user');
      expect(requestBody.messages[0]).toHaveProperty('content', mockPrompt);
    });

    it('deve usar os parâmetros corretos do modelo GPT', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ test: 'response' }),
      });

      await fetchChatGPTResponse(mockApiKey, mockPrompt, mockTokens);

      const callArgs = fetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.model).toBe('gpt-3.5-turbo');
      expect(requestBody.temperature).toBe(0.8);
      expect(requestBody.top_p).toBe(1);
    });
  });
});
