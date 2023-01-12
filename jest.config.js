module.exports = {
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'\\.css$': '<rootDir>/emptyModule.js',
		'^@/pages/(.*)$': '<rootDir>/pages/$1',
	},
};
