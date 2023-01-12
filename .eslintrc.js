module.exports = {
	env: {
		browser: true,
		amd: true,
		node: true,
		'jest/globals': true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'testing-library', 'jest'],
	rules: {
		'react/prop-types': ['off'],
		'testing-library/await-async-query': 'error',
		'testing-library/no-await-sync-query': 'error',
		'testing-library/no-debugging-utils': 'warn',
		'testing-library/no-dom-import': 'off',
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
	},

	settings: {
		react: {
			version: 'detect',
		},
	},
};
