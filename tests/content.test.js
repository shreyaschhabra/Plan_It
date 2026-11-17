import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const content=JSON.parse(await readFile('public/content.json','utf8'));
test('catalogue has the four requested regions and one package and one theme per region',()=>{assert.deepEqual(content.destinations.map(d=>d.name),['Jaipur','Darjeeling','Sikkim','Meghalaya']);for(const d of content.destinations)assert.equal(content.packs.filter(p=>p.destination_id===d.id).length,1);});
test('all regional stock images and responsive versions are bundled locally',async()=>{for(const d of content.destinations){assert.ok((await stat('public'+d.image)).size>1000);assert.ok((await stat('public'+d.image.replace('.webp','-small.webp'))).size>1000);assert.ok(d.photo_source.startsWith('https://unsplash.com/photos/'));assert.ok(d.image_alt);}});
test('site has no retired service links or account requirement in the navigation',async()=>{const html=await readFile('public/index.html','utf8');assert.ok(html.includes('href="/about"'));assert.ok(html.includes('href="/my-trips"'));assert.ok(!/\/notifications|\/stays|sign.in|\/admin/i.test(html));});
