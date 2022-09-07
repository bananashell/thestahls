module.exports = {
	printWidth: 100,
	parser: "typescript",
	jsxBracketSameLine: false,
	useTabs: true,
	semi: true,
	tabWidth: 4,
	singleQuote: false,
	bracketSpacing: true,
	arrowParens: "always",
	trailingComma: "all",
	overrides: [
		{
			files: "*.scss",
			options: {
				parser: "scss",
				useTabs: true,
				tabWidth: 4,
			},
		},
		{
			files: "*.json",
			options: {
				parser: "json",
			},
		},
	],
};
