const FileSystemObject = require('./FileSystemObject');

module.exports = class File extends FileSystemObject {
    constructor(name, parentRef) {
        super(name);
        this.parentRef = parentRef;
    }

    getParent() {
        return this.parentRef;
    }
}