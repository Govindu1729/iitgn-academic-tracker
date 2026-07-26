const fs = require('fs');
const path = require('path');

// Folders/files to ignore
const IGNORE = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.vscode',
  '.idea',
  '__pycache__',
  '*.log',
  'package-lock.json', // optional
  'yarn.lock',
  'repo_dump.md', // avoid self-inclusion
  '.env', // keep secrets out!
  '.env.local',
];

// File extensions to include
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.html', '.md', '.sh', '.py', '.java', '.go', '.rs'];

function shouldInclude(filePath) {
  const base = path.basename(filePath);
  // ignore hidden files except .env? but we ignore .env anyway
  if (base.startsWith('.') && base !== '.env') return false;
  for (const pattern of IGNORE) {
    if (filePath.includes(pattern)) return false;
  }
  return true;
}

function getFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (!shouldInclude(fullPath)) continue;
    if (entry.isDirectory()) {
      getFiles(fullPath, fileList);
    } else {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function generateTree(dir, prefix = '') {
  // simple tree without content
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let tree = '';
  entries.forEach((entry, index) => {
    const fullPath = path.join(dir, entry.name);
    if (!shouldInclude(fullPath)) return;
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    tree += prefix + connector + entry.name + '\n';
    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      tree += generateTree(fullPath, newPrefix);
    }
  });
  return tree;
}

function main() {
  const root = process.cwd();
  console.log('Generating repo dump...');

  // Generate tree
  let output = '# Repository Structure\n\n```\n';
  output += path.basename(root) + '\n';
  output += generateTree(root);
  output += '```\n\n';

  // Generate file contents
  const files = getFiles(root);
  output += '# File Contents\n\n';
  for (const file of files) {
    const relative = path.relative(root, file);
    try {
      const content = fs.readFileSync(file, 'utf8');
      output += `## ${relative}\n\n\`\`\`${path.extname(file).slice(1)}\n${content}\n\`\`\`\n\n`;
    } catch (err) {
      output += `## ${relative}\n\n*Error reading file*\n\n`;
    }
  }

  fs.writeFileSync('repo_dump.md', output, 'utf8');
  console.log('✅ repo_dump.md created successfully!');
}

main();