// Bettet die per JS erzeugten Lexikon-Inhalte als statisches HTML ein (SEO). Das Seiten-JS rendert danach unverändert neu.
// Nutzung: node tools/prerender_lexikon.js   (Playwright nötig; startet lokalen Server selbst)
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'..');
const pages=['3d-druck-lexikon.html','en/3d-print-lexicon.html'];
const ids=['lxProblemCards','lxGuideCards','lxGlossary','lxMatBody','lxSlicerPanels'];
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
const srv=http.createServer((q,r)=>{let p=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');
 fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':mime[path.extname(p)]||'application/octet-stream'});r.end(d)})});
(async()=>{await new Promise(r=>srv.listen(8171,r));const b=await chromium.launch();
for(const f of pages){const pg=await b.newPage();await pg.goto('http://localhost:8171/'+f,{waitUntil:'load'});await pg.waitForTimeout(800);
 let html=fs.readFileSync(path.join(root,f),'utf8');
 for(const id of ids){
  const inner=await pg.evaluate(i=>document.getElementById(i)?.innerHTML??null,id);
  if(inner===null){console.log('fehlt',f,id);continue}
  const open=new RegExp('(<(div|tbody)[^>]*id="'+id+'"[^>]*>)(<!--lx-pre-->[\\s\\S]*?<!--/lx-pre-->)?');
  const m=html.match(open);if(!m){console.log('Container nicht gefunden',id);continue}
  // Bei Wiederholung: alten Block samt zugehörigem Inhalt ersetzen
  html=html.replace(open,(all,tag)=>tag+'<!--lx-pre-->'+inner+'<!--/lx-pre-->');
 }
 fs.writeFileSync(path.join(root,f),html);
 const words=await pg.evaluate(()=>document.body.innerText.split(/\s+/).length);console.log(f,'Wörter sichtbar im gerenderten DOM:',words);await pg.close()}
await b.close();srv.close()})();
