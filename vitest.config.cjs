const path = require('path');
const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    include: ['**/*.spec.js'],
    watch: false,
    coverage: {
      provider: 'v8',
      reportsDirectory: path.resolve(__dirname, 'coverage'),
      reporter: ['text', 'html', 'lcov', 'cobertura'],

      include: [
        'src/services/**/*.service.js'],
      all: true,

      exclude: [
        '**/*.spec.*',
        '**/*.test.*',
        '**/node_modules/**',
        '**/dist/**',
        '**/*.config.*',
        'vitest.config.cjs',
        'eslint.config.cjs',
        'src/index.js',
        'src/controller/**',
        'src/env/**',
        'src/lib/**',
        'src/repositories/prisma/**',
        'src/repositories/in-memory/**',
      ],
    },
  },
});
