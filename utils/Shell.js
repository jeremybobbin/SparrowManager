const {spawn} = require('child_process');

module.exports = class Shell {
    constructor(dir = '/') {
        this.dir = dir;
        this.hasError = false;
        this.callbacks = new Map();
    }

    write(command, ...args) {
        this.reset();
        this.command = command;
        this.args = Array.isArray(args) ? args : [args !== undefined ? args : ''];
        this.options = {
            cwd: this.getDir(),
            env: process.env,
        };
        return this;
    }

    setOption(key, value) {
        const options = ['argv0', 'stdio', 'detatched', 'uid', 'gid', 'shell',];
        if(!options.includes(key)) throw new Error(key + ' is not a valid option.');
        this.options[key] = value;
    }

    reset() {
        this.hasError = false;
        this.callbacks.clear();
        return this;
    }

    getParams() {
        return [this.command, this.args, this.options];
    }

    exec() {
        const params = this.getParams();
        if(params.every(p => p === undefined)) throw new Error('No command written.');
        this.process = spawn(...params);
        this.initCallbacks();
        return this;
    }

    initCallbacks() {
        const {process} = this;
        const {stdout, stderr} = process;
        if(process == undefined) throw new Error('No command written.');
        this.callbacks.forEach((callback, name) => {
            switch(name) {
                case 'onData':
                    stdout.on('data', callback);
                    break;
                case 'onExit':
                    process.on('exit', callback);
                    break;
                case 'onError':
                    process.on('error', callback);
                    break;
                case 'onErrorData':
                    stderr.on('error', callback);
                    break;
                default:
                    throw new Error('No corresponding function to:  ' + name);
            }
        });
    }

    onError(callback) {
        this.callbacks.set('onError', callback);
        return this;
    }

    getOutputStream() {
        return this.process.stdout;
    }

    getErrorStream() {
        return this.process.stderr;
    }

    onErrorData(callback) {
        callback = chunk => {
            this.hasError = true;
            return callback(chunk);
        }
        this.callbacks.set('onErrorData', callback);
    }

    onExit(callback) {
        this.callbacks.set('onExit', callback);
    }

    onData(callback) {
        this.callbacks.set('onData', callback);
        return this;
    }

    pause() {
        return this.both('play');
    }

    resume() {
        return this.both('resume');
    }

    kill() {
        this.process.kill('SIGINT');
        return this;
    }

    both(funcName, ...args) {
        let {stdout, stderr} = this.process;
        stderr[funcName](...args);
        stdout[funcName](...args);
        return this;
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
}