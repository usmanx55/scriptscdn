(function () {
  // Simple tracking variables
  let scriptLoaded = false;
  let scriptLoading = false;
  let iframeLoaded = false;

  // Main initialization function
  function init() {
    // Find needed elements
    const cmAd = document.getElementById("cmAd");
    const commentForm = document.getElementById("commentForm");
    const commentRoot = document.querySelector(".cmF");

    // Make sure comment button is visible initially
    if (cmAd) {
      cmAd.classList.add("cmD", "cmButton");
      cmAd.style.visibility = "";
      cmAd.style.display = "block";
    }

    // Delegate all click events
    document.addEventListener("click", function (e) {
      // Handle reply buttons
      if (e.target.closest(".rpT")) {
        e.preventDefault();
        const replyBtn = e.target.closest(".rpT");
        const replyId = replyBtn.getAttribute("data-reply-to");
        const targetComment = document.getElementById("c" + replyId);

        if (targetComment && commentForm) {
          // Move form to comment
          targetComment.appendChild(commentForm);
          commentForm.className = "cmX";

          // Show main button again for returning to main comments
          if (cmAd) {
            cmAd.style.display = "block";
          }

          // Update iframe if needed
          loadCommentFrame(replyId);
        }
        return;
      }

      // Handle main comment button
      if (e.target === cmAd || e.target.closest("#cmAd")) {
        e.preventDefault();

        // Only proceed if we have required elements
        if (commentForm && commentRoot) {
          // Move form to main comments section
          commentRoot.appendChild(commentForm);
          commentForm.className = "cmX";

          // Hide the button after clicking it
          if (cmAd) {
            cmAd.style.display = "none";
          }

          // Load/update iframe
          loadCommentFrame();
        }
      }
    });
  }

  // Load comment script once
  function loadScript(callback) {
    if (scriptLoaded) {
      callback && callback();
      return;
    }

    if (scriptLoading) {
      setTimeout(() => loadScript(callback), 100);
      return;
    }

    scriptLoading = true;

    const script = document.createElement("script");
    script.src =
      "https://www.blogger.com/static/v1/jsbin/157798655-comment_from_post_iframe.js";

    script.onload = function () {
      scriptLoaded = true;
      scriptLoading = false;
      BLOG_CMT_createIframe("https://www.blogger.com/rpc_relay.html");
      callback && callback();
    };

    document.body.appendChild(script);
  }

  // Load or update comment iframe
  function loadCommentFrame(parentId) {
    // Find comment editor placeholder
    const editor = document.getElementById("comment-editor");
    if (!editor) return;

    // If iframe already exists, just update source
    if (iframeLoaded) {
      const iframe = document.getElementById("comment-editor");
      if (iframe && iframe.src) {
        const baseUrl = iframe.src.split("&parentID=")[0];
        iframe.src = baseUrl + (parentId ? "&parentID=" + parentId : "");
      }
      return;
    }

    // Create new iframe
    const iframe = document.createElement("iframe");
    iframe.id = editor.id;
    iframe.className = editor.className;
    iframe.name = editor.getAttribute("name");
    iframe.title = editor.getAttribute("title");

    // Prepare source URL
    let srcUrl = editor.getAttribute("data-src");
    if (parentId) {
      srcUrl += "&parentID=" + parentId;
    }

    // Load script first, then create iframe
    loadScript(() => {
      iframe.src = srcUrl;
      editor.parentNode.replaceChild(iframe, editor);
      iframeLoaded = true;
    });
  }

  // Run init when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
const THEME_KEY = &#39;blog-theme-preference&#39;;const DEFAULT_THEME = &#39;default&#39;;const VALID_THEMES = [&#39;default&#39;, &#39;dark&#39;, &#39;light&#39;];let blogElement = document.querySelector(&#39;.nB&#39;);function initializeTheme(){const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;requestAnimationFrame(() =&gt; setTheme(savedTheme, false));}function setTheme(theme, savePreference = true){requestAnimationFrame(() =&gt;{blogElement.setAttribute(&#39;data-theme&#39;, theme);document.documentElement.classList.toggle(&#39;dark-mode&#39;, theme === &#39;dark&#39;);});if(savePreference){localStorage.setItem(THEME_KEY, theme);}}document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; requestIdleCallback(initializeTheme));window.setTheme = setTheme;
(function(){function initYouTubeLazy(){const observer = new IntersectionObserver((entries, obs) =&gt;{entries.forEach(entry =&gt;{if (entry.isIntersecting){const container = entry.target;const videoId = container.getAttribute(&#39;data-youtube-id&#39;);if (videoId){container.innerHTML = `<iframe allowfullscreen='true' loading='lazy' src='https://www.youtube.com/embed/${videoId}?autoplay=0&amp;rel=0&amp;modestbranding=1'/>`;obs.unobserve(container);}}});},{rootMargin: &#39;200px 0px&#39;, threshold: 0.1 });document.querySelectorAll(&#39;.videoYt&#39;).forEach(container =&gt; {const iframe = container.querySelector(&#39;iframe&#39;);if (iframe) {const src = iframe.getAttribute(&#39;data-src&#39;) || iframe.getAttribute(&#39;src&#39;);if(src){container.setAttribute(&#39;data-youtube-id&#39;, src.split(&#39;/&#39;).pop());observer.observe(container);}}});}window.addEventListener(&#39;load&#39;, initYouTubeLazy);})();Defer.dom(&quot;.lazy&quot;,100,&quot;loaded&quot;,null,{rootMargin:&quot;1px&quot;})
document.addEventListener('DOMContentLoaded',()=>{const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;document.body.addEventListener('click',(e)=>{const anchor = e.target.closest('a[href^="#"]');if (!anchor) return;const id = anchor.getAttribute('href').slice(1);const target = document.getElementById(id);if (!target) return;e.preventDefault();requestAnimationFrame(() => {requestAnimationFrame(() => {target.scrollIntoView({behavior: prefersReducedMotion ? 'auto' :'smooth',block:'start'});});});},{passive: true});});
let t,e,n,o,i,a=null,s=65,c=new Set;const r=1111;function d(t){o=performance.now();const e=t.target.closest("a");m(e)&&p(e.href,"high")}function u(t){if(performance.now()-o<r)return;if(!("closest"in t.target))return;const e=t.target.closest("a");m(e)&&(e.addEventListener("mouseout",f,{passive:!0}),i=setTimeout(()=>{p(e.href,"high"),i=void 0},s))}function l(t){const e=t.target.closest("a");m(e)&&p(e.href,"high")}function f(t){t.relatedTarget&&t.target.closest("a")==t.relatedTarget.closest("a")||i&&(clearTimeout(i),i=void 0)}function h(t){if(performance.now()-o<r)return;const e=t.target.closest("a");if(t.which>1||t.metaKey||t.ctrlKey)return;if(!e)return;e.addEventListener("click",function(t){1337!=t.detail&&t.preventDefault()},{capture:!0,passive:!1,once:!0});const n=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1,detail:1337});e.dispatchEvent(n)}function m(o){if(o&&o.href&&(!n||"instant"in o.dataset)){if(o.origin!=location.origin){if(!(e||"instant"in o.dataset)||!a)return}if(["http:","https:"].includes(o.protocol)&&("http:"!=o.protocol||"https:"!=location.protocol)&&(t||!o.search||"instant"in o.dataset)&&!(o.hash&&o.pathname+o.search==location.pathname+location.search||"noInstant"in o.dataset))return!0}}function p(t,e="auto"){if(c.has(t))return;const n=document.createElement("link");n.rel="prefetch",n.href=t,n.fetchPriority=e,n.as="document",document.head.appendChild(n),c.add(t)}!function(){if(!document.createElement("link").relList.supports("prefetch"))return;const o="instantVaryAccept"in document.body.dataset||"Shopify"in window,i=navigator.userAgent.indexOf("Chrome/");i>-1&&(a=parseInt(navigator.userAgent.substring(i+"Chrome/".length)));if(o&&a&&a<110)return;const c="instantMousedownShortcut"in document.body.dataset;t="instantAllowQueryString"in document.body.dataset,e="instantAllowExternalLinks"in document.body.dataset,n="instantWhitelist"in document.body.dataset;const r={capture:!0,passive:!0};let f=!1,v=!1,g=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if(t.startsWith("mousedown"))f=!0,"mousedown-only"==t&&(v=!0);else if(t.startsWith("viewport")){const e=navigator.connection&&navigator.connection.saveData,n=navigator.connection&&navigator.connection.effectiveType&&navigator.connection.effectiveType.includes("2g");e||n||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(g=!0):"viewport-all"==t&&(g=!0))}else{const e=parseInt(t);isNaN(e)||(s=e)}}v||document.addEventListener("touchstart",d,r);f?c||document.addEventListener("mousedown",l,r):document.addEventListener("mouseover",u,r);c&&document.addEventListener("mousedown",h,r);if(g){let t=window.requestIdleCallback;t||(t=(t=>{t()})),t(function(){const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),p(n.href)}})});document.querySelectorAll("a").forEach(e=>{m(e)&&t.observe(e)})},{timeout:1500})}}();