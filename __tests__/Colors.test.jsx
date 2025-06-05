import Colors from '../constants/Colors';

describe('Constants - Colors', () => {
  test('deve exportar todas as cores definidas', () => {
    expect(Colors).toBeDefined();
    expect(typeof Colors).toBe('object');
  });

  test('deve ter todas as cores obrigatórias definidas', () => {
    const coresObrigatorias = [
      'pretoBase',
      'pretoFraco',
      'cinzaBase',
      'vermelhoBase',
      'brancoBase',
      'verdeBase',
      'grdienteInicio',
      'gradienteFim',
      'input',
    ];

    coresObrigatorias.forEach(cor => {
      expect(Colors[cor]).toBeDefined();
      expect(typeof Colors[cor]).toBe('string');
    });
  });

  test('deve ter valores de cores válidos em formato hexadecimal', () => {
    const regexHex = /^#[0-9A-Fa-f]{6}$/;

    Object.values(Colors).forEach(cor => {
      expect(cor).toMatch(regexHex);
    });
  });

  test('deve ter cores específicas com valores corretos', () => {
    expect(Colors.pretoBase).toBe('#323232');
    expect(Colors.pretoFraco).toBe('#404040');
    expect(Colors.cinzaBase).toBe('#909090');
    expect(Colors.vermelhoBase).toBe('#ff8383');
    expect(Colors.brancoBase).toBe('#f1f1f1');
    expect(Colors.verdeBase).toBe('#8bff9e');
    expect(Colors.grdienteInicio).toBe('#1c1c1c');
    expect(Colors.gradienteFim).toBe('#282828');
    expect(Colors.input).toBe('#f5f5f5');
  });

  test('deve ter exatamente 9 cores definidas', () => {
    const numeroEsperadoDeCores = 9;
    expect(Object.keys(Colors)).toHaveLength(numeroEsperadoDeCores);
  });

  test('não deve ter propriedades undefined ou null', () => {
    Object.values(Colors).forEach(cor => {
      expect(cor).not.toBeUndefined();
      expect(cor).not.toBeNull();
      expect(cor).not.toBe('');
    });
  });
});
