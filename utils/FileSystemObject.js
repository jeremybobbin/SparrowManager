module.exports = class FileSystemObject {
    // parentRef is the parent reference callback function.
    constructor(name, parentRef) {
        if(name === undefined || parentRef === undefined) throw new Error('File must have name.');
        if(typeof parentRef !== 'function') throw new Error('Parent reference must be a function.')
        this.name = name;
        this.parentRef = parentRef;
    }

    getParent() {
        return this.parentRef();
    }

    getName() {
        return this.name;
    }

    getPath() {
        const path = [this.name];
        let parent = this.parent;
        do {
            path.unshift(parent.getName);

        } while(parent.hasParent());
        
        return path;
    }
}