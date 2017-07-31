const osx   = process.platform === 'darwin';
const win   = process.platform === 'win32';
const other = !osx && !win;
const fs    = require('fs');
const { exec } = require('child_process');

function getPath() {
  let chromePath = null;

  if (other) {
    try {
      chromePath = require('which').sync('google-chrome');
    } catch (e) {}

  } else if (osx) {

    const regPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    const altPath = require('userhome')(regPath.slice(1));

    chromePath = fs.existsSync(regPath) ? regPath : altPath;

  } else {

    const suffix = '\\Google\\Chrome\\Application\\chrome.exe';
    const prefixes = [
      process.env.LOCALAPPDATA,
      process.env.PROGRAMFILES,
      process.env['PROGRAMFILES(X86)']
    ];

    for (var i = 0; i < prefixes.length; i++) {
      let exe = prefixes[i] + suffix;
      if (fs.existsSync(exe)) {
        chromePath = exe;
        break;
      }
    }
  }

  return chromePath;
}

function parseArguments() {
  let output = [];

  const isKey = process.env.keyfilepath || process.env.key
  if (isKey) {
    // location of chrome extension key (needed to create extensions)
    output['key-path'] = isKey;
  } else {

    // first time?

  }
  return output;
}

function createExtension(chromePath, arguments) {

  const cliscript = `'${chromePath}' --pack-extension=${__dirname} --pack-extension-key=${arguments['key-path']}`

  exec(cliscript, (err, stdout, stderr) => {

    if (err) {
      console.log(err, stderr);
    } else {
      console.log(stdout);
    }

  });



}


const path = getPath();
const inputArgs = parseArguments();

console.log('\n', path, inputArgs);

createExtension(path, inputArgs);
