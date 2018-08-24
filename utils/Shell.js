const {spawn} = require('child_process');
const Process = require('./Process');

module.exports = class Shell {
    constructor(dir = '/') {
        this.dir = dir;
        this.processes = new Map();
    }

    getProcesses() {
        return this.processes;
    }

    createProcess() {
        let proc = new Process(this.dir, () => this);
        this.processes.push(proc);
        return proc;
    }

    destroyProcess(pId) {
        this.processes = this.processes.filter(p => p.pId !== pId);
    }

    getDir() {
        if(!Boolean(this.dir)) return '/';
        return this.dir;
    }

    up() {
        if(this.getDir() === '/') throw new Error('There is no parent directory');
        
    }

    down(dirName) {
        return this.exec('ls')
    }

    cd(string) {
        string = string.trim();
        if(string === '../' || string === '..') this.up();
        return this;
    }

    execute(command, cb) {
        const proc = spawn(command);
        proc.stdout.on('data');
    }

}