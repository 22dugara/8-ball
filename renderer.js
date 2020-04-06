const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.remote.screen;
const shell = electron.shell;

const fs = require('fs');
const os = require('os');
const path = require('path');
var number  = 0;

const thumbSize = determineScreenShotSize();
let options = {types: ['screen'], thumbnailSize: thumbSize};
console.log("before get sources");
console.log(process.hrtime());
var Ctime = process.hrtime()[0];
var Otime = process.hrtime()[0];


function getball(){
desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: {width: 500 , height: 500} }).then(async sources => {
    console.log("after get sources");
 

    sources.forEach(function(source){
        console.log(source.name);
       if(source.name === '8 Ball Pool - A free Sports Game'){
           const ScreenpathString = 'screenshot' + number + '.png';
            const screenshotPath = path.join(os.tmpdir(), ScreenpathString);
            fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function(err){
                if(err) return console.log(err.message);
                console.log('file://' + screenshotPath);
                document.getElementById("8-ball").src = 'file://' + screenshotPath;

                
            })
        }
    })

    console.log(process.hrtime());
    number = number + 1;
    setTimeout(getball, 100);
})
}
getball();
function determineScreenShotSize(){
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return{
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio,
    };
}