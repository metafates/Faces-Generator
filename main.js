const fs = require('fs');
const path = require('path');
const fakeNameGenerator = require('fake-names');

const assetsPath = path.join(__dirname, 'assets');
const generatedPath = path.join(__dirname, 'generated');

const assets = fs.readdirSync(assetsPath);

const browsSet = assets.filter((item) => item.startsWith('brows'));
const eyesSet = assets.filter((item) => item.startsWith('eyes'));
const mouthSet = assets.filter((item) => item.startsWith('mouth'));

function clearDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        fs.unlinkSync(path.join(dirPath, file));
    }
}

function randomChoice(array) {
    return array[(Math.random() * array.length) >> 0];
}

function getSvgContents(filePath) {
    const file = fs.readFileSync(filePath, 'utf8');
    const svgContents = file.match(/<path .*?>/g);
    return svgContents.join('\n\t');
}

function selectAndGetContents(array) {
    const fileName = randomChoice(array);
    const contents = getSvgContents(path.join(assetsPath, fileName));
    return contents;
}

function makeImage() {
    const brows = selectAndGetContents(browsSet);
    const eyes = selectAndGetContents(eyesSet);
    const mouth = selectAndGetContents(mouthSet);
    const name = fakeNameGenerator.getName();

    const svgImage = `<!-- ${name} -->
<svg width="225.394" height="225.394" viewBox="0 0 59.635 59.635" xmlns="http://www.w3.org/2000/svg">
    <!-- Brows -->
    ${brows}
    <!-- /Brows -->

    <!-- Eyes -->
    ${eyes}
    <!-- /Eyes -->

    <!-- Mouth -->
    ${mouth}
    <!-- /Mouth -->
</svg>
    `;

    fs.writeFileSync(path.join(generatedPath, `${name}.svg`), svgImage);
}

clearDirectory(generatedPath);
for (let _ = 0; _ <= 20; _++) {
    makeImage();
}
