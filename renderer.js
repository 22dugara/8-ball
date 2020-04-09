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
var Ctime = process.hrtime()[0];
var Otime = process.hrtime()[0];


function getball(){
desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: {width: 1000 , height: 1000} }).then(async sources => {
    console.log("after get sources");
 

    sources.forEach(function(source){
        // console.log(source.name);
       if(source.name === 'Messenger - Google Chrome'){
           const ScreenpathString = 'screenshot' + number + '.png';
            const screenshotPath = path.join(os.tmpdir(), ScreenpathString);
            fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function(err){
                if(err) return console.log(err.message);        
            })
            var p = document.getElementById("location");
            p.innerHTML = 'file://' + screenshotPath;     
        }
    })

    console.log(process.hrtime());
    number = number + 1;

    
})
}

window.setInterval(getball, 5000);

function determineScreenShotSize(){
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return{
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio,
    };
}