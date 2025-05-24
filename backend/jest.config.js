// export default {
//   testEnvironment: 'node',
//   transform: {}, // sem transformações Babel por enquanto, se não usar Babel
//   extensionsToTreatAsEsm: ['.ts'],
//   // para indicar que seus arquivos .js são ES Modules
//   moduleNameMapper: {
//     // se precisar mapear caminhos de importação, coloque aqui
//   },
// };

export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.ts'], // Se também tiver arquivos .ts

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",  // Inclui todos os arquivos JS e TS da pasta src
    "!src/**/index.{js,ts}",  // (opcional) exclui index.js/ts se não quiser medir
    "!src/**/__tests__/**",   // (opcional) exclui pastas de testes
  ],

  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};

