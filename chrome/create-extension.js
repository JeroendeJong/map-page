const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const homedir = require('os-homedir')();

const is_osx = process.platform === 'darwin';
const is_win = process.platform === 'win32';

function getChromePath() {
    let chromePath = null;

    if (is_osx) {

        const regPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        const altPath = homedir + regPath.slice(1);

        chromePath = fs.existsSync(regPath) ? regPath : altPath;

    } else if (is_win) {

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

    } else {
        try {
            chromePath = require('which').sync('google-chrome');
        } catch (e) {}

    }

    return chromePath;
}

function parseInput() {
    let output = [];
    const isKey = process.env.key || process.env.KEY;
    const isExtension_manifest = process.env.manifest_path;

    if (isKey) {
        output['key'] = isKey;
    }

    if (isExtension_manifest) {
        output['location'] = path.resolve(isExtension_manifest) || __dirname;
    }

    return output;
}

function createExtension(chromePath, opt_args) {
    let cliscript = `'${ chromePath }' --pack-extension=${ opt_args['location'] }`;
    exec(cliscript, (err, stdout, stderr) => {

        if (!err) {
            console.log('Chrome extension created!');
        } else {
            console.log(err, '\n\n\n');
            console.log(stdout, '\n\n\n');
            console.log(stderr, '\n\n\n');
        }
    });
}

const chromePath = getChromePath();
const inputArgs = parseInput();
createExtension(chromePath, inputArgs);