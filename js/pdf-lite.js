(function(){
  'use strict';
  function norm(s){return String(s??'').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/[–—]/g,'-').replace(/…/g,'...').replace(/•/g,'-').replace(/\u00a0/g,' ').replace(/[^\x00-\xff]/g,'?');}
  function esc(s){return norm(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/\r?\n/g,' ');}
  function bytes(s){const a=new Uint8Array(s.length);for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i)&255;return a;}
  function wrap(text,maxChars){const words=norm(text).split(/\s+/);const lines=[];let line='';for(const w of words){if(!w)continue;const next=line?line+' '+w:w;if(next.length>maxChars&&line){lines.push(line);line=w;}else line=next;}if(line)lines.push(line);return lines;}
  function rgb(hex){hex=hex.replace('#','');return [parseInt(hex.slice(0,2),16)/255,parseInt(hex.slice(2,4),16)/255,parseInt(hex.slice(4,6),16)/255].map(n=>n.toFixed(3)).join(' ')}
  function make(spec){
    const purple=rgb('#2E245A'), accent=rgb('#74559E'), muted=rgb('#6E6875'), line=rgb('#E7E2EA');
    const pageW=595.28,pageH=841.89,margin=52,contentW=pageW-margin*2;
    let pages=[],ops=[],y=pageH-54;
    const footer=()=>{ops.push(`${line} RG 0.7 w ${margin} 42 m ${pageW-margin} 42 l S`);ops.push(`BT /F1 8 Tf ${muted} rg ${margin} 27 Td (${esc(spec.footerLeft||'Diego Castillo - M.P. 2669')}) Tj ET`);ops.push(`BT /F1 8 Tf ${muted} rg ${pageW-margin-170} 27 Td (${esc(spec.footerRight||spec.version||'')}) Tj ET`)};
    const newPage=()=>{if(ops.length){footer();pages.push(ops.join('\n'));}ops=[];y=pageH-54;};
    const ensure=(h)=>{if(y-h<58)newPage()};
    const text=(txt,size=10,bold=false,color=muted,gap=7,max=contentW)=>{const maxChars=Math.max(20,Math.floor(max/(size*0.52)));const ls=wrap(txt,maxChars);const lead=size*1.35;ensure(ls.length*lead+gap);ops.push(`BT /${bold?'F2':'F1'} ${size} Tf ${color} rg ${margin} ${y} Td`);ls.forEach((l,i)=>ops.push(`${i?`0 -${lead} Td `:''}(${esc(l)}) Tj`));ops.push('ET');y-=ls.length*lead+gap;};
    const heading=(txt,size=15)=>{ensure(size*2.2);ops.push(`BT /F2 ${size} Tf ${purple} rg ${margin} ${y} Td (${esc(txt)}) Tj ET`);y-=size*1.6;};
    const smallLabel=(txt)=>{ensure(18);ops.push(`BT /F2 8 Tf ${accent} rg ${margin} ${y} Td (${esc(txt.toUpperCase())}) Tj ET`);y-=16;};
    // first page header
    ops.push(`${purple} rg 0 ${pageH-104} ${pageW} 104 re f`);
    ops.push(`BT /F2 19 Tf 1 1 1 rg ${margin} ${pageH-47} Td (${esc(spec.title)}) Tj ET`);
    if(spec.subtitle)ops.push(`BT /F1 9 Tf 0.925 0.910 0.957 rg ${margin} ${pageH-70} Td (${esc(spec.subtitle)}) Tj ET`);
    y=pageH-130;
    (spec.blocks||[]).forEach(b=>{
      if(b.type==='label') smallLabel(b.text);
      else if(b.type==='heading') heading(b.text,b.size||15);
      else if(b.type==='text') text(b.text,b.size||10,!!b.bold,b.color?rgb(b.color):muted,b.gap??7,b.max||contentW);
      else if(b.type==='space'){y-=b.height||10;}
      else if(b.type==='rule'){ensure(12);ops.push(`${line} RG 0.6 w ${margin} ${y} m ${pageW-margin} ${y} l S`);y-=12;}
      else if(b.type==='kv'){text(`${b.key}: ${b.value}`,b.size||9,!!b.bold,b.color?rgb(b.color):muted,b.gap??3);}
    });
    footer();pages.push(ops.join('\n'));
    const objects=[];const add=o=>(objects.push(o),objects.length);
    const f1=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const f2=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const pageIds=[];const contentIds=[];
    for(const p of pages){const stream=`<< /Length ${bytes(p).length} >>\nstream\n${p}\nendstream`;contentIds.push(add(stream));pageIds.push(add('PENDING'));}
    const pagesId=add('PAGES_PENDING');
    pageIds.forEach((id,i)=>objects[id-1]=`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`);
    objects[pagesId-1]=`<< /Type /Pages /Kids [${pageIds.map(id=>`${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;
    const catalogId=add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
    let pdf='%PDF-1.4\n%âãÏÓ\n',offsets=[0];
    objects.forEach((o,i)=>{offsets.push(bytes(pdf).length);pdf+=`${i+1} 0 obj\n${o}\nendobj\n`;});
    const xref=bytes(pdf).length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;for(let i=1;i<offsets.length;i++)pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
    pdf+=`trailer\n<< /Size ${objects.length+1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new Blob([bytes(pdf)],{type:'application/pdf'});
  }
  function download(blob,filename){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
  function base64(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(',')[1]);r.onerror=reject;r.readAsDataURL(blob);})}
  window.DCPdf={make,download,base64};
})();
