const {get} = require('axios');
const {exec} = require('child_process');
const Shell = new require('./utils/Shell');
const shell = new Shell('/');
require('dotenv').config();


let chunks = '';
shell.write('pidof', 'node')
    .onData(chunk => {
        chunks += ' ' + chunk.toString();
    }).exec();

function startServer() {
    console.log('RESTARTING');
}
