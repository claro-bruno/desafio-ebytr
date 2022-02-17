const fs = require('fs');

const getFileContent = (path) => (
  fs.readFileSync(path, { encoding: 'utf-8' }).trim()
);

module.exports = getFileContent;
