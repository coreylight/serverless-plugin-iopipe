const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const spawn = require('cross-spawn');

const testDirFiles = fs.readdirSync(path.join(__dirname, '../testProjects'));
const folders = _.reject(testDirFiles, s => s.match(/^\./));

folders.forEach(folder => {
  spawn.sync('npm', ['install', '--prefix', `testProjects/${folder}`], {
    stdio: 'inherit'
  });

  fs.copyFileSync(
    'dist/index.js',
    `testProjects/${folder}/.serverless_plugins/serverless-plugin-iopipe/index.js`
  );

  spawn.sync('npm', ['test', '--prefix', `testProjects/${folder}`], {
    stdio: 'inherit'
  });
});
