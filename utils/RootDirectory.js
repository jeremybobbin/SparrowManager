const FileSystemObject = require('./FileSystemObject');

module.exports = class FileSystem extends FileSystemObject{
    constructor(children) {
        this.children = children;
    }

    getChildren() {
        return this.children;
    }

    getChildByName(name) {
        return this.children.find(child => child.getName() === name);
    }
}