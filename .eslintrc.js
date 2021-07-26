module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended", // Make this the last element so prettier config overrides other formatting rules
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"no-extra-semi": "error",
		"prettier/prettier": ["error", {}, { usePrettierrc: true }], // Use our .prettierrc file as source
	},
};
