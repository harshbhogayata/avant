const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/(from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
        const lastAtIndex = p2.lastIndexOf('@');
        if (lastAtIndex > 0) {
           return p1 + p2.substring(0, lastAtIndex) + p3;
        }
        return match;
      });
      content = content.replace(/(import\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
        const lastAtIndex = p2.lastIndexOf('@');
        if (lastAtIndex > 0) {
           return p1 + p2.substring(0, lastAtIndex) + p3;
        }
        return match;
      });

      fs.writeFileSync(fullPath, content);
    }
  }
}
processDir('src');
console.log('Fixed imports!');
