const fs = require('fs');
const file = 'd:/Anti/SmartStock/frontend/src/components/common/Icons.jsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace property definitions that are JSX literals:
// name: (
//     <svg ...> ... </svg>
// )
content = content.replace(/([a-zA-Z0-9_]+):\s*\(\s*(<svg[\s\S]*?<\/svg>)\s*\)/g, (match, name, svgContent) => {
    // Inject {...props} into the svg tag
    const svgWithProps = svgContent.replace(/<svg([^>]+)>/, '<svg$1 {...props}>');
    return `${name}: (props) => (\n        ${svgWithProps}\n    )`;
});

fs.writeFileSync(file, content);
console.log('Icons wrapped as functional components.');
