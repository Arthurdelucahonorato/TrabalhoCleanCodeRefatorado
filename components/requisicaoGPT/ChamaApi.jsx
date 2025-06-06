import ApiRequestBuilder from './ApiRequestBuilder';

export const fetchChatGPTResponse = async (key, prompt, tokens) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: tokens,
        top_p: 1,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Nova função usando interface fluente - substitui a função acima
 * Permite configuração mais flexível e legível
 */
export const fetchChatGPTResponseFluent = async (key, prompt, tokens) => {
  try {
    const data = await new ApiRequestBuilder()
      .withApiKey(key)
      .withUserMessage(prompt)
      .withMaxTokens(tokens)
      .execute();
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Versão para respostas criativas usando interface fluente
 */
export const fetchCreativeResponse = async (key, prompt, tokens = 1000) => {
  try {
    const data = await new ApiRequestBuilder()
      .withApiKey(key)
      .withUserMessage(prompt)
      .withMaxTokens(tokens)
      .forCreativeResponse()
      .execute();
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Versão para respostas precisas usando interface fluente
 */
export const fetchPreciseResponse = async (key, prompt, tokens = 1000) => {
  try {
    const data = await new ApiRequestBuilder()
      .withApiKey(key)
      .withUserMessage(prompt)
      .withMaxTokens(tokens)
      .forPreciseResponse()
      .execute();
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
