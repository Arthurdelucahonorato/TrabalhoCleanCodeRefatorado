import { fireEvent, render, screen } from '@testing-library/react-native';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../database/variaveis', () => ({
  __esModule: true,
  Bexcluir_alimentos: 'Melancia, uva',
  BsetExcluirAlimentos: jest.fn(),
  inserirOuAtualizarUsuario: jest.fn(),
}));

jest.mock('../constants/Colors', () => ({
  __esModule: true,
  default: {
    brancoBase: '#FFFFFF',
    cinzaBase: '#CCCCCC',
  },
}));

jest.mock('../components/Botoes', () => {
  const { TouchableOpacity, Text } = require('react-native');
  
  return ({ texto, submit }) => (
    <TouchableOpacity testID="botao-component" onPress={submit}>
      <Text testID="botao-texto">{texto}</Text>
    </TouchableOpacity>
  );
});

const FormularioNaoIncluir = require('../components/Formularios/FormularioNaoIncluir').default;

describe('FormularioNaoIncluir', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o label de alimentos para não incluir', () => {
    render(<FormularioNaoIncluir />);
    expect(screen.getByText('Alimentos Para Não Incluir')).toBeTruthy();
  });

  it('deve renderizar o TextInput com valor inicial', () => {
    render(<FormularioNaoIncluir />);
    expect(screen.getByDisplayValue('Melancia, uva')).toBeTruthy();
  });

  it('deve renderizar o placeholder correto', () => {
    render(<FormularioNaoIncluir />);
    expect(screen.getByPlaceholderText('Ex: Melancia, aipim, uva')).toBeTruthy();
  });

  it('deve renderizar o botão com texto "Próximo"', () => {
    render(<FormularioNaoIncluir />);
    expect(screen.getByText('Próximo')).toBeTruthy();
  });

  it('deve permitir alterar a lista de alimentos', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    fireEvent.changeText(input, 'Banana, maçã, pêra');
    
    expect(screen.getByDisplayValue('Banana, maçã, pêra')).toBeTruthy();
  });

  it('deve permitir adicionar um único alimento', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    fireEvent.changeText(input, 'Abacaxi');
    
    expect(screen.getByDisplayValue('Abacaxi')).toBeTruthy();
  });

  it('deve permitir inserir lista longa de alimentos', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    const listaLonga = 'Melancia, uva, banana, maçã, pêra, abacaxi, manga, mamão, laranja, limão, goiaba, caju, açaí, cupuaçu, graviola, pitanga';
    
    fireEvent.changeText(input, listaLonga);
    
    expect(screen.getByDisplayValue(listaLonga)).toBeTruthy();
  });

  it('deve permitir limpar a lista de alimentos', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    fireEvent.changeText(input, '');
    
    expect(screen.getByDisplayValue('')).toBeTruthy();
  });

  it('deve aceitar diferentes formatos de separação', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    const formatoDiferente = 'Banana; maçã\nPêra - abacaxi';
    
    fireEvent.changeText(input, formatoDiferente);
    
    expect(screen.getByDisplayValue(formatoDiferente)).toBeTruthy();
  });

  it('deve executar submit quando botão é pressionado', () => {
    const { BsetExcluirAlimentos, inserirOuAtualizarUsuario } = require('../database/variaveis');
    
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    fireEvent.changeText(input, 'Banana, maçã');
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(BsetExcluirAlimentos).toHaveBeenCalledWith('Banana, maçã');
    expect(inserirOuAtualizarUsuario).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('GuiaAlimentar');
  });

  it('deve navegar para GuiaAlimentar após submit', () => {
    render(<FormularioNaoIncluir />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(mockPush).toHaveBeenCalledWith('GuiaAlimentar');
  });

  it('deve manter o valor original quando não alterado', () => {
    render(<FormularioNaoIncluir />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    const { BsetExcluirAlimentos } = require('../database/variaveis');
    expect(BsetExcluirAlimentos).toHaveBeenCalledWith('Melancia, uva');
  });

  it('deve aceitar alimentos com acentos e caracteres especiais', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    const alimentosEspeciais = 'Açaí, caju, maçã, pêssego, côco';
    
    fireEvent.changeText(input, alimentosEspeciais);
    
    expect(screen.getByDisplayValue(alimentosEspeciais)).toBeTruthy();
  });

  it('deve ter a estrutura básica do formulário', () => {
    render(<FormularioNaoIncluir />);
    
    expect(screen.getByText('Alimentos Para Não Incluir')).toBeTruthy();
    expect(screen.getByDisplayValue('Melancia, uva')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ex: Melancia, aipim, uva')).toBeTruthy();
    expect(screen.getByTestId('botao-component')).toBeTruthy();
  });

  it('deve aceitar números e medidas nos alimentos', () => {
    render(<FormularioNaoIncluir />);
    
    const input = screen.getByDisplayValue('Melancia, uva');
    const alimentosComMedidas = 'Banana (muito doce), açúcar refinado, refrigerante 2L';
    
    fireEvent.changeText(input, alimentosComMedidas);
    
    expect(screen.getByDisplayValue(alimentosComMedidas)).toBeTruthy();
  });
});
