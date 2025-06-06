class ApiRequestBuilder {
  constructor() {
    this.config = {
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      max_tokens: 1000,
      top_p: 1,
      messages: []
    };
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  withApiKey(apiKey) {
    this.headers.Authorization = `Bearer ${apiKey}`;
    return this;
  }

  withModel(model) {
    this.config.model = model;
    return this;
  }

  withTemperature(temperature) {
    this.config.temperature = Math.max(0, Math.min(2, temperature));
    return this;
  }

  withMaxTokens(maxTokens) {
    this.config.max_tokens = Math.max(1, maxTokens);
    return this;
  }

  withTopP(topP) {
    this.config.top_p = Math.max(0, Math.min(1, topP));
    return this;
  }

  withUserMessage(content) {
    this.config.messages.push({
      role: 'user',
      content: content
    });
    return this;
  }

  withSystemMessage(content) {
    this.config.messages.push({
      role: 'system',
      content: content
    });
    return this;
  }

  withAssistantMessage(content) {
    this.config.messages.push({
      role: 'assistant',
      content: content
    });
    return this;
  }

  forCreativeResponse() {
    this.config.temperature = 1.2;
    this.config.top_p = 0.9;
    return this;
  }

  forPreciseResponse() {
    this.config.temperature = 0.3;
    this.config.top_p = 1;
    return this;
  }

  async execute() {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(this.config)
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  getConfig() {
    return {
      config: { ...this.config },
      headers: { ...this.headers }
    };
  }
}

export default ApiRequestBuilder;
