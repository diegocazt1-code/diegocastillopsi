const ALLOWED = new Set(['https://diegocastillopsi.com','https://www.diegocastillopsi.com']);
function okOrigin(req){const o=req.headers.origin||'';if(!o)return true;if(ALLOWED.has(o))return true;if(process.env.VERCEL_ENV!=='production'&&/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o))return true;return false}
function emailOk(x){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x)}
function html(x=''){return String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
async function resend(payload){const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.message||d.name||'Resend error');return d}
module.exports={okOrigin,emailOk,html,resend};
