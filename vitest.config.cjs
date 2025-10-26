module.exports = {
  test: {

    include: ['src/services/**/*.{spec,test}.{js,ts}'],
    watch: false,
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'lcov', 'cobertura', 'html'],

    
      all: false,
      include: ['src/services/**/*.{js,ts}'],

      
      exclude: [
        '**/*.d.ts',
        'node_modules/**',
        'src/**/*.spec.{js,ts}',
        'src/**/*.test.{js,ts}',
        'src/controller/**',
        'src/controllers/**',
        'src/repositories/**',
        'src/repository/**',
        'src/middleware/**',
        'src/prisma/**',
        'src/env/**',
        'src/lib/**',
        'src/**/__mocks__/**'
      ]
    }
  }
};
