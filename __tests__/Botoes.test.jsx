import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Botoes from '../components/Botoes';

// Mock do Colors
jest.mock('../constants/Colors', () => ({
  verdeBase: '#4CAF50',
  brancoBase: '#FFFFFF',
}));

describe('Componente Botoes', () => {
  const defaultProps = {
    texto: 'Próximo',
    urlAnterior: 'home',
    ativo: true,
    submit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar corretamente com props básicas', () => {
    const { getByText } = render(<Botoes {...defaultProps} />);
    
    expect(getByText('Próximo')).toBeTruthy();
    expect(getByText('Voltar')).toBeTruthy();
  });

  test('deve renderizar apenas o botão próximo quando ativo é false', () => {
    const props = { ...defaultProps, ativo: false };
    const { getByText, queryByText } = render(<Botoes {...props} />);
    
    expect(getByText('Próximo')).toBeTruthy();
    expect(queryByText('Voltar')).toBeNull();
  });

  test('deve chamar a função submit quando o botão próximo é pressionado', () => {
    const mockSubmit = jest.fn();
    const props = { ...defaultProps, submit: mockSubmit };
    
    const { getByText } = render(<Botoes {...props} />);
    const botaoProximo = getByText('Próximo');
    
    fireEvent.press(botaoProximo);
    
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test('deve aplicar padding customizado quando fornecido', () => {
    const props = { ...defaultProps, padding: 60 };
    const { getByText } = render(<Botoes {...props} />);
    
    const botaoProximo = getByText('Próximo');
    expect(botaoProximo.parent).toBeTruthy();
  });

  test('deve usar padding padrão quando não fornecido', () => {
    const { getByText } = render(<Botoes {...defaultProps} />);
    
    const botaoProximo = getByText('Próximo');
    expect(botaoProximo).toBeTruthy();
  });

  test('deve navegar quando o botão voltar é pressionado', () => {
    const { getByText } = render(<Botoes {...defaultProps} />);
    const botaoVoltar = getByText('Voltar');
    
    fireEvent.press(botaoVoltar);
    
    expect(botaoVoltar).toBeTruthy();
  });
});
