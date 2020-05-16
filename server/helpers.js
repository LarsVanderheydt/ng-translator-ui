const { join } = require('path');
const { readdirSync, statSync } = require('fs');

const getAllFiles = (dir, extn, files, result, regex) => {
  files = files || readdirSync(dir);
  result = result || [];
  regex = regex || new RegExp(`\\${extn}$`)

  for (let i = 0; i < files.length; i++) {
    let file = join(dir, files[i]);

    if (statSync(file).isDirectory()) {
      try {
        result = getAllFiles(file, extn, readdirSync(file), result, regex);
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) result.push(file);
    }
  }
  return result;
}

module.exports = {
  getAllFiles
}