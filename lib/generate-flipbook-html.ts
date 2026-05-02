'use client'

export async function generateFlipbookHTML(
  pdfUrl: string,
  title: string,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

  const pdf = await pdfjsLib.getDocument(pdfUrl).promise
  const numPages = pdf.numPages
  const images: string[] = []

  // 첫 페이지로 실제 비율 계산
  const firstPage = await pdf.getPage(1)
  const baseViewport = firstPage.getViewport({ scale: 1 })
  const pageRatio = baseViewport.width / baseViewport.height

  const scale = 1.5
  for (let i = 1; i <= numPages; i++) {
    onProgress?.(i, numPages)
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const ctx = canvas.getContext('2d')!
    await page.render({ canvasContext: ctx, viewport }).promise
    images.push(canvas.toDataURL('image/jpeg', 0.85))
  }

  // page-flip JS 인라인 임베드 시도 (오프라인 지원)
  let pageFlipScript = ''
  try {
    const res = await fetch('https://unpkg.com/page-flip@2.0.7/dist/js/page-flip.browser.js')
    if (res.ok) pageFlipScript = await res.text()
  } catch {
    // CDN 실패 시 script 태그 폴백
  }

  const safeTitle = escapeHtml(title.replace(/\.pdf$/i, ''))

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#1c1c1c;display:flex;flex-direction:column;height:100vh;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden}
    #top{flex-shrink:0;background:#111;border-bottom:1px solid #2a2a2a;padding:10px 20px;display:flex;align-items:center;justify-content:space-between}
    #top h1{color:#fff;font-size:13px;font-weight:700;letter-spacing:-0.02em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:60%}
    #top .meta{color:#555;font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap}
    #stage{flex:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:24px}
    #book-container{position:relative}
    .page{background:#fff;overflow:hidden}
    .page img{width:100%;height:100%;object-fit:contain;display:block}
    #bottom{flex-shrink:0;background:#111;border-top:1px solid #2a2a2a;padding:10px 20px;display:flex;align-items:center;justify-content:center;gap:12px}
    .btn{background:transparent;border:1px solid #3a3a3a;color:#aaa;font-size:11px;font-weight:700;padding:6px 16px;cursor:pointer;transition:all 0.15s;letter-spacing:0.05em}
    .btn:hover:not(:disabled){border-color:#fff;color:#fff;background:#222}
    .btn:disabled{opacity:0.25;cursor:not-allowed}
    #pinfo{color:#555;font-size:11px;font-weight:700;min-width:72px;text-align:center;letter-spacing:0.05em}
    #btn-prev-a,#btn-next-a{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:rgba(0,0,0,0.5);border:1px solid #333;color:#888;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;font-size:16px}
    #btn-prev-a{left:8px}#btn-next-a{right:8px}
    #btn-prev-a:hover,#btn-next-a:hover{background:rgba(255,255,255,0.1);color:#fff;border-color:#666}
    #btn-prev-a:disabled,#btn-next-a:disabled{opacity:0.2;cursor:not-allowed}
    #badge{position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.6);color:#555;font-size:9px;font-weight:700;letter-spacing:0.1em;padding:3px 6px;text-transform:uppercase}
  </style>
</head>
<body>
  <div id="top">
    <h1>${safeTitle}</h1>
    <span class="meta">Premium Page · ${numPages} pages</span>
  </div>
  <div id="stage">
    <button id="btn-prev-a" disabled>‹</button>
    <div id="book-container">
      <div id="book">
        ${images.map(src => `<div class="page"><img src="${src}"></div>`).join('\n        ')}
      </div>
    </div>
    <button id="btn-next-a">›</button>
    <div id="badge">premiumpage.kr</div>
  </div>
  <div id="bottom">
    <button class="btn" id="btn-prev" disabled>◀ PREV</button>
    <span id="pinfo">1 / ${numPages}</span>
    <button class="btn" id="btn-next">NEXT ▶</button>
  </div>
  ${pageFlipScript
    ? `<script>${pageFlipScript}</script>`
    : `<script src="https://unpkg.com/page-flip@2.0.7/dist/js/page-flip.browser.js"></script>`}
  <script>
  (function(){
    var n=${numPages};
    var ratio=${pageRatio.toFixed(4)};
    var stage=document.getElementById('stage');
    var book=document.getElementById('book');
    var pinfo=document.getElementById('pinfo');
    var btnP=document.getElementById('btn-prev');
    var btnN=document.getElementById('btn-next');
    var btnPA=document.getElementById('btn-prev-a');
    var btnNA=document.getElementById('btn-next-a');
    var cur=0;
    function updateUI(page){
      cur=page;
      pinfo.textContent=(page+1)+' / '+n;
      btnP.disabled=btnPA.disabled=page<=0;
      btnN.disabled=btnNA.disabled=page>=n-1;
    }
    function calcSize(){
      var sw=stage.clientWidth-100, sh=stage.clientHeight-40;
      var w=Math.min(sw*0.48, sh*ratio, 520);
      var h=w/ratio;
      if(h>sh){h=sh;w=h*ratio;}
      return{w:Math.floor(w),h:Math.floor(h)};
    }
    var pf=null;
    function init(){
      var sz=calcSize();
      if(pf){ try{pf.destroy();}catch(e){} }
      book.innerHTML='';
      ${images.map(src => `book.innerHTML+='<div class="page"><img src="${src}"></div>';`).join('\n      ')}
      if(window.St&&window.St.PageFlip){
        pf=new window.St.PageFlip(book,{
          width:sz.w,height:sz.h,size:'fixed',
          showCover:false,mobileScrollSupport:true,
          maxShadowOpacity:0.35,flippingTime:650,
          drawShadow:true,showPageCorners:true
        });
        pf.loadFromHTML(book.querySelectorAll('.page'));
        pf.on('flip',function(e){updateUI(e.data);});
        updateUI(0);
      }
    }
    init();
    var resizeT;
    window.addEventListener('resize',function(){clearTimeout(resizeT);resizeT=setTimeout(init,200);});
    btnP.addEventListener('click',function(){if(pf)pf.flipPrev();});
    btnN.addEventListener('click',function(){if(pf)pf.flipNext();});
    btnPA.addEventListener('click',function(){if(pf)pf.flipPrev();});
    btnNA.addEventListener('click',function(){if(pf)pf.flipNext();});
    document.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){if(pf)pf.flipNext();}
      if(e.key==='ArrowLeft'||e.key==='ArrowUp'){if(pf)pf.flipPrev();}
    });
  })();
  </script>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = title.replace(/\.pdf$/i, '') + '-flipbook.html'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(blobUrl), 5000)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
