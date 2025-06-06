module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|expo-sqlite|@react-native-community|@testing-library/react-native|react-native-reanimated|react-native-vector-icons)/)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.expo/',
  ],
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'src/**/*.{js,jsx}',
    '!src/app/**',
    '!**/*.test.{js,jsx}',
    '!**/node_modules/**',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
};
