import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FormularioGeral from '../components/Formularios/FormularioGeral';

jest.mock('../database/variaveis', () => ({
  Bnome: 'João Silva',
  Bidade: '25',
  Bpeso: '70',
  Baltura: '175',
  Bgenero: 'Masculino',
  BsetNome: jest.fn(),
  BsetIdade: jest.fn(),
  BsetPeso: jest.fn(),
  BsetAltura: jest.fn(),
  BsetGenero: jest.fn(),
  inserirOuAtualizarUsuario: jest.fn(),
}));

jest.mock('radio-buttons-react-native', () => {
  const React = require('react');
  const MockRadioButton = ({ data, selectedBtn, children }) => {
    return React.createElement('div', {
      'data-testid': 'radio-button-group',
    }, data.map((item, index) => 
      React.createElement('button', {
        key: index,
        'data-testid': `radio-${item.value}`,
        onClick: () => selectedBtn(item),
      }, item.label),
    ));
  };
  MockRadioButton.displayName = 'MockRadioButton';
  return MockRadioButton;
});

describe('Componente FormularioGeral', () => {
  const mockVariaveis = require('../database/variaveis');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar corretamente', () => {
    const { getByText } = render(<FormularioGeral />);
    expect(getByText('Informações Gerais')).toBeTruthy();
  });

  test('deve exibir todos os campos do formulário', () => {
    const { getByDisplayValue, getByText } = render(<FormularioGeral />);
    
    expect(getByText('Nome')).toBeTruthy();
    expect(getByText('Idade')).toBeTruthy();
    expect(getByText('Altura')).toBeTruthy();
    expect(getByText('Peso')).toBeTruthy();
    expect(getByText('Gênero')).toBeTruthy();
  });

  test('deve carregar valores iniciais dos inputs', () => {
    const { getByDisplayValue } = render(<FormularioGeral />);
    
    expect(getByDisplayValue('João Silva')).toBeTruthy();
    expect(getByDisplayValue('25')).toBeTruthy();
    expect(getByDisplayValue('70')).toBeTruthy();
    expect(getByDisplayValue('175')).toBeTruthy();
  });

  test('deve atualizar campo nome', () => {
    const { getByDisplayValue } = render(<FormularioGeral />);
    const inputNome = getByDisplayValue('João Silva');
    
    fireEvent.changeText(inputNome, 'Maria Santos');
    
    expect(inputNome.props.value).toBe('Maria Santos');
  });

  test('deve atualizar campo idade', () => {
    const { getByDisplayValue } = render(<FormularioGeral />);
    const inputIdade = getByDisplayValue('25');
    
    fireEvent.changeText(inputIdade, '30');
    
    expect(inputIdade.props.value).toBe('30');
  });

  test('deve atualizar campo peso', () => {
    const { getByDisplayValue } = render(<FormularioGeral />);
    const inputPeso = getByDisplayValue('70');
    
    fireEvent.changeText(inputPeso, '75');
    
    expect(inputPeso.props.value).toBe('75');
  });

  test('deve atualizar campo altura', () => {
    const { getByDisplayValue } = render(<FormularioGeral />);
    const inputAltura = getByDisplayValue('175');
    
    fireEvent.changeText(inputAltura, '180');
    
    expect(inputAltura.props.value).toBe('180');
  });

  test('deve renderizar seção de gênero', () => {
    const { getByText, root } = render(<FormularioGeral />);
    
    expect(getByText('Gênero')).toBeTruthy();
    expect(root).toBeTruthy();
  });

  test('deve ter componente radio button renderizado', () => {
    const { UNSAFE_getByType } = render(<FormularioGeral />);
    const { View } = require('react-native');
    
    expect(UNSAFE_getByType(View)).toBeTruthy();
  });

  test('deve chamar inserirOuAtualizarUsuario no mount', () => {
    render(<FormularioGeral />);
    
    expect(mockVariaveis.inserirOuAtualizarUsuario).toHaveBeenCalledTimes(1);
  });

  test('deve submeter formulário com dados atualizados', async () => {
    const { getByDisplayValue, getByText } = render(<FormularioGeral />);
    
    const inputNome = getByDisplayValue('João Silva');
    const inputIdade = getByDisplayValue('25');
    const botaoProximo = getByText('Próximo');
    
    fireEvent.changeText(inputNome, 'Pedro Costa');
    fireEvent.changeText(inputIdade, '35');
    fireEvent.press(botaoProximo);
    
    await waitFor(() => {
      expect(mockVariaveis.BsetNome).toHaveBeenCalledWith('Pedro Costa');
      expect(mockVariaveis.BsetIdade).toHaveBeenCalledWith('35');
      expect(mockVariaveis.inserirOuAtualizarUsuario).toHaveBeenCalledTimes(2);
    });
  });

  test('deve salvar todos os campos ao submeter', async () => {
    const { getByText } = render(<FormularioGeral />);
    const botaoProximo = getByText('Próximo');
    
    fireEvent.press(botaoProximo);
    
    await waitFor(() => {
      expect(mockVariaveis.BsetNome).toHaveBeenCalled();
      expect(mockVariaveis.BsetIdade).toHaveBeenCalled();
      expect(mockVariaveis.BsetAltura).toHaveBeenCalled();
      expect(mockVariaveis.BsetPeso).toHaveBeenCalled();
      expect(mockVariaveis.BsetGenero).toHaveBeenCalled();
    });
  });

  test('deve ter placeholders corretos nos inputs', () => {
    const { getByPlaceholderText } = render(<FormularioGeral />);
    
    expect(getByPlaceholderText('cm')).toBeTruthy();
    expect(getByPlaceholderText('kg')).toBeTruthy();
  });

  test('deve renderizar botão com props corretas', () => {
    const { getByText } = render(<FormularioGeral />);
    
    expect(getByText('Próximo')).toBeTruthy();
    expect(getByText('Voltar')).toBeTruthy();
  });
});
