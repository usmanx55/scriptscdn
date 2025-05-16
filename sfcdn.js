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
  (function() {
    function initYouTubeLazy() {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const container = entry.target;
            const videoId = container.getAttribute('data-youtube-id');
            if (videoId) {
              container.innerHTML = `<iframe allowfullscreen='true' loading='lazy' src='https://www.youtube.com/embed/${videoId}?autoplay=0&amp;rel=0&amp;modestbranding=1'></iframe>`;
              obs.unobserve(container);
            }
          }
        });
      }, { rootMargin: '200px 0px', threshold: 0.1 });

      document.querySelectorAll('.videoYt').forEach(container => {
        const iframe = container.querySelector('iframe');
        if (iframe) {
          const src = iframe.getAttribute('data-src') || iframe.getAttribute('src');
          if (src) {
            container.setAttribute('data-youtube-id', src.split('/').pop());
            observer.observe(container);
          }
        }
      });
    }
    window.addEventListener('load', initYouTubeLazy);
  })();

function extractVideoId(src) {
  const match = src.match(/\/embed\/([^?]+)/);
  return match ? match[1] : null;
}

async function getVideoDetails(videoId) {
  const apiKey = 'AIzaSyBpBjFgf2nyaEz4xRRFLzo4MZY3WuT0IRY';
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`);
  const data = await response.json();
  return data.items[0];
}

function convertDuration(youtubeDuration) {
  const match = youtubeDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  return `PT${hours}H${minutes}M${seconds}S`;
}

function generateSchemaMarkup(videoData, videoId) {
  const snippet = videoData.snippet;
  const contentDetails = videoData.contentDetails;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": snippet.title,
    "description": snippet.description,
    "thumbnailUrl": snippet.thumbnails.default.url,
    "uploadDate": snippet.publishedAt,
    "duration": convertDuration(contentDetails.duration),
    "embedUrl": `https://www.youtube.com/embed/${videoId}`,
    "contentUrl": `https://www.youtube.com/watch?v=${videoId}`
  };
}

async function generateAllSchemaMarkup() {
  const videoElements = document.querySelectorAll('.videoYt iframe');
  const schemaMarkup = [];
  
  for (const iframe of videoElements) {
    const videoId = extractVideoId(iframe.getAttribute('data-src'));
    if (videoId) {
      try {
        const videoData = await getVideoDetails(videoId);
        const markup = generateSchemaMarkup(videoData, videoId);
        schemaMarkup.push(markup);
      } catch (error) {
        console.error(`Error fetching details for video ${videoId}:`, error);
      }
    }
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaMarkup);
  document.head.appendChild(script);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(generateAllSchemaMarkup, 100);
  });
} else {
  setTimeout(generateAllSchemaMarkup, 100);
}
