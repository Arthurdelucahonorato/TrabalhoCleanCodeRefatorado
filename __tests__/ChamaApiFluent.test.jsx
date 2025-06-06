import { fetchChatGPTResponseFluent, fetchCreativeResponse, fetchPreciseResponse } from '../components/requisicaoGPT/ChamaApi';
import ApiRequestBuilder from '../components/requisicaoGPT/ApiRequestBuilder';

jest.mock('../components/requisicaoGPT/ApiRequestBuilder');

describe('ChamaApi - Funções Fluentes', () => {
  const mockApiKey = 'sk-test-key-123';
  const mockPrompt = 'Test prompt';
  const mockTokens = 100;

  let mockBuilder;

  beforeEach(() => {
    jest.clearAllMocks();
    
    global.console = {
      ...console,
      error: jest.fn(),
    };

    mockBuilder = {
      withApiKey: jest.fn().mockReturnThis(),
      withUserMessage: jest.fn().mockReturnThis(),
      withMaxTokens: jest.fn().mockReturnThis(),
      forCreativeResponse: jest.fn().mockReturnThis(),
      forPreciseResponse: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    };

    ApiRequestBuilder.mockImplementation(() => mockBuilder);
  });

  describe('fetchChatGPTResponseFluent', () => {
    it('deve usar ApiRequestBuilder corretamente', async () => {
      const mockResponse = {
        choices: [{ message: { content: 'Test response' } }]
      };

      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      const result = await fetchChatGPTResponseFluent(mockApiKey, mockPrompt, mockTokens);

      expect(ApiRequestBuilder).toHaveBeenCalled();
      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(mockApiKey);
      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(mockPrompt);
      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(mockTokens);
      expect(mockBuilder.execute).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('deve propagar erros da API', async () => {
      const mockError = new Error('API Error');
      mockBuilder.execute.mockRejectedValueOnce(mockError);

      await expect(fetchChatGPTResponseFluent(mockApiKey, mockPrompt, mockTokens))
        .rejects.toThrow('API Error');
      
      expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it('deve funcionar com diferentes valores de tokens', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      const customTokens = 500;
      await fetchChatGPTResponseFluent(mockApiKey, mockPrompt, customTokens);

      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(customTokens);
    });

    it('deve funcionar com diferentes chaves de API', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      const customKey = 'sk-custom-key-456';
      await fetchChatGPTResponseFluent(customKey, mockPrompt, mockTokens);

      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(customKey);
    });

    it('deve funcionar com diferentes prompts', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      const customPrompt = 'Custom test prompt';
      await fetchChatGPTResponseFluent(mockApiKey, customPrompt, mockTokens);

      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(customPrompt);
    });
  });

  describe('fetchCreativeResponse', () => {
    it('deve usar valor padrão de tokens quando não especificado', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchCreativeResponse(mockApiKey, mockPrompt);

      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(1000);
    });

    it('deve aceitar tokens customizados', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      const customTokens = 750;
      await fetchCreativeResponse(mockApiKey, mockPrompt, customTokens);

      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(customTokens);
    });

    it('deve usar forCreativeResponse', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchCreativeResponse(mockApiKey, mockPrompt);

      expect(mockBuilder.forCreativeResponse).toHaveBeenCalled();
      expect(mockBuilder.execute).toHaveBeenCalled();
    });

    it('deve propagar erros', async () => {
      const mockError = new Error('Creative API Error');
      mockBuilder.execute.mockRejectedValueOnce(mockError);

      await expect(fetchCreativeResponse(mockApiKey, mockPrompt))
        .rejects.toThrow('Creative API Error');
      
      expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it('deve configurar builder com parâmetros corretos', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchCreativeResponse(mockApiKey, mockPrompt, 500);

      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(mockApiKey);
      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(mockPrompt);
      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(500);
      expect(mockBuilder.forCreativeResponse).toHaveBeenCalled();
    });
  });

  describe('fetchPreciseResponse', () => {
    it('deve usar valor padrão de tokens quando não especificado', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchPreciseResponse(mockApiKey, mockPrompt);

      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(1000);
    });

    it('deve aceitar tokens customizados', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      const customTokens = 300;
      await fetchPreciseResponse(mockApiKey, mockPrompt, customTokens);

      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(customTokens);
    });

    it('deve usar forPreciseResponse', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchPreciseResponse(mockApiKey, mockPrompt);

      expect(mockBuilder.forPreciseResponse).toHaveBeenCalled();
      expect(mockBuilder.execute).toHaveBeenCalled();
    });

    it('deve propagar erros', async () => {
      const mockError = new Error('Precise API Error');
      mockBuilder.execute.mockRejectedValueOnce(mockError);

      await expect(fetchPreciseResponse(mockApiKey, mockPrompt))
        .rejects.toThrow('Precise API Error');
      
      expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it('deve configurar builder com parâmetros corretos', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchPreciseResponse(mockApiKey, mockPrompt, 200);

      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(mockApiKey);
      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(mockPrompt);
      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(200);
      expect(mockBuilder.forPreciseResponse).toHaveBeenCalled();
    });
  });

  describe('Integração com ApiRequestBuilder', () => {
    it('deve criar nova instância do builder a cada chamada', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValue(mockResponse);

      await fetchChatGPTResponseFluent(mockApiKey, mockPrompt, mockTokens);
      await fetchCreativeResponse(mockApiKey, mockPrompt);
      await fetchPreciseResponse(mockApiKey, mockPrompt);

      expect(ApiRequestBuilder).toHaveBeenCalledTimes(3);
    });

    it('deve chamar métodos na ordem correta para fetchChatGPTResponseFluent', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchChatGPTResponseFluent(mockApiKey, mockPrompt, mockTokens);

      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(mockApiKey);
      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(mockPrompt);
      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(mockTokens);
      expect(mockBuilder.execute).toHaveBeenCalled();
    });

    it('deve chamar métodos na ordem correta para fetchCreativeResponse', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchCreativeResponse(mockApiKey, mockPrompt, mockTokens);

      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(mockApiKey);
      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(mockPrompt);
      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(mockTokens);
      expect(mockBuilder.forCreativeResponse).toHaveBeenCalled();
      expect(mockBuilder.execute).toHaveBeenCalled();
    });

    it('deve chamar métodos na ordem correta para fetchPreciseResponse', async () => {
      const mockResponse = { choices: [] };
      mockBuilder.execute.mockResolvedValueOnce(mockResponse);

      await fetchPreciseResponse(mockApiKey, mockPrompt, mockTokens);

      expect(mockBuilder.withApiKey).toHaveBeenCalledWith(mockApiKey);
      expect(mockBuilder.withUserMessage).toHaveBeenCalledWith(mockPrompt);
      expect(mockBuilder.withMaxTokens).toHaveBeenCalledWith(mockTokens);
      expect(mockBuilder.forPreciseResponse).toHaveBeenCalled();
      expect(mockBuilder.execute).toHaveBeenCalled();
    });
  });

  describe('Gerenciamento de Erro e Console', () => {
    it('deve capturar e logar erros em fetchChatGPTResponseFluent', async () => {
      const mockError = new Error('Builder Error');
      mockBuilder.execute.mockRejectedValueOnce(mockError);

      try {
        await fetchChatGPTResponseFluent(mockApiKey, mockPrompt, mockTokens);
      } catch (error) {
        expect(error).toBe(mockError);
      }

      expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it('deve capturar e logar erros em fetchCreativeResponse', async () => {
      const mockError = new Error('Creative Builder Error');
      mockBuilder.execute.mockRejectedValueOnce(mockError);

      try {
        await fetchCreativeResponse(mockApiKey, mockPrompt);
      } catch (error) {
        expect(error).toBe(mockError);
      }

      expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it('deve capturar e logar erros em fetchPreciseResponse', async () => {
      const mockError = new Error('Precise Builder Error');
      mockBuilder.execute.mockRejectedValueOnce(mockError);

      try {
        await fetchPreciseResponse(mockApiKey, mockPrompt);
      } catch (error) {
        expect(error).toBe(mockError);
      }

      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });
});
