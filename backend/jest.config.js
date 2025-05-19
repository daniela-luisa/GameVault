export default {
  testEnvironment: 'node',
  transform: {}, // sem transformações Babel por enquanto, se não usar Babel
  extensionsToTreatAsEsm: ['.ts'],
  // para indicar que seus arquivos .js são ES Modules
  moduleNameMapper: {
    // se precisar mapear caminhos de importação, coloque aqui
  },
};