module.exports = {
    verbose: true,
    setupFiles: ['./jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/config/jest/assetsTransformer.js',
    },
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    testRegex: '__tests__/.*\.test\.js$',
};