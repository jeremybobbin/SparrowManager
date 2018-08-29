const cp = require('child_process');

const {fork} = require('child_process');
const fs = require('fs');


module.exports = class Server {
    constructor(dir) {
        this.dir = dir;
        this.createdAt = this.now();
        this.startedAt;
        this.failedAt;
        this.init();
    }

    check() {
        this.process.send('yo');
    }

    init() {
        this.process = fork(this.dir);
        this.process.on('uncaughtException', () => this.errorHandler());
        this.process.on('close', () => this.errorHandler());

        this.interval = setTimeout(() => this.check(), 5000);
        this.startedAt = this.now()
    }

    getId() {
        return this.process.pid;
    }

    errorHandler() {
        console.log('Sparrow has exerienced an Error.');
        this.failedAt = this.now();
        this.resetTimer = setTimeout(() => this.init(), 5000);
    }

    writeTo(dir) {
        this.log = fs.createWriteStream(dir);
        setTimeout(() => this.process.on('data', chunk => this.log.write(chunk)), 500);
    }

    throw() {

    }

    stop() {}


    now() {
        return Date.now();
    }
}