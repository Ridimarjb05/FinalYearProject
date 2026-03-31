const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all JSX files
const files = glob.sync('src/**/*.{jsx,js}', { cwd: 'd:/Anti/SmartStock/frontend' });

let totalReplaced = 0;

files.forEach(file => {
  const fullPath = path.join('d:/Anti/SmartStock/frontend', file);
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  // Replace <Icon.xyz /> or <Icon.xyz className="..." /> or <Icon.xyz someProps />
  // Self-closing with any props → {Icon.xyz}
  content = content.replace(/<Icon\.(\w+)(\s[^>]*)?\s*\/>/g, (_match, name) => `{Icon.${name}}`);

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    const count = (original.match(/<Icon\.\w+(\s[^>]*)?\s*\/>/g) || []).length;
    console.log(`Fixed ${count} icon(s) in ${file}`);
    totalReplaced += count;
  }
});

console.log(`\nDone. Total icons fixed: ${totalReplaced}`);
