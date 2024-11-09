/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 4,
    plugins: ['prettier-plugin-organize-imports']
};

export default config;