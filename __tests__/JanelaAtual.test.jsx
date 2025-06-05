import { render } from '@testing-library/react-native';
import JanelaAtual from '../components/JanelaAtual';

describe('Componente JanelaAtual', () => {
  test('deve renderizar corretamente', () => {
    const { root } = render(<JanelaAtual titulo="Teste" />);
    expect(root).toBeTruthy();
  });

  test('deve exibir o título fornecido', () => {
    const titulo = 'Minha Página Teste';
    const { getByText } = render(<JanelaAtual titulo={titulo} />);
    
    expect(getByText(titulo)).toBeTruthy();
  });

  test('deve renderizar com título vazio', () => {
    const { getByText } = render(<JanelaAtual titulo="" />);
    expect(getByText('')).toBeTruthy();
  });

  test('deve renderizar sem prop titulo', () => {
    const { UNSAFE_getByType } = render(<JanelaAtual />);
    const { Text } = require('react-native');
    
    expect(UNSAFE_getByType(Text)).toBeTruthy();
  });

  test('deve ter a estrutura de Views correta', () => {
    const { UNSAFE_getAllByType } = render(<JanelaAtual titulo="Teste" />);
    const { View } = require('react-native');
    const views = UNSAFE_getAllByType(View);
    
    expect(views).toHaveLength(2);
  });

  test('deve ter um componente Text', () => {
    const { UNSAFE_getByType } = render(<JanelaAtual titulo="Teste" />);
    const { Text } = require('react-native');
    
    expect(UNSAFE_getByType(Text)).toBeTruthy();
  });

  test('deve exibir títulos com caracteres especiais', () => {
    const tituloEspecial = 'Título com acentos: ção, ã, é!';
    const { getByText } = render(<JanelaAtual titulo={tituloEspecial} />);
    
    expect(getByText(tituloEspecial)).toBeTruthy();
  });

  test('deve exibir títulos com números', () => {
    const tituloNumerico = 'Página 123 - Item 456';
    const { getByText } = render(<JanelaAtual titulo={tituloNumerico} />);
    
    expect(getByText(tituloNumerico)).toBeTruthy();
  });

  test('deve exibir títulos longos', () => {
    const tituloLongo = 'Este é um título muito longo que deve ser exibido corretamente no componente';
    const { getByText } = render(<JanelaAtual titulo={tituloLongo} />);
    
    expect(getByText(tituloLongo)).toBeTruthy();
  });
});
