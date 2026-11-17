import {readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
async function check(folder){for(const entry of await readdir(folder,{withFileTypes:true})){const path=folder+'/'+entry.name;if(entry.isDirectory())await check(path);else if(path.endsWith('.js'))execFileSync(process.execPath,['--check',path],{stdio:'inherit'});}}
for(const folder of ['public','server','scripts','tests'])await check(folder);
console.log('JavaScript syntax checks passed.');
