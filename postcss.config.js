module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss')('./tailwind.config.js'),
        require('postcss-url'),
        require("postcss-preset-env"),
        require('postcss-flexbugs-fixes'),
        require("autoprefixer"),
        require("cssnano")
    ]
};