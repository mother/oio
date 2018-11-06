module.exports = {
   moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
   },
   setupFiles: ['<rootDir>/jest.utils.js'],
   setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
   verbose: true
}
