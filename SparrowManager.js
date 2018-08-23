const {get} = require('axios');
const {exec} = require('child_process');
const fs = require('fs');
const Shell = new require('./utils/Shell');
const shell = new Shell('/');
const shell1 = new Shell();
require('dotenv').config();


let chunks = '';
shell.write('pidof', 'node')
    .onData(chunk => {
        chunks += ' ' + chunk.toString();
    }).exec();


function startServer() {
    let log = fs.createWriteStream("log.txt");
    shell1.cd(process.env.SERVER_DIR)
        .write('node sparrow')
        .getOutputStream()
        .pipe(log);
}
