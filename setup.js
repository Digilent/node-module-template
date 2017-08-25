var fs = require('fs');
let stdin = process.stdin;
let stdout = process.stdout;

var userInput = {
    organizationName: '',
    moduleName: '',
    exportedModuleName: '',
    description: '',
}

var filesToUpdate = [
    './package.json',
    './tsconfig.json',
    './index.js',
    './index.d.ts',
    './bundleHelper.js',
];

function getUserInput(key, prompt) {
    prompt.get('string', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            userInput[key] = data;
        }
    });
}

function updateFile(file) {
    console.log('Updating', file);
    data = fs.readFileSync(file, 'utf8');

    Object.keys(userInput).forEach((key) => {
        let regex = new RegExp('<' + key + '>', 'g');
        data = data.replace(regex, userInput[key]);
    });

    fs.writeFileSync(file, data, 'utf8');
}

function getUserInput(key, prompt) {
    return new Promise((resolve, reject) => {
        stdin.resume();
        stdout.write(prompt);

        stdin.once('data', function (data) {
            userInput[key] = data.toString().trim();
            resolve(userInput[key]);
        });
    });
}

function updateAllFiles() {
    filesToUpdate.forEach((file) => {
        updateFile(file);
    })
}

function createSrcFiles() {
    fs.mkdirSync('./src');
    let ts = `export class ` + userInput.exportedModuleName + ` {

    constructor() {
        
    }

    }`;

    fs.writeFileSync('./src/' + userInput.moduleName + '.ts', ts, 'utf8');
    fs.writeFileSync('./src/' + userInput.moduleName + '.css', '', 'utf8');

}

getUserInput('organizationName', 'Please enter your company or organization name (all lowercase): ')
    .then((organizationName) => {
        return getUserInput('moduleName', 'Please enter a module name (all lower case, \'-\' instead of space): ')
    })
    .then((moduleName) => {
        return getUserInput('exportedModuleName', 'Please enter the name you would like to export the module as (upper CamelCase): ');
    })
    .then((description) => {
        return getUserInput('description', 'Provide a short description of the module: ');
    })
    .then((exportedModuleName) => {
        console.log('Setting Up Your New Module');
        updateAllFiles();
        createSrcFiles();
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    });





