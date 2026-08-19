const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (content.includes('/images/')) {
                content = content.replaceAll('/images/', 'images/');
                modified = true;
            }

            if (modified) {
                console.log('Cleaned /images/ in:', fullPath);
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
    walk(outDir);
    console.log('Post-export cleanup complete!');
}
