const FileSystemObject = require('./FileSystemObject');

module.exports = class Directory extends FileSystemObject {
    constructor(name, parentRef, children = []) {
        super(name, parentRef);
        this.children = children;
    }

    referenceCallback() {
        return this;
    }
}