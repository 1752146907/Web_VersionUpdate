const fs = require('fs');
const path = require('path');

// 生成版本数据
const versionData = {
  version: '1.0.0',
  buildTime: new Date().toISOString(),
  hash: Date.now().toString(36) // 简单的hash
};

// 写入文件
const outputPath = path.join(__dirname, 'public/versionData.json');
fs.writeFileSync(outputPath, JSON.stringify(versionData, null, 2));

console.log(`✅ 版本文件已生成: ${outputPath}`);
console.log(`版本号: ${versionData.version}`);