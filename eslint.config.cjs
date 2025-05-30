const js = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Consider removing React: 'readonly' if using React 17+ and the new JSX transform,
        // as reactPlugin.configs.jsx-runtime should handle it.
        // React: 'readonly', 
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules, // For the new JSX transform (React 17+)
      'react/prop-types': 'off', // Turn off prop-types if you are using TypeScript or prefer not to use them
      'react/react-in-jsx-scope': 'off', // Not needed with the new JSX transform
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_תינובת' }], // Ignore unused args starting with _
      'no-console': 'off',
      'no-undef': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'web-build/',
      '.expo/',
      '*.min.js',
      '*.bundle.js',
      'babel.config.js',
      'metro.config.js',
      'eslint.config.cjs',
    ],
  },
];