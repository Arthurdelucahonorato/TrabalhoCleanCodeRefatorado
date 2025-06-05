import { renderHook } from '@testing-library/react-native';
import useLoadFonts from '../hooks/useLoadFonts';

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
}));

jest.mock('expo-font', () => ({
  useFonts: jest.fn(),
}));

jest.mock('../assets/fonts/Kodchasan-Regular.ttf', () => 'mocked-font');
jest.mock('../assets/fonts/Kodchasan-SemiBold.ttf', () => 'mocked-font');
jest.mock('../assets/fonts/Kodchasan-Medium.ttf', () => 'mocked-font');
jest.mock('../assets/fonts/Kodchasan-Bold.ttf', () => 'mocked-font');

describe('Hook useLoadFonts', () => {
  const { useFonts } = require('expo-font');
  const SplashScreen = require('expo-splash-screen');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar fontsLoaded e onLayoutRootView', () => {
    useFonts.mockReturnValue([true]);
    
    const { result } = renderHook(() => useLoadFonts());
    
    expect(result.current.fontsLoaded).toBe(true);
    expect(typeof result.current.onLayoutRootView).toBe('function');
  });

  test('deve carregar as fontes corretas', () => {
    useFonts.mockReturnValue([false]);
    
    renderHook(() => useLoadFonts());
    
    expect(useFonts).toHaveBeenCalledWith({
      KodChasanRegular: 'mocked-font',
      KodChasanSemiBold: 'mocked-font',
      KodChasanMedium: 'mocked-font',
      KodChasanBold: 'mocked-font',
    });
  });

  test('deve esconder splash screen quando fontes estão carregadas', async () => {
    useFonts.mockReturnValue([true]);
    SplashScreen.hideAsync.mockResolvedValue();
    
    const { result } = renderHook(() => useLoadFonts());
    
    await result.current.onLayoutRootView();
    
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
  });

  test('não deve esconder splash screen quando fontes não estão carregadas', async () => {
    useFonts.mockReturnValue([false]);
    
    const { result } = renderHook(() => useLoadFonts());
    
    await result.current.onLayoutRootView();
    
    expect(SplashScreen.hideAsync).not.toHaveBeenCalled();
  });

  test('deve retornar false quando fontes não estão carregadas', () => {
    useFonts.mockReturnValue([false]);
    
    const { result } = renderHook(() => useLoadFonts());
    
    expect(result.current.fontsLoaded).toBe(false);
  });

  test('deve manter referência estável do onLayoutRootView', () => {
    useFonts.mockReturnValue([true]);
    
    const { result, rerender } = renderHook(() => useLoadFonts());
    const firstCallback = result.current.onLayoutRootView;
    
    rerender();
    const secondCallback = result.current.onLayoutRootView;
    
    expect(firstCallback).toBe(secondCallback);
  });

  test('deve lidar com erro no SplashScreen.hideAsync', async () => {
    useFonts.mockReturnValue([true]);
    SplashScreen.hideAsync.mockRejectedValue(new Error('Erro splash'));
    
    const { result } = renderHook(() => useLoadFonts());
    
    await expect(result.current.onLayoutRootView()).rejects.toThrow('Erro splash');
  });
});
