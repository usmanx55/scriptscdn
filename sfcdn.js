(function(){
  // Minimal config
  const K='blogTheme',T={D:'default',DA:'dark',L:'light'};
  let r=null,m=null,c=null;
  
  // Get saved theme
  function g(){
    try{return localStorage.getItem(K)||T.D;}catch(e){return T.D;}
  }
  
  // Apply theme
  function a(t,i=false){
    if(t===c&&!i)return;
    c=t;
    requestAnimationFrame(()=>{
      r.setAttribute('data-theme',t);
      if(t!==T.D||!i)try{localStorage.setItem(K,t);}catch(e){}
    });
  }
  
  // Init
  function i(){
    if(r)return;
    r=document.documentElement.querySelector('.nB')||document.body;
    m=window.matchMedia('(prefers-color-scheme: dark)');
    document.addEventListener('click',e=>{
      const t=e.target.closest('[onclick*="setTheme"],[data-theme-value]');
      if(!t)return;
      e.preventDefault();
      let h=t.getAttribute('data-theme-value');
      if(!h){
        const m=t.getAttribute('onclick')?.match(/setTheme\(['"](.+?)['"]\)/);
        if(m&&m[1])h=m[1];
      }
      if(h)a(h);
    });
    try{m.addEventListener('change',()=>{
      if(c===T.D)requestAnimationFrame(()=>r.setAttribute('data-theme',T.D));
    },{passive:true});}catch(e){m.addListener(()=>{
      if(c===T.D)requestAnimationFrame(()=>r.setAttribute('data-theme',T.D));
    });}
    a(g(),true);
  }
  
  // Apply initial theme immediately to prevent flash
  try{
    const s=g();
    const root=document.documentElement.querySelector('.nB')||document.body;
    if(root)root.setAttribute('data-theme',s);
  }catch(e){}
  
  // Initialize when idle
  if('requestIdleCallback' in window)requestIdleCallback(i,{timeout:1000});
  else setTimeout(i,20);
  
  // Global theme setter
  window.setTheme=t=>{
    if(t&&(t===T.D||t===T.DA||t===T.L))a(t);
    return false;
  };
})();



document.addEventListener('DOMContentLoaded',()=>{const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;document.body.addEventListener('click',(e)=>{const anchor = e.target.closest('a[href^="#"]');if (!anchor) return;const id = anchor.getAttribute('href').slice(1);const target = document.getElementById(id);if (!target) return;e.preventDefault();requestAnimationFrame(() => {requestAnimationFrame(() => {target.scrollIntoView({behavior: prefersReducedMotion ? 'auto' :'smooth',block:'start'});});});},{passive: true});});

let commentLazy = false; let commentIframeLoaded = false; function loadCommentIframe() { if (commentIframeLoaded) return; const scriptCJs = document.createElement('script'); scriptCJs.src = 'https://www.blogger.com/static/v1/jsbin/157798655-comment_from_post_iframe.js'; document.body.appendChild(scriptCJs); scriptCJs.addEventListener('load', function() { BLOG_CMT_createIframe('https://www.blogger.com/rpc_relay.html'); }); const dvCmEdtr = document.getElementById('comment-editor'); const iframeCm = document.createElement('iframe'); iframeCm.setAttribute('data-src', dvCmEdtr.getAttribute('data-src')); iframeCm.className = dvCmEdtr.className; iframeCm.id = dvCmEdtr.id; iframeCm.name = dvCmEdtr.getAttribute('name'); iframeCm.title = dvCmEdtr.getAttribute('title'); const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { iframeCm.src = iframeCm.getAttribute('data-src'); dvCmEdtr.parentNode.replaceChild(iframeCm, dvCmEdtr); commentIframeLoaded = true; observer.disconnect(); } }, { rootMargin: '200px' }); observer.observe(dvCmEdtr); } function throttle(func, limit) { let inThrottle; return function() { const args = arguments; const context = this; if (!inThrottle) { func.apply(context, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } } } window.addEventListener('scroll', throttle(() => { if (!commentLazy) { loadCommentIframe(); commentLazy = true; } }, 250)); document.addEventListener('DOMContentLoaded', function() { const commentForm = document.getElementById('commentForm'); const cmAd = document.getElementById('cmAd'); const replyButtons = document.getElementsByClassName('rpT'); function handleReply(replyButton) { replyButton.addEventListener('click', function() { const replyTo = replyButton.getAttribute('data-reply-to'); const targetComment = document.getElementById('c' + replyTo); if (targetComment && commentForm) { targetComment.appendChild(commentForm); commentForm.className = 'cmX'; cmAd.className = 'cmD cmButton'; const iframe = document.getElementById('comment-editor'); if (iframe) { iframe.src = iframe.src + '&parentID=' + replyTo; } } }); } Array.from(replyButtons).forEach(handleReply); if (cmAd) { cmAd.addEventListener('click', function() { const cmF = document.getElementsByClassName('cmF')[0]; if (cmF && commentForm) { cmF.appendChild(commentForm); commentForm.className = 'cmX'; cmAd.className = 'cmD hidden'; const iframe = document.getElementById('comment-editor'); if (iframe) { iframe.src = iframe.getAttribute('data-src'); } } }); } });
