import js from '@eslint/js';
import globals from 'globals';

const forbid = (selector, message) => ({ selector, message: `${message} (-100 by task rules)` });

const MSG = {
  html: 'Assigning innerHTML/outerHTML is forbidden. Use document.createElement and textContent instead',
  adjacent:
    'insertAdjacentHTML is forbidden. Create elements with document.createElement and insert them with append() or prepend()',
  write: 'document.write/writeln is forbidden. Create elements and append them to the DOM instead',
  parse: 'Parsing HTML strings is forbidden. Build elements with document.createElement instead',
  dialogs: 'alert/confirm/prompt are forbidden. Show messages in the UI, e.g. in a modal',
};

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
        forbid('AssignmentExpression[left.property.name=/^(innerHTML|outerHTML)$/]', MSG.html),
        forbid('AssignmentExpression[left.property.value=/^(innerHTML|outerHTML)$/]', MSG.html),
        forbid("CallExpression[callee.property.name='insertAdjacentHTML']", MSG.adjacent),
        forbid("MemberExpression[object.name='document'][property.name=/^(write|writeln)$/]", MSG.write),
        forbid("NewExpression[callee.name='DOMParser']", MSG.parse),
        forbid("CallExpression[callee.property.name='createContextualFragment']", MSG.parse),
      ],

      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
];
