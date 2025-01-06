import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default {
  languageOptions: {
    globals: globals.browser,
  },
  ...pluginJs.configs.recommended,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "airbnb-base",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-nonoctal-decimal-escape": false,
		"brace-style": [
			"error",
			"1tbs",
			{
				"allowSingleLine": true
			}
		],
		"eol-last": "error",
		"eqeqeq": "error",
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"key-spacing": [
			"error",
			{
				"beforeColon": false,
				"afterColon": true
			}
		],
		"keyword-spacing": "error",
		"linebreak-style": [
			"error",
			"unix"
		],
		"no-alert": "error",
		"no-console": [
			"error",
			{
				"allow": [
					"info"
				]
			}
		],
		"no-trailing-spaces": "error",
		"arrow-parens": [
			"error",
			"as-needed"
		],
		"semi": [
			"error",
			"always"
		],
		"space-before-blocks": "error",
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		],
		"quotes": [
			"error",
			"single"
		],
		"consistent-return": [
			"error",
			{
				"treatUndefinedAsUnspecified": false
			}
		]
  },
};
