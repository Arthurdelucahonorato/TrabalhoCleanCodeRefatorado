import { fireEvent, render, screen } from '@testing-library/react-native';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../database/variaveis', () => ({
  __esModule: true,
  Bintolerancias: 'Lactose, glúten',
  BsetIntolerancias: jest.fn(),
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
  
  const MockBotoes = ({ texto, submit }) => (
    <TouchableOpacity testID="botao-component" onPress={submit}>
      <Text testID="botao-texto">{texto}</Text>
    </TouchableOpacity>
  );
  MockBotoes.displayName = 'MockBotoes';
  return MockBotoes;
});

const FormularioProblemasAlimentares = require('../components/Formularios/FormularioProblemasAlimentares').default;

describe('FormularioProblemasAlimentares', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o label de alergias/intolerâncias', () => {
    render(<FormularioProblemasAlimentares />);
    expect(screen.getByText('Alergias/Intolerâncias')).toBeTruthy();
  });

  it('deve renderizar o TextInput com valor inicial', () => {
    render(<FormularioProblemasAlimentares />);
    expect(screen.getByDisplayValue('Lactose, glúten')).toBeTruthy();
  });

  it('deve renderizar o placeholder correto', () => {
    render(<FormularioProblemasAlimentares />);
    expect(screen.getByPlaceholderText('Ex: Lactose, glúten')).toBeTruthy();
  });

  it('deve renderizar o botão com texto "Próximo"', () => {
    render(<FormularioProblemasAlimentares />);
    expect(screen.getByText('Próximo')).toBeTruthy();
  });

  it('deve permitir alterar as intolerâncias/alergias', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    fireEvent.changeText(input, 'Amendoim, camarão, soja');
    
    expect(screen.getByDisplayValue('Amendoim, camarão, soja')).toBeTruthy();
  });

  it('deve permitir adicionar uma única alergia', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    fireEvent.changeText(input, 'Ovo');
    
    expect(screen.getByDisplayValue('Ovo')).toBeTruthy();
  });

  it('deve permitir inserir lista detalhada de problemas alimentares', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    const listaDetalhada = 'Intolerância à lactose severa, alergia ao glúten (doença celíaca), sensibilidade a amendoim, alergia a frutos do mar (camarão, lagosta), intolerância à frutose';
    
    fireEvent.changeText(input, listaDetalhada);
    
    expect(screen.getByDisplayValue(listaDetalhada)).toBeTruthy();
  });

  it('deve permitir limpar o campo de problemas alimentares', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    fireEvent.changeText(input, '');
    
    expect(screen.getByDisplayValue('')).toBeTruthy();
  });

  it('deve aceitar texto multiline para descrições detalhadas', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    const textoMultiline = 'Alergias:\n- Amendoim (anafilaxia)\n- Camarão\n\nIntolerâncias:\n- Lactose\n- Glúten';
    
    fireEvent.changeText(input, textoMultiline);
    
    expect(screen.getByDisplayValue(textoMultiline)).toBeTruthy();
  });

  it('deve aceitar graus de severidade nas descrições', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    const descricaoComSeveridade = 'Lactose (severa), glúten (moderada), amendoim (grave - epipen)';
    
    fireEvent.changeText(input, descricaoComSeveridade);
    
    expect(screen.getByDisplayValue(descricaoComSeveridade)).toBeTruthy();
  });

  it('deve executar submit quando botão é pressionado', () => {
    const { BsetIntolerancias, inserirOuAtualizarUsuario } = require('../database/variaveis');
    
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    fireEvent.changeText(input, 'Ovo, soja');
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(BsetIntolerancias).toHaveBeenCalledWith('Ovo, soja');
    expect(inserirOuAtualizarUsuario).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('PerfilUsuario/NaoIncluir');
  });

  it('deve navegar para NaoIncluir após submit', () => {
    render(<FormularioProblemasAlimentares />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(mockPush).toHaveBeenCalledWith('PerfilUsuario/NaoIncluir');
  });

  it('deve manter o valor original quando não alterado', () => {
    render(<FormularioProblemasAlimentares />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    const { BsetIntolerancias } = require('../database/variaveis');
    expect(BsetIntolerancias).toHaveBeenCalledWith('Lactose, glúten');
  });

  it('deve aceitar termos médicos específicos', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    const termosMedicos = 'Doença celíaca, intolerância à lactose congênita, alergia IgE-mediada ao amendoim';
    
    fireEvent.changeText(input, termosMedicos);
    
    expect(screen.getByDisplayValue(termosMedicos)).toBeTruthy();
  });

  it('deve ter a estrutura básica do formulário', () => {
    render(<FormularioProblemasAlimentares />);
    
    expect(screen.getByText('Alergias/Intolerâncias')).toBeTruthy();
    expect(screen.getByDisplayValue('Lactose, glúten')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ex: Lactose, glúten')).toBeTruthy();
    expect(screen.getByTestId('botao-component')).toBeTruthy();
  });

  it('deve aceitar sinais de pontuação para organizar informações', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    const textoOrganizado = 'Alergias: amendoim, camarão; Intolerâncias: lactose, glúten. Observações: evitar contaminação cruzada!';
    
    fireEvent.changeText(input, textoOrganizado);
    
    expect(screen.getByDisplayValue(textoOrganizado)).toBeTruthy();
  });

  it('deve permitir indicar ausência de problemas alimentares', () => {
    render(<FormularioProblemasAlimentares />);
    
    const input = screen.getByDisplayValue('Lactose, glúten');
    fireEvent.changeText(input, 'Nenhuma alergia ou intolerância conhecida');
    
    expect(screen.getByDisplayValue('Nenhuma alergia ou intolerância conhecida')).toBeTruthy();
  });
});
