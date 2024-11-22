module.exports = {
    root: true, // Define este como o arquivo raiz para ESLint
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential", // Habilita as regras básicas do Vue 3
        "eslint:recommended", // Regras recomendadas do ESLint
    ],
    parserOptions: {
        ecmaVersion: 2020, // ES2020
        sourceType: "module", // Usa módulos ECMAScript
        parser: "@babel/eslint-parser", // Babel como parser
        requireConfigFile: false, // Não requer um arquivo Babel separado
    },
    rules: {
        // Adicione suas regras personalizadas aqui
    },
};  