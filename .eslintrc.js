module.exports = {
  extends: 'hackreactor',
  env: {
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-undef": "off",
    "func-names": "off",
    "jsx-a11y": "off",
  }
};