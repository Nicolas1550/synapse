const ts = require('typescript');
const fs = require('fs'); const path = require('path');
function walk(folder){return fs.readdirSync(folder,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(path.join(folder,item.name)):[path.join(folder,item.name)]).filter(p=>/\.(ts|tsx)$/.test(p));}
let errors=[];const files=walk('src');
for(const name of files){const f=ts.createSourceFile(name,fs.readFileSync(name,'utf8'),ts.ScriptTarget.Latest,true,name.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);for(const error of f.parseDiagnostics){errors.push(`${name}:${f.getLineAndCharacterOfPosition(error.start||0).line+1}: ${ts.flattenDiagnosticMessageText(error.messageText,' ')}`)}}
console.log(`${files.length} TS/TSX source files parsed; ${errors.length} syntax errors`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
