const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.remote.screen;
const shell = electron.shell;

const fs = require('fs');
const os = require('os');
const path = require('path');
var Ctime = process.hrtime();
var Otime = process.hrtime();
const thumbSize = determineScreenShotSize();
let options = {types: ['screen'], thumbnailSize: thumbSize};
console.log("before get sources");
desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    console.log("after get sources");
 

    sources.forEach(function(source){
        console.log(source.name);
       if(source.name === '8 Ball Pool - A free Sports Game'){
            const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');
            fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function(err){
                if(err) return console.log(err.message);
                console.log('file://' + screenshotPath);
                shell.openExternal('file://' + screenshotPath);
                
            })
        }
    })
})

function determineScreenShotSize(){
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return{
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio,
    };
}