import"../sb-preview/runtime.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))_(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&_(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function _(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const f="modulepreload",m=function(r,o){return new URL(r,o).href},a={},O=function(o,i,_){if(!i||i.length===0)return o();const t=document.getElementsByTagName("link");return Promise.all(i.map(e=>{if(e=m(e,_),e in a)return;a[e]=!0;const n=e.endsWith(".css"),d=n?'[rel="stylesheet"]':"";if(!!_)for(let c=t.length-1;c>=0;c--){const l=t[c];if(l.href===e&&(!n||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const s=document.createElement("link");if(s.rel=n?"stylesheet":f,n||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),n)return new Promise((c,l)=>{s.addEventListener("load",c),s.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o())},{createChannel:R}=__STORYBOOK_MODULE_CHANNEL_POSTMESSAGE__,{createChannel:S}=__STORYBOOK_MODULE_CHANNEL_WEBSOCKET__,{addons:u}=__STORYBOOK_MODULE_PREVIEW_API__,E=R({page:"preview"});u.setChannel(E);window.__STORYBOOK_ADDONS_CHANNEL__=E;if(window.CONFIG_TYPE==="DEVELOPMENT"){const r=S({});u.setServerChannel(r),window.__STORYBOOK_SERVER_CHANNEL__=r}const w={"./stories/chapter01.stories.ts":async()=>O(()=>import("./chapter01.stories-dc8daa85.js"),["./chapter01.stories-dc8daa85.js","./chapter01-06481f44.js","./common-9d5f0eb9.js","./_commonjsHelpers-725317a4.js"],import.meta.url),"./stories/chapter02.stories.ts":async()=>O(()=>import("./chapter02.stories-c5519e7f.js"),["./chapter02.stories-c5519e7f.js","./chapter01-06481f44.js","./common-9d5f0eb9.js","./_commonjsHelpers-725317a4.js"],import.meta.url),"./stories/chapter03.stories.ts":async()=>O(()=>import("./chapter03.stories-1eb19c12.js"),["./chapter03.stories-1eb19c12.js","./common-9d5f0eb9.js","./_commonjsHelpers-725317a4.js"],import.meta.url)};async function h(r){return w[r]()}const{composeConfigs:p,PreviewWeb:T,ClientApi:P}=__STORYBOOK_MODULE_PREVIEW_API__,L=async()=>{const r=await Promise.all([O(()=>import("./config-2de56a95.js"),["./config-2de56a95.js","./_commonjsHelpers-725317a4.js"],import.meta.url)]);return p(r)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new T;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new P({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:h,getProjectAnnotations:L});
//# sourceMappingURL=iframe-add5fc5e.js.map
