const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'EACCES') console.log('Cannot read: ' + dirFile);
    }
  });
  return filelist;
}

const files = walkSync('d:/Desktop/digikhyber/src').filter(f => f.match(/\.(jsx|js|css)$/));

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace full phrase first
  content = content.replace(/Digikhyber/g, 'Digikhyber');
  content = content.replace(/digikhyber punjab/gi, 'digikhyber');
  
  // Replace domains / concatenated words
  content = content.replace(/digikhyber/gi, 'digikhyber');
  
  // Replace standalone words (which covers CSS classes like .digikhyber-heading)
  content = content.replace(/Digikhyber/g, 'Digikhyber');
  content = content.replace(/digikhyber/gi, 'digikhyber');

  // Replace typo
  content = content.replace(/Digikhyber/gi, 'Digikhyber');
  content = content.replace(/Digikhyber/gi, 'digikhyber');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});

console.log(`Replaced branding in ${count} files.`);
