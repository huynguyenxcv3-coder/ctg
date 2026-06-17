import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replaceRules = [
  { search: /Đội ngũ kỹ sư Cường Thông Gió/g, replace: 'Đội ngũ kỹ sư của chúng tôi' },
  { search: /đội ngũ kỹ sư Cường Thông Gió/g, replace: 'đội ngũ kỹ sư của chúng tôi' },
  { search: /Đội ngũ kỹ sư của Cường Thông Gió/g, replace: 'Đội ngũ kỹ sư của chúng tôi' },
  { search: /đội ngũ kỹ sư của Cường Thông Gió/g, replace: 'đội ngũ kỹ sư của chúng tôi' },
  { search: /Đội ngũ kỹ thuật Cường Thông Gió/g, replace: 'Đội ngũ kỹ thuật của chúng tôi' },
  { search: /đội ngũ kỹ thuật Cường Thông Gió/g, replace: 'đội ngũ kỹ thuật của chúng tôi' },
  { search: /Đội ngũ của Cường Thông Gió/g, replace: 'Đội ngũ của chúng tôi' },
  { search: /đội ngũ của Cường Thông Gió/g, replace: 'đội ngũ của chúng tôi' },
  { search: /đội ngũ kỹ sư M&E của Cường Thông Gió/gi, replace: 'đội ngũ kỹ sư M&E của chúng tôi' },
  { search: /Đội ngũ kỹ sư Cường thông gió/gi, replace: 'Đội ngũ kỹ sư của chúng tôi' }
];

function processFiles(dir) {
  walk(dir, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.xml') || filePath.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      replaceRules.forEach(rule => {
        content = content.replace(rule.search, rule.replace);
      });

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
      }
    }
  });
}

processFiles('./src');
processFiles('./public');
console.log('Done replacement!');
