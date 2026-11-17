import {readFile,cp,mkdir,rm,writeFile} from 'node:fs/promises';
import {renderPage} from '../server/render.js';
const content=JSON.parse(await readFile('public/content.json','utf8'));
if(content.destinations.some(d=>content.packs.filter(p=>p.destination_id===d.id).length!==1)||new Set(content.packs.map(p=>p.slug)).size!==content.packs.length)throw new Error('Each destination needs one package, with a unique slug.');
for(const p of content.packs)if(!/^[a-z0-9-]+$/.test(p.slug)||!content.destinations.some(d=>d.id===p.destination_id)||!p.days.length||p.price_paise!==null&&(!Number.isSafeInteger(p.price_paise)||p.price_paise<0))throw new Error('Invalid package content.');
for(const t of content.testimonials)for(const key of ['src','poster','captions'])if(t[key]&&!/^(?:\/(?!\/)|https:\/\/)/.test(t[key]))throw new Error('Media must use local paths or HTTPS.');
await rm('dist',{recursive:true,force:true});await cp('public','dist',{recursive:true});
const routes=['/','/packs','/rides','/about','/my-trips','/trips/new','/legal/terms','/privacy','/cancellation',...content.packs.map(p=>'/packs/'+p.slug)];
for(const route of routes){const file=route==='/'?'dist/index.html':'dist'+route+'.html';await mkdir(file.slice(0,file.lastIndexOf('/')),{recursive:true});await writeFile(file,await renderPage(route));}
await writeFile('dist/404.html',await renderPage('/404'));
const origin=process.env.SITE_URL||content.site_url;await writeFile('dist/sitemap.xml',`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(r=>!r.startsWith('/my-trips')&&!r.startsWith('/trips')).map(r=>`<url><loc>${origin+r}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${routes.length} static pages. No runtime keys or external services are required.`);
