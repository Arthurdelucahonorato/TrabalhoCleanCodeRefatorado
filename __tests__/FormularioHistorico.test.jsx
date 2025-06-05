import { fireEvent, render, screen } from '@testing-library/react-native';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../database/variaveis', () => ({
  __esModule: true,
  Bhistorico_medico: 'Hipertensão',
  BsetHistoricoMedico: jest.fn(),
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
  
  const MockedBotoes = ({ texto, submit }) => (
    <TouchableOpacity testID="botao-component" onPress={submit}>
      <Text testID="botao-texto">{texto}</Text>
    </TouchableOpacity>
  );
  
  MockedBotoes.displayName = 'MockedBotoes';
  
  return MockedBotoes;
});

const FormularioHistorico = require('../components/Formularios/FormularioHistorico').default;

describe('FormularioHistorico', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o label de histórico médico', () => {
    render(<FormularioHistorico />);
    expect(screen.getByText('Histórico Médico')).toBeTruthy();
  });

  it('deve renderizar o TextInput para histórico médico', () => {
    render(<FormularioHistorico />);
    expect(screen.getByDisplayValue('Hipertensão')).toBeTruthy();
  });

  it('deve renderizar o placeholder correto', () => {
    render(<FormularioHistorico />);
    expect(screen.getByPlaceholderText('Ex: Hipertensão, diabetes, AVC')).toBeTruthy();
  });

  it('deve renderizar o botão com texto "Próximo"', () => {
    render(<FormularioHistorico />);
    expect(screen.getByText('Próximo')).toBeTruthy();
  });

  it('deve permitir alterar o texto do histórico médico', () => {
    render(<FormularioHistorico />);
    
    const input = screen.getByDisplayValue('Hipertensão');
    fireEvent.changeText(input, 'Diabetes tipo 2');
    
    expect(screen.getByDisplayValue('Diabetes tipo 2')).toBeTruthy();
  });

  it('deve permitir inserir texto longo no campo', () => {
    render(<FormularioHistorico />);
    
    const input = screen.getByDisplayValue('Hipertensão');
    const textoLongo = 'Histórico de hipertensão arterial sistêmica controlada com medicação, diabetes mellitus tipo 2 em tratamento com metformina, sem complicações associadas. Antecedente familiar de doença cardiovascular.';
    
    fireEvent.changeText(input, textoLongo);
    
    expect(screen.getByDisplayValue(textoLongo)).toBeTruthy();
  });

  it('deve permitir limpar o campo de texto', () => {
    render(<FormularioHistorico />);
    
    const input = screen.getByDisplayValue('Hipertensão');
    fireEvent.changeText(input, '');
    
    expect(screen.getByDisplayValue('')).toBeTruthy();
  });

  it('deve ser um campo multiline', () => {
    render(<FormularioHistorico />);
    
    const input = screen.getByDisplayValue('Hipertensão');
    const textoMultiline = 'Linha 1\nLinha 2\nLinha 3';
    
    fireEvent.changeText(input, textoMultiline);
    
    expect(screen.getByDisplayValue(textoMultiline)).toBeTruthy();
  });

  it('deve executar submit quando botão é pressionado', () => {
    const { BsetHistoricoMedico, inserirOuAtualizarUsuario } = require('../database/variaveis');
    
    render(<FormularioHistorico />);
    
    const input = screen.getByDisplayValue('Hipertensão');
    fireEvent.changeText(input, 'Novo histórico');
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(BsetHistoricoMedico).toHaveBeenCalledWith('Novo histórico');
    expect(inserirOuAtualizarUsuario).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('PerfilUsuario/ProblemasAlimentares');
  });

  it('deve navegar para ProblemasAlimentares após submit', () => {
    render(<FormularioHistorico />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(mockPush).toHaveBeenCalledWith('PerfilUsuario/ProblemasAlimentares');
  });

  it('deve manter o valor original quando não alterado', () => {
    render(<FormularioHistorico />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    const { BsetHistoricoMedico } = require('../database/variaveis');
    expect(BsetHistoricoMedico).toHaveBeenCalledWith('Hipertensão');
  });

  it('deve ter a estrutura básica do formulário', () => {
    render(<FormularioHistorico />);
    
    expect(screen.getByText('Histórico Médico')).toBeTruthy();
    expect(screen.getByDisplayValue('Hipertensão')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ex: Hipertensão, diabetes, AVC')).toBeTruthy();
    expect(screen.getByTestId('botao-component')).toBeTruthy();
  });

  it('deve permitir caracteres especiais no texto', () => {
    render(<FormularioHistorico />);
    
    const input = screen.getByDisplayValue('Hipertensão');
    const textoEspecial = 'Histórico: DM2, HAS (2019), cirurgia - 15/03/2020';
    
    fireEvent.changeText(input, textoEspecial);
    
    expect(screen.getByDisplayValue(textoEspecial)).toBeTruthy();
  });
});
