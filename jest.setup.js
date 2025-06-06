import '@testing-library/react-native/extend-expect';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  Link: ({ children }) => children,
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn((callback) => {
      callback({
        executeSql: jest.fn((sql, params, successCallback, errorCallback) => {
          if (successCallback) {
            successCallback({}, { rows: { _array: [] } });
          }
        }),
      });
    }),
  })),
}));

console.warn = jest.fn();
console.error = jest.fn();
