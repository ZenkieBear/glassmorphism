const path = require('path');

const testEslint = (filenames) =>
    `eslint --ignore-path .gitignore ${filenames
        .map((name) => path.relative(process.cwd(), name))
        .join(' ')}`;

module.exports = {
    '*.{js,ts,vue}': ['eslint --ignore-path .gitignore', 'prettier --write'],
};
