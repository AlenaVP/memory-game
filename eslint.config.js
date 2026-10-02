import js from '@eslint/js';
import globals from 'globals';

const FORBIDDEN_HTML_API = 'Task  constraint (-100): use document.createElement';

export default [
  { ignores: ['dist'] },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-alert': 'error',

      'no-restricted-syntax': [
        'error',
        {
          selector: 'AssignmentExpression[left.property.name=/^(innerHTML|outerHTML)$/]',
          message: FORBIDDEN_HTML_API,
        },
        {
          selector: 'AssignmentExpression[left.property.value=/^(innerHTML|outerHTML)$/]',
          message: FORBIDDEN_HTML_API,
        },
        {
          selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
          message: FORBIDDEN_HTML_API,
        },
        {
          selector: "MemberExpression[object.name='document'][property.name=/^(write|writeln)$/]",
          message: FORBIDDEN_HTML_API,
        },
        {
          selector: "NewExpression[callee.name='DOMParser']",
          message: FORBIDDEN_HTML_API,
        },
        {
          selector: "CallExpression[callee.property.name='createContextualFragment']",
          message: FORBIDDEN_HTML_API,
        },
      ],

      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
];
