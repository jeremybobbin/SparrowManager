const fs = require('fs');
fs.writeFile("/JerGuyFileTest", "Message from Sparrow MAN!", (err) => {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 