import { fireEvent, render, screen } from '@testing-library/react-native';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('radio-buttons-react-native', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  
  const MockRadioButton = ({ data, selectedBtn }) => {
    return (
      <View testID="radio-button-group">
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            testID={`radio-option-${item.value}`}
            onPress={() => selectedBtn && selectedBtn(item)}
          >
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  MockRadioButton.displayName = 'MockRadioButton';
  return MockRadioButton;
});

jest.mock('../database/variaveis', () => ({
  __esModule: true,
  Bnivel_de_atividade: 'Baixo',
  Bgordura: '15',
  Bcalorias: '2000',
  BsetNivelDeAtividade: jest.fn(),
  BsetGordura: jest.fn(),
  BsetCalorias: jest.fn(),
  inserirOuAtualizarUsuario: jest.fn(),
}));

jest.mock('../constants/Colors', () => ({
  __esModule: true,
  default: {
    vermelhoBase: '#FF0000',
    brancoBase: '#FFFFFF',
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

const FormularioFisico = require('../components/Formularios/FormularioFisico').default;

describe('FormularioFisico', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o título da página', () => {
    render(<FormularioFisico />);
    expect(screen.getByText('Físico')).toBeTruthy();
  });

  it('deve renderizar o label de nível de atividade', () => {
    render(<FormularioFisico />);
    expect(screen.getByText('Nivel de Atividade')).toBeTruthy();
  });

  it('deve renderizar o label de gordura', () => {
    render(<FormularioFisico />);
    expect(screen.getByText('% De Gordura')).toBeTruthy();
  });

  it('deve renderizar o label de calorias diárias', () => {
    render(<FormularioFisico />);
    expect(screen.getByText('Calorias Diárias')).toBeTruthy();
  });

  it('deve renderizar o grupo de radio buttons', () => {
    render(<FormularioFisico />);
    expect(screen.getByTestId('radio-button-group')).toBeTruthy();
  });

  it('deve renderizar as opções de nível de atividade', () => {
    render(<FormularioFisico />);
    expect(screen.getByTestId('radio-option-Baixo')).toBeTruthy();
    expect(screen.getByTestId('radio-option-Medio')).toBeTruthy();
    expect(screen.getByTestId('radio-option-Alto')).toBeTruthy();
  });

  it('deve exibir os textos das opções de nível de atividade', () => {
    render(<FormularioFisico />);
    expect(screen.getByText('Baixo')).toBeTruthy();
    expect(screen.getByText('Médio')).toBeTruthy();
    expect(screen.getByText('Alto')).toBeTruthy();
  });

  it('deve renderizar o botão com texto "Próximo"', () => {
    render(<FormularioFisico />);
    expect(screen.getByText('Próximo')).toBeTruthy();
  });

  it('deve renderizar inputs para gordura e calorias', () => {
    render(<FormularioFisico />);
    
    const inputs = screen.getAllByDisplayValue(/^(15|2000|)$/);
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('deve permitir interagir com as opções de nível de atividade', () => {
    render(<FormularioFisico />);
    
    const baixoOption = screen.getByTestId('radio-option-Baixo');
    const medioOption = screen.getByTestId('radio-option-Medio');
    const altoOption = screen.getByTestId('radio-option-Alto');
    
    fireEvent.press(baixoOption);
    fireEvent.press(medioOption);
    fireEvent.press(altoOption);
    
    expect(baixoOption).toBeTruthy();
    expect(medioOption).toBeTruthy();
    expect(altoOption).toBeTruthy();
  });

  it('deve permitir pressionar o botão de submit', () => {
    render(<FormularioFisico />);
    
    const botao = screen.getByTestId('botao-component');
    fireEvent.press(botao);
    
    expect(botao).toBeTruthy();
  });

  it('deve ter a estrutura básica do formulário', () => {
    render(<FormularioFisico />);
    
    expect(screen.getByText('Físico')).toBeTruthy();
    expect(screen.getByText('Nivel de Atividade')).toBeTruthy();
    expect(screen.getByText('% De Gordura')).toBeTruthy();
    expect(screen.getByText('Calorias Diárias')).toBeTruthy();
    expect(screen.getByTestId('radio-button-group')).toBeTruthy();
    expect(screen.getByTestId('botao-component')).toBeTruthy();
  });
});
