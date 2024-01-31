/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'tailwindcss'],
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'jsx-a11y/heading-has-content': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: './tailwind.config.ts',
      classRegex: '^(class(Name)?|tw)$',
    },
    next: {
      rootDir: ['./'],
    },
  },
}

module.exports = config
