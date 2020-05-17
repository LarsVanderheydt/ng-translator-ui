const { join } = require('path');
const { readdirSync, statSync } = require('fs');

const getAllFiles = (dir, extn, files, result, regex, ignore) => {
  files = files || readdirSync(dir);
  result = result || [];
  regex = regex || new RegExp(`\\${extn}$`)

  for (let i = 0; i < files.length; i++) {
    let file = join(dir, files[i]);

    if (statSync(file).isDirectory()) {
      if (ignore) {
        const checkedArr = ignore
          .map(ign => (file.includes(ign)) ? true : false)
          .filter(ign => !!ign)
        if (checkedArr.length > 0) continue;
      }

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

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

module.exports = {
  getAllFiles,
  getDirectories
}