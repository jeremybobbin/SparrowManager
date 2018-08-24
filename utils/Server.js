const {fork} = require('child_process');
const fs = require('fs');


module.exports = class Server {
    constructor(dir) {
        this.dir = dir;
        this.createdAt = new Date().now();
        this.startedAt;
        this.failedAt;
        
    }

    getStatus() {}

    start() {
        this.process = fork(this.dir);
        this.init();
    }

    init() {
        const {process} = this;
        const {stdout, stderr} = process;
        this.startHandler();
        process.on('error', () => this.errorHandler());
        stdout.on('data', chunk => this.dataHandler);
    }

    getId() {
        return this.process.pid;
    }

    startHandler() {
        this.startedAt = this.now();
    }

    errorHandler() {
        this.failedAt = this.now();


    }

    throw() {

    }

    stop() {}


    now() {
        return new Date().now();
    }
}