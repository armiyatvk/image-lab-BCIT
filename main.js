const path = require('path');
const IOhandler = require('./IOhandler');
const readline = require('readline');
const zipFilePath = path.join(__dirname, 'myfile.zip');
const unzippedPath = path.join(__dirname, 'unzipped');
const processedPathGray = path.join(__dirname, 'grayscaled');
const processedPathSepia = path.join(__dirname, 'sepia');
const processedPathDither = path.join(__dirname, 'dithered');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const processImg = async () => {
    try {
        await IOhandler.unzip(zipFilePath, unzippedPath)
        const files = await IOhandler.readDir(unzippedPath);
        
        rl.question(`Choose your filter between these option: grayscale , sepia , dithering `, async (input) => {
            const chosenFilter = input.toLowerCase();
            let newOutputPath;
            let theChosenFunction;
            if (chosenFilter === 'grayscale' || chosenFilter === 'sepia' || chosenFilter === 'dithering') {
                for (let file of files) {
                    if (chosenFilter === 'grayscale') {
                        newOutputPath = path.join(processedPathGray, path.basename(file));
                        theChosenFunction = IOhandler.grayScale(file, newOutputPath);
                    } else if (chosenFilter === 'sepia') {
                        newOutputPath = path.join(processedPathSepia, path.basename(file));
                        theChosenFunction = IOhandler.sepia(file, newOutputPath);
                    } else if (chosenFilter === 'dithering') {
                        newOutputPath = path.join(processedPathDither, path.basename(file));
                        theChosenFunction = IOhandler.dithering(file, newOutputPath);
                    }
                    rl.close();
                }
            } else {
                console.log('You entered wrong input. Try again!');
                rl.close();
            }
        });
    } catch (error) {
        console.error(error);
        rl.close();
    }

}

processImg();