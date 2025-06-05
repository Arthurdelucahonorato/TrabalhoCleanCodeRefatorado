import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../components/Header';

jest.mock('../database/variaveis', () => ({
  Bnome: 'Usuario Teste',
}));

jest.mock('../assets/images/icone-canto-direito.png', () => 'mocked-image');

describe('Componente Header', () => {
  test('deve renderizar corretamente', () => {
    const { root } = render(<Header ativo={false} />);
    expect(root).toBeTruthy();
  });

  test('deve renderizar a imagem do logo', () => {
    const { UNSAFE_getByType } = render(<Header ativo={false} />);
    const { Image } = require('react-native');
    const logo = UNSAFE_getByType(Image);
    
    expect(logo).toBeTruthy();
  });

  test('deve exibir o texto do nome quando ativo é true', () => {
    const { getByText } = render(<Header ativo={true} />);
    expect(getByText('Usuario Teste')).toBeTruthy();
  });

  test('não deve exibir o texto do nome quando ativo é false', () => {
    const { queryByText } = render(<Header ativo={false} />);
    expect(queryByText('Usuario Teste')).toBeNull();
  });

  test('deve renderizar com prop ativo como true', () => {
    const { getByText, UNSAFE_getByType } = render(<Header ativo={true} />);
    const { Image } = require('react-native');
    
    expect(UNSAFE_getByType(Image)).toBeTruthy();
    expect(getByText('Usuario Teste')).toBeTruthy();
  });

  test('deve renderizar com prop ativo como false', () => {
    const { queryByText, UNSAFE_getByType } = render(<Header ativo={false} />);
    const { Image } = require('react-native');
    
    expect(UNSAFE_getByType(Image)).toBeTruthy();
    expect(queryByText('Usuario Teste')).toBeNull();
  });

  test('deve renderizar sem props (ativo undefined)', () => {
    const { queryByText, UNSAFE_getByType } = render(<Header />);
    const { Image } = require('react-native');
    
    expect(UNSAFE_getByType(Image)).toBeTruthy();
    expect(queryByText('Usuario Teste')).toBeNull();
  });

  test('deve ter estrutura correta com ativo true', () => {
    const { getByText, UNSAFE_getByType } = render(<Header ativo={true} />);
    const { View, Image, Text } = require('react-native');
    
    expect(UNSAFE_getByType(View)).toBeTruthy();
    expect(UNSAFE_getByType(Image)).toBeTruthy();
    expect(UNSAFE_getByType(Text)).toBeTruthy();
    expect(getByText('Usuario Teste')).toBeTruthy();
  });
});
