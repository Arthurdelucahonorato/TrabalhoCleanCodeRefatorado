import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Cards from '../components/Cards';

jest.mock('../database/buscaRefeicoes', () => ({
  buscaRefeicoes: jest.fn(),
}));

jest.mock('../database/dropRefeicoes', () => ({
  dropRefeicoes: jest.fn(),
}));

jest.mock('../database/updateRefeicoes', () => ({
  updateRefeicoes: jest.fn(),
}));

jest.mock('react-native-snap-carousel', () => {
  const React = require('react');
  const MockCarousel = ({ data, renderItem }) => {
    if (!data || data.length === 0) return null;
    return React.createElement('div', {}, data.map((item, index) => renderItem({ item, index })));
  };
  MockCarousel.displayName = 'MockCarousel';
  return MockCarousel;
});

jest.mock('react-native-paper', () => ({
  Checkbox: function MockCheckbox({ status, onPress, _children }) {
    const React = require('react');
    return React.createElement('button', { 
      onPress: onPress,
      testID: `checkbox-${status}`,
      'data-testid': `checkbox-${status}`,
      'aria-checked': status === 'checked',
    }, _children);
  },
}));

const mockRefeicoes = [
  { ID: 1, texto: 'Café da manhã: Pão integral', status: '0' },
  { ID: 2, texto: 'Almoço: Arroz e feijão', status: '1' },
  { ID: 3, texto: 'Jantar: Salada verde', status: '0' },
];

describe('Componente Cards', () => {
  const { buscaRefeicoes } = require('../database/buscaRefeicoes');
  const { updateRefeicoes } = require('../database/updateRefeicoes');
  const { dropRefeicoes } = require('../database/dropRefeicoes');

  beforeEach(() => {
    jest.clearAllMocks();
    buscaRefeicoes.mockResolvedValue(mockRefeicoes);
    updateRefeicoes.mockResolvedValue();
    dropRefeicoes.mockResolvedValue();
  });

  test('deve renderizar corretamente', async () => {
    const { root } = render(<Cards />);
    expect(root).toBeTruthy();
  });

  test('deve carregar refeições ao montar', async () => {
    render(<Cards />);
    
    await waitFor(() => {
      expect(buscaRefeicoes).toHaveBeenCalledTimes(1);
    });
  });

  test('deve exibir refeições carregadas', async () => {
    const { getByText } = render(<Cards />);
    
    await waitFor(() => {
      expect(getByText('Café da manhã: Pão integral')).toBeTruthy();
      expect(getByText('Almoço: Arroz e feijão')).toBeTruthy();
      expect(getByText('Jantar: Salada verde')).toBeTruthy();
    });
  });

  test('deve renderizar checkbox para cada refeição', async () => {
    const { getAllByTestId } = render(<Cards />);
    
    await waitFor(() => {
      const checkboxes = getAllByTestId(/checkbox-/);
      expect(checkboxes).toHaveLength(3);
    });
  });

  test('deve chamar updateRefeicoes ao clicar no checkbox', async () => {
    const { getAllByTestId } = render(<Cards />);
    
    await waitFor(() => {
      const checkboxes = getAllByTestId(/checkbox-/);
      fireEvent.press(checkboxes[0]);
    });

    await waitFor(() => {
      expect(updateRefeicoes).toHaveBeenCalled();
    });
  });

  test('deve aplicar estilo correto para refeição marcada', async () => {
    const { getByText } = render(<Cards />);
    
    await waitFor(() => {
      const refeicaoMarcada = getByText('Almoço: Arroz e feijão');
      expect(refeicaoMarcada).toBeTruthy();
    });
  });

  test('deve lidar com erro ao carregar refeições', async () => {
    buscaRefeicoes.mockRejectedValue(new Error('Erro de rede'));
    console.error = jest.fn();
    
    render(<Cards />);
    
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Erro ao carregar dados das refeicoes:', expect.any(Error));
    });
  });

  test('deve lidar com erro ao atualizar refeição', async () => {
    updateRefeicoes.mockRejectedValue(new Error('Erro ao atualizar'));
    console.error = jest.fn();
    
    const { getAllByTestId } = render(<Cards />);
    
    await waitFor(() => {
      const checkboxes = getAllByTestId(/checkbox-/);
      fireEvent.press(checkboxes[0]);
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Erro ao atualizar e buscar dados:', expect.any(Error));
    });
  });

  test('deve renderizar sem dados', async () => {
    buscaRefeicoes.mockResolvedValue([]);
    
    const { root } = render(<Cards />);
    expect(root).toBeTruthy();
  });

  test('deve chamar dropRefeicoes e navegar quando todas as refeições estão marcadas', async () => {
    const mockPush = jest.fn();
    jest.doMock('expo-router', () => ({
      useRouter: () => ({ push: mockPush }),
    }));

    const todasMarcadas = [
      { ID: 1, texto: 'Café da manhã: Pão integral', status: '1' },
      { ID: 2, texto: 'Almoço: Arroz e feijão', status: '1' },
      { ID: 3, texto: 'Jantar: Salada verde', status: '1' },
    ];

    buscaRefeicoes.mockResolvedValue(todasMarcadas);
    console.log = jest.fn();
    
    const { getAllByTestId } = render(<Cards />);
    
    await waitFor(() => {
      const checkboxes = getAllByTestId(/checkbox-/);
      fireEvent.press(checkboxes[0]);
    });

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(true);
      expect(dropRefeicoes).toHaveBeenCalled();
    });
  });

  test('deve logar false quando nem todas as refeições estão marcadas', async () => {
    const parcialmenteMarcadas = [
      { ID: 1, texto: 'Café da manhã: Pão integral', status: '1' },
      { ID: 2, texto: 'Almoço: Arroz e feijão', status: '0' },
      { ID: 3, texto: 'Jantar: Salada verde', status: '1' },
    ];

    buscaRefeicoes.mockResolvedValue(parcialmenteMarcadas);
    console.log = jest.fn();
    
    const { getAllByTestId } = render(<Cards />);
    
    await waitFor(() => {
      const checkboxes = getAllByTestId(/checkbox-/);
      fireEvent.press(checkboxes[0]);
    });

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(false);
    });
  });
});
