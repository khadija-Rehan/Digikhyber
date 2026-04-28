const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) { 
            results.push(fullPath);
        }
    });
    return results;
}

const files = walkDir('d:/Desktop/hunarmand-punjab/src');
let found = false;
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('export default')) {
        if (!content.includes('return ') && !content.includes('return(') && !content.includes('return<') && !content.includes('return (')) {
           // check for implicit return
           if (content.match(/=>\s*\(/)) {
               // implicit return component
               return;
           }
           console.log("POSSIBLE MISSING RETURN IN: " + file);
           found = true;
        }
    }
});
if (!found) {
    console.log("No missing returns found via basic regex.");
}
