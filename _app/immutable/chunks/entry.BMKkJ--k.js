var Jt=t=>{throw TypeError(t)};var Oe=(t,e,n)=>e.has(t)||Jt("Cannot "+n);var A=(t,e,n)=>(Oe(t,e,"read from private field"),n?n.call(t):e.get(t)),x=(t,e,n)=>e.has(t)?Jt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n);import{n as Ut,aN as je,I as C,i as N,G as O,au as $e}from"./runtime.BLTbdMJA.js";import{a as De,b as P}from"./paths.DLu3fkr5.js";import{o as Xt}from"./index-client.C-pQdCAW.js";new URL("sveltekit-internal://");function Fe(t,e){return t==="/"||e==="ignore"?t:e==="never"?t.endsWith("/")?t.slice(0,-1):t:e==="always"&&!t.endsWith("/")?t+"/":t}function Ve(t){return t.split("%25").map(decodeURI).join("%25")}function Be(t){for(const e in t)t[e]=decodeURIComponent(t[e]);return t}function Lt({href:t}){return t.split("#")[0]}function qe(t,e,n,r=!1){const a=new URL(t);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(i,s){if(s==="get"||s==="getAll"||s==="has")return l=>(n(l),i[s](l));e();const c=Reflect.get(i,s);return typeof c=="function"?c.bind(i):c}}),enumerable:!0,configurable:!0});const o=["href","pathname","search","toString","toJSON"];r&&o.push("hash");for(const i of o)Object.defineProperty(a,i,{get(){return e(),t[i]},enumerable:!0,configurable:!0});return a}const Ge="/__data.json",Me=".html__data.json";function He(t){return t.endsWith(".html")?t.replace(/\.html$/,Me):t.replace(/\/$/,"")+Ge}function Ke(...t){let e=5381;for(const n of t)if(typeof n=="string"){let r=n.length;for(;r;)e=e*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)e=e*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}function We(t){const e=atob(t),n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n.buffer}const fe=window.fetch;window.fetch=(t,e)=>((t instanceof Request?t.method:(e==null?void 0:e.method)||"GET")!=="GET"&&z.delete(jt(t)),fe(t,e));const z=new Map;function Ye(t,e){const n=jt(t,e),r=document.querySelector(n);if(r!=null&&r.textContent){let{body:a,...o}=JSON.parse(r.textContent);const i=r.getAttribute("data-ttl");return i&&z.set(n,{body:a,init:o,ttl:1e3*Number(i)}),r.getAttribute("data-b64")!==null&&(a=We(a)),Promise.resolve(new Response(a,o))}return window.fetch(t,e)}function ze(t,e,n){if(z.size>0){const r=jt(t,n),a=z.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);z.delete(r)}}return window.fetch(e,n)}function jt(t,e){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(e!=null&&e.headers||e!=null&&e.body){const a=[];e.headers&&a.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&a.push(e.body),r+=`[data-hash="${Ke(...a)}"]`}return r}const Je=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Xe(t){const e=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${Qe(t).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return e.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(o)return e.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return Tt(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return Tt(String.fromCharCode(...c.slice(2).split("-").map(f=>parseInt(f,16))));const h=Je.exec(c),[,d,y,u,g]=h;return e.push({name:u,matcher:g,optional:!!d,rest:!!y,chained:y?l===1&&i[0]==="":!1}),y?"(.*?)":d?"([^/]*)?":"([^/]+?)"}return Tt(c)}).join("")}).join("")}/?$`),params:e}}function Ze(t){return!/^\([^)]+\)$/.test(t)}function Qe(t){return t.slice(1).split("/").filter(Ze)}function tn(t,e,n){const r={},a=t.slice(1),o=a.filter(s=>s!==void 0);let i=0;for(let s=0;s<e.length;s+=1){const c=e[s];let l=a[s-i];if(c.chained&&c.rest&&i&&(l=a.slice(s-i,s+1).filter(h=>h).join("/"),i=0),l===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](l)){r[c.name]=l;const h=e[s+1],d=a[s+1];h&&!h.rest&&h.optional&&d&&c.chained&&(i=0),!h&&!d&&Object.keys(r).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return r}function Tt(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function en({nodes:t,server_loads:e,dictionary:n,matchers:r}){const a=new Set(e);return Object.entries(n).map(([s,[c,l,h]])=>{const{pattern:d,params:y}=Xe(s),u={id:s,exec:g=>{const f=d.exec(g);if(f)return tn(f,y,r)},errors:[1,...h||[]].map(g=>t[g]),layouts:[0,...l||[]].map(i),leaf:o(c)};return u.errors.length=u.layouts.length=Math.max(u.errors.length,u.layouts.length),u});function o(s){const c=s<0;return c&&(s=~s),[c,t[s]]}function i(s){return s===void 0?s:[a.has(s),t[s]]}}function ue(t,e=JSON.parse){try{return e(sessionStorage[t])}catch{}}function Zt(t,e,n=JSON.stringify){const r=n(e);try{sessionStorage[t]=r}catch{}}const B=[];function $t(t,e=Ut){let n=null;const r=new Set;function a(s){if(je(t,s)&&(t=s,n)){const c=!B.length;for(const l of r)l[1](),B.push(l,t);if(c){for(let l=0;l<B.length;l+=2)B[l][0](B[l+1]);B.length=0}}}function o(s){a(s(t))}function i(s,c=Ut){const l=[s,c];return r.add(l),r.size===1&&(n=e(a,o)||Ut),s(t),()=>{r.delete(l),r.size===0&&n&&(n(),n=null)}}return{set:a,update:o,subscribe:i}}const nn="1735907453210",he="sveltekit:snapshot",de="sveltekit:scroll",Dt="sveltekit:states",pe="sveltekit:pageurl",F="sveltekit:history",H="sveltekit:navigation",ut={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},ft=location.origin;function Ft(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function Vt(){return{x:pageXOffset,y:pageYOffset}}function q(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const Qt={...ut,"":ut.hover};function ge(t){let e=t.assignedSlot??t.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function me(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=ge(t)}}function Ct(t,e,n){let r;try{r=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,o=!r||!!a||vt(r,e,n)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),i=(r==null?void 0:r.origin)===ft&&t.hasAttribute("download");return{url:r,external:o,target:a,download:i}}function ht(t){let e=null,n=null,r=null,a=null,o=null,i=null,s=t;for(;s&&s!==document.documentElement;)r===null&&(r=q(s,"preload-code")),a===null&&(a=q(s,"preload-data")),e===null&&(e=q(s,"keepfocus")),n===null&&(n=q(s,"noscroll")),o===null&&(o=q(s,"reload")),i===null&&(i=q(s,"replacestate")),s=ge(s);function c(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Qt[r??"off"],preload_data:Qt[a??"off"],keepfocus:c(e),noscroll:c(n),reload:c(o),replace_state:c(i)}}function te(t){const e=$t(t);let n=!0;function r(){n=!0,e.update(i=>i)}function a(i){n=!1,e.set(i)}function o(i){let s;return e.subscribe(c=>{(s===void 0||n&&c!==s)&&i(s=c)})}return{notify:r,set:a,subscribe:o}}const ye={v:()=>{}};function rn(){const{set:t,subscribe:e}=$t(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${De}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const i=(await a.json()).version!==nn;return i&&(t(!0),ye.v(),clearTimeout(n)),i}catch{return!1}}return{subscribe:e,check:r}}function vt(t,e,n){return t.origin!==ft||!t.pathname.startsWith(e)?!0:n?!(t.pathname===e+"/"||t.protocol==="file:"&&t.pathname.replace(/\/[^/]+\.html?$/,"")===e):!1}function ee(t){const e=on(t),n=new ArrayBuffer(e.length),r=new DataView(n);for(let a=0;a<n.byteLength;a++)r.setUint8(a,e.charCodeAt(a));return n}const an="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function on(t){t.length%4===0&&(t=t.replace(/==?$/,""));let e="",n=0,r=0;for(let a=0;a<t.length;a++)n<<=6,n|=an.indexOf(t[a]),r+=6,r===24&&(e+=String.fromCharCode((n&16711680)>>16),e+=String.fromCharCode((n&65280)>>8),e+=String.fromCharCode(n&255),n=r=0);return r===12?(n>>=4,e+=String.fromCharCode(n)):r===18&&(n>>=2,e+=String.fromCharCode((n&65280)>>8),e+=String.fromCharCode(n&255)),e}const sn=-1,cn=-2,ln=-3,fn=-4,un=-5,hn=-6;function dn(t,e){if(typeof t=="number")return a(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const n=t,r=Array(n.length);function a(o,i=!1){if(o===sn)return;if(o===ln)return NaN;if(o===fn)return 1/0;if(o===un)return-1/0;if(o===hn)return-0;if(i)throw new Error("Invalid input");if(o in r)return r[o];const s=n[o];if(!s||typeof s!="object")r[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],l=e==null?void 0:e[c];if(l)return r[o]=l(a(s[1]));switch(c){case"Date":r[o]=new Date(s[1]);break;case"Set":const h=new Set;r[o]=h;for(let u=1;u<s.length;u+=1)h.add(a(s[u]));break;case"Map":const d=new Map;r[o]=d;for(let u=1;u<s.length;u+=2)d.set(a(s[u]),a(s[u+1]));break;case"RegExp":r[o]=new RegExp(s[1],s[2]);break;case"Object":r[o]=Object(s[1]);break;case"BigInt":r[o]=BigInt(s[1]);break;case"null":const y=Object.create(null);r[o]=y;for(let u=1;u<s.length;u+=2)y[s[u]]=a(s[u+1]);break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":{const u=globalThis[c],g=s[1],f=ee(g),p=new u(f);r[o]=p;break}case"ArrayBuffer":{const u=s[1],g=ee(u);r[o]=g;break}default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);r[o]=c;for(let l=0;l<s.length;l+=1){const h=s[l];h!==cn&&(c[l]=a(h))}}else{const c={};r[o]=c;for(const l in s){const h=s[l];c[l]=a(h)}}return r[o]}return a(0)}const _e=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[..._e];const pn=new Set([..._e]);[...pn];function gn(t){return t.filter(e=>e!=null)}class bt{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class we{constructor(e,n){this.status=e,this.location=n}}class Bt extends Error{constructor(e,n,r){super(r),this.status=e,this.text=n}}const mn="x-sveltekit-invalidated",yn="x-sveltekit-trailing-slash";function dt(t){return t instanceof bt||t instanceof Bt?t.status:500}function _n(t){return t instanceof Bt?t.text:"Internal Error"}let w,X,xt;const wn=Xt.toString().includes("$$")||/function \w+\(\) \{\}/.test(Xt.toString());var tt,et,nt,rt,at,ot,st,it,ie,ct,ce,lt,le;wn?(w={data:{},form:null,error:null,params:{},route:{id:null},state:{},status:-1,url:new URL("https://example.com")},X={current:null},xt={current:!1}):(w=new(ie=class{constructor(){x(this,tt,C({}));x(this,et,C(null));x(this,nt,C(null));x(this,rt,C({}));x(this,at,C({id:null}));x(this,ot,C({}));x(this,st,C(-1));x(this,it,C(new URL("https://example.com")))}get data(){return N(A(this,tt))}set data(e){O(A(this,tt),e)}get form(){return N(A(this,et))}set form(e){O(A(this,et),e)}get error(){return N(A(this,nt))}set error(e){O(A(this,nt),e)}get params(){return N(A(this,rt))}set params(e){O(A(this,rt),e)}get route(){return N(A(this,at))}set route(e){O(A(this,at),e)}get state(){return N(A(this,ot))}set state(e){O(A(this,ot),e)}get status(){return N(A(this,st))}set status(e){O(A(this,st),e)}get url(){return N(A(this,it))}set url(e){O(A(this,it),e)}},tt=new WeakMap,et=new WeakMap,nt=new WeakMap,rt=new WeakMap,at=new WeakMap,ot=new WeakMap,st=new WeakMap,it=new WeakMap,ie),X=new(ce=class{constructor(){x(this,ct,C(null))}get current(){return N(A(this,ct))}set current(e){O(A(this,ct),e)}},ct=new WeakMap,ce),xt=new(le=class{constructor(){x(this,lt,C(!1))}get current(){return N(A(this,lt))}set current(e){O(A(this,lt),e)}},lt=new WeakMap,le),ye.v=()=>xt.current=!0);function vn(t){Object.assign(w,t)}const bn=new Set(["icon","shortcut icon","apple-touch-icon"]),V=ue(de)??{},Z=ue(he)??{},$={url:te({}),page:te({}),navigating:$t(null),updated:rn()};function At(t){V[t]=Vt()}function ve(t,e){let n=t+1;for(;V[n];)delete V[n],n+=1;for(n=e+1;Z[n];)delete Z[n],n+=1}function K(t){return location.href=t.href,new Promise(()=>{})}async function be(){if("serviceWorker"in navigator){const t=await navigator.serviceWorker.getRegistration(P||"/");t&&await t.update()}}function ne(){}let St,Nt,pt,j,Ot,E;const Ae=[],gt=[];let T=null;const Se=[],An=[];let G=[],_={branch:[],error:null,url:null},qt=!1,mt=!1,re=!0,Q=!1,W=!1,Gt=!1,Mt=!1,kt,k,L,yt;const J=new Set;async function Fn(t,e,n){var a,o,i,s;document.URL!==location.href&&(location.href=location.href),E=t,await((o=(a=t.hooks).init)==null?void 0:o.call(a)),St=en(t),j=document.documentElement,Ot=e,Nt=t.nodes[0],pt=t.nodes[1],Nt(),pt(),k=(i=history.state)==null?void 0:i[F],L=(s=history.state)==null?void 0:s[H],k||(k=L=Date.now(),history.replaceState({...history.state,[F]:k,[H]:L},""));const r=V[k];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await Tn(Ot,n):Un(location.href,{replaceState:!0}),Ln()}function Sn(){Ae.length=0,Mt=!1}function ke(t){gt.some(e=>e==null?void 0:e.snapshot)&&(Z[t]=gt.map(e=>{var n;return(n=e==null?void 0:e.snapshot)==null?void 0:n.capture()}))}function Ee(t){var e;(e=Z[t])==null||e.forEach((n,r)=>{var a,o;(o=(a=gt[r])==null?void 0:a.snapshot)==null||o.restore(n)})}function ae(){At(k),Zt(de,V),ke(L),Zt(he,Z)}async function Re(t,e,n,r){return Y({type:"goto",url:Ft(t),keepfocus:e.keepFocus,noscroll:e.noScroll,replace_state:e.replaceState,state:e.state,redirect_count:n,nav_token:r,accept:()=>{e.invalidateAll&&(Mt=!0)}})}async function kn(t){if(t.id!==(T==null?void 0:T.id)){const e={};J.add(e),T={id:t.id,token:e,promise:Ue({...t,preload:e}).then(n=>(J.delete(e),n.type==="loaded"&&n.state.error&&(T=null),n))}}return T.promise}async function Pt(t){const e=St.find(n=>n.exec(Le(t)));e&&await Promise.all([...e.layouts,e.leaf].map(n=>n==null?void 0:n[1]()))}function Ie(t,e,n){var o;_=t.state;const r=document.querySelector("style[data-sveltekit]");r&&r.remove(),Object.assign(w,t.props.page),kt=new E.root({target:e,props:{...t.props,stores:$,components:gt},hydrate:n,sync:!1}),Ee(L);const a={from:null,to:{params:_.params,route:{id:((o=_.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};G.forEach(i=>i(a)),mt=!0}function _t({url:t,params:e,branch:n,status:r,error:a,route:o,form:i}){let s="never";if(P&&(t.pathname===P||t.pathname===P+"/"))s="always";else for(const u of n)(u==null?void 0:u.slash)!==void 0&&(s=u.slash);t.pathname=Fe(t.pathname,s),t.search=t.search;const c={type:"loaded",state:{url:t,params:e,branch:n,error:a,route:o},props:{constructors:gn(n).map(u=>u.node.component),page:w}};i!==void 0&&(c.props.form=i);let l={},h=!w,d=0;for(let u=0;u<Math.max(n.length,_.branch.length);u+=1){const g=n[u],f=_.branch[u];(g==null?void 0:g.data)!==(f==null?void 0:f.data)&&(h=!0),g&&(l={...l,...g.data},h&&(c.props[`data_${d}`]=l),d+=1)}return(!_.url||t.href!==_.url.href||_.error!==a||i!==void 0&&i!==w.form||h)&&(c.props.page={error:a,params:e,route:{id:(o==null?void 0:o.id)??null},state:{},status:r,url:new URL(t),form:i??null,data:h?l:w.data}),c}async function Ht({loader:t,parent:e,url:n,params:r,route:a,server_data_node:o}){var h,d,y;let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},l=await t();if((h=l.universal)!=null&&h.load){let u=function(...f){for(const p of f){const{href:S}=new URL(p,n);c.dependencies.add(S)}};const g={route:new Proxy(a,{get:(f,p)=>(s&&(c.route=!0),f[p])}),params:new Proxy(r,{get:(f,p)=>(s&&c.params.add(p),f[p])}),data:(o==null?void 0:o.data)??null,url:qe(n,()=>{s&&(c.url=!0)},f=>{s&&c.search_params.add(f)},E.hash),async fetch(f,p){let S;f instanceof Request?(S=f.url,p={body:f.method==="GET"||f.method==="HEAD"?void 0:await f.blob(),cache:f.cache,credentials:f.credentials,headers:[...f.headers].length?f.headers:void 0,integrity:f.integrity,keepalive:f.keepalive,method:f.method,mode:f.mode,redirect:f.redirect,referrer:f.referrer,referrerPolicy:f.referrerPolicy,signal:f.signal,...p}):S=f;const I=new URL(S,n);return s&&u(I.href),I.origin===n.origin&&(S=I.href.slice(n.origin.length)),mt?ze(S,I.href,p):Ye(S,p)},setHeaders:()=>{},depends:u,parent(){return s&&(c.parent=!0),e()},untrack(f){s=!1;try{return f()}finally{s=!0}}};i=await l.universal.load.call(null,g)??null}return{node:l,loader:t,server:o,universal:(d=l.universal)!=null&&d.load?{type:"data",data:i,uses:c}:null,data:i??(o==null?void 0:o.data)??null,slash:((y=l.universal)==null?void 0:y.trailingSlash)??(o==null?void 0:o.slash)}}function oe(t,e,n,r,a,o){if(Mt)return!0;if(!a)return!1;if(a.parent&&t||a.route&&e||a.url&&n)return!0;for(const i of a.search_params)if(r.has(i))return!0;for(const i of a.params)if(o[i]!==_.params[i])return!0;for(const i of a.dependencies)if(Ae.some(s=>s(new URL(i))))return!0;return!1}function Kt(t,e){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?e??null:null}function En(t,e){if(!t)return new Set(e.searchParams.keys());const n=new Set([...t.searchParams.keys(),...e.searchParams.keys()]);for(const r of n){const a=t.searchParams.getAll(r),o=e.searchParams.getAll(r);a.every(i=>o.includes(i))&&o.every(i=>a.includes(i))&&n.delete(r)}return n}function se({error:t,url:e,route:n,params:r}){return{type:"loaded",state:{error:t,url:e,route:n,params:r,branch:[]},props:{page:w,constructors:[]}}}async function Ue({id:t,invalidating:e,url:n,params:r,route:a,preload:o}){if((T==null?void 0:T.id)===t)return J.delete(T.token),T.promise;const{errors:i,layouts:s,leaf:c}=a,l=[...s,c];i.forEach(m=>m==null?void 0:m().catch(()=>{})),l.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let h=null;const d=_.url?t!==wt(_.url):!1,y=_.route?a.id!==_.route.id:!1,u=En(_.url,n);let g=!1;const f=l.map((m,b)=>{var D;const R=_.branch[b],U=!!(m!=null&&m[0])&&((R==null?void 0:R.loader)!==m[1]||oe(g,y,d,u,(D=R.server)==null?void 0:D.uses,r));return U&&(g=!0),U});if(f.some(Boolean)){try{h=await Pe(n,f)}catch(m){const b=await M(m,{url:n,params:r,route:{id:t}});return J.has(o)?se({error:b,url:n,params:r,route:a}):Et({status:dt(m),error:b,url:n,route:a})}if(h.type==="redirect")return h}const p=h==null?void 0:h.nodes;let S=!1;const I=l.map(async(m,b)=>{var Rt;if(!m)return;const R=_.branch[b],U=p==null?void 0:p[b];if((!U||U.type==="skip")&&m[1]===(R==null?void 0:R.loader)&&!oe(S,y,d,u,(Rt=R.universal)==null?void 0:Rt.uses,r))return R;if(S=!0,(U==null?void 0:U.type)==="error")throw U;return Ht({loader:m[1],url:n,params:r,route:a,parent:async()=>{var zt;const Yt={};for(let It=0;It<b;It+=1)Object.assign(Yt,(zt=await I[It])==null?void 0:zt.data);return Yt},server_data_node:Kt(U===void 0&&m[0]?{type:"skip"}:U??null,m[0]?R==null?void 0:R.server:void 0)})});for(const m of I)m.catch(()=>{});const v=[];for(let m=0;m<l.length;m+=1)if(l[m])try{v.push(await I[m])}catch(b){if(b instanceof we)return{type:"redirect",location:b.location};if(J.has(o))return se({error:await M(b,{params:r,url:n,route:{id:a.id}}),url:n,params:r,route:a});let R=dt(b),U;if(p!=null&&p.includes(b))R=b.status??R,U=b.error;else if(b instanceof bt)U=b.body;else{if(await $.updated.check())return await be(),await K(n);U=await M(b,{params:r,url:n,route:{id:a.id}})}const D=await Rn(m,v,i);return D?_t({url:n,params:r,branch:v.slice(0,D.idx).concat(D.node),status:R,error:U,route:a}):await xe(n,{id:a.id},U,R)}else v.push(void 0);return _t({url:n,params:r,branch:v,status:200,error:null,route:a,form:e?void 0:null})}async function Rn(t,e,n){for(;t--;)if(n[t]){let r=t;for(;!e[r];)r-=1;try{return{idx:r+1,node:{node:await n[t](),loader:n[t],data:{},server:null,universal:null}}}catch{continue}}}async function Et({status:t,error:e,url:n,route:r}){const a={};let o=null;if(E.server_loads[0]===0)try{const l=await Pe(n,[!0]);if(l.type!=="data"||l.nodes[0]&&l.nodes[0].type!=="data")throw 0;o=l.nodes[0]??null}catch{(n.origin!==ft||n.pathname!==location.pathname||qt)&&await K(n)}const s=await Ht({loader:Nt,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:Kt(o)}),c={node:await pt(),loader:pt,universal:null,server:null,data:null};return _t({url:n,params:a,branch:[s,c],status:t,error:e,route:null})}function Wt(t,e){if(!t||vt(t,P,E.hash))return;let n;try{if(n=E.hooks.reroute({url:new URL(t)})??t,typeof n=="string"){const a=new URL(t);E.hash?a.hash=n:a.pathname=n,n=a}}catch{return}const r=Le(n);for(const a of St){const o=a.exec(r);if(o)return{id:wt(t),invalidating:e,route:a,params:Be(o),url:t}}}function Le(t){return Ve(E.hash?t.hash.replace(/^#/,"").replace(/[?#].+/,""):t.pathname.slice(P.length))||"/"}function wt(t){return(E.hash?t.hash.replace(/^#/,""):t.pathname)+t.search}function Te({url:t,type:e,intent:n,delta:r}){let a=!1;const o=Ne(_,n,t,e);r!==void 0&&(o.navigation.delta=r);const i={...o.navigation,cancel:()=>{a=!0,o.reject(new Error("navigation cancelled"))}};return Q||Se.forEach(s=>s(i)),a?null:o}async function Y({type:t,url:e,popped:n,keepfocus:r,noscroll:a,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:l=ne,block:h=ne}){const d=Wt(e,!1),y=Te({url:e,type:t,delta:n==null?void 0:n.delta,intent:d});if(!y){h();return}const u=k,g=L;l(),Q=!0,mt&&$.navigating.set(X.current=y.navigation),yt=c;let f=d&&await Ue(d);if(!f){if(vt(e,P,E.hash))return await K(e);f=await xe(e,{id:null},await M(new Bt(404,"Not Found",`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(d==null?void 0:d.url)||e,yt!==c)return y.reject(new Error("navigation aborted")),!1;if(f.type==="redirect")if(s>=20)f=await Et({status:500,error:await M(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return Re(new URL(f.location,e).href,{},s+1,c),!1;else f.props.page.status>=400&&await $.updated.check()&&(await be(),await K(e));if(Sn(),At(u),ke(g),f.props.page.url.pathname!==e.pathname&&(e.pathname=f.props.page.url.pathname),i=n?n.state:i,!n){const v=o?0:1,m={[F]:k+=v,[H]:L+=v,[Dt]:i};(o?history.replaceState:history.pushState).call(history,m,"",e),o||ve(k,L)}if(T=null,f.props.page.state=i,mt){_=f.state,f.props.page&&(f.props.page.url=e);const v=(await Promise.all(An.map(m=>m(y.navigation)))).filter(m=>typeof m=="function");if(v.length>0){let m=function(){G=G.filter(b=>!v.includes(b))};v.push(m),G.push(...v)}kt.$set(f.props),vn(f.props.page),Gt=!0}else Ie(f,Ot,!1);const{activeElement:p}=document;await $e();const S=n?n.scroll:a?Vt():null;if(re){const v=e.hash&&document.getElementById(decodeURIComponent(E.hash?e.hash.split("#")[2]??"":e.hash.slice(1)));S?scrollTo(S.x,S.y):v?v.scrollIntoView():scrollTo(0,0)}const I=document.activeElement!==p&&document.activeElement!==document.body;!r&&!I&&xn(),re=!0,f.props.page&&Object.assign(w,f.props.page),Q=!1,t==="popstate"&&Ee(L),y.fulfil(void 0),G.forEach(v=>v(y.navigation)),$.navigating.set(X.current=null)}async function xe(t,e,n,r){return t.origin===ft&&t.pathname===location.pathname&&!qt?await Et({status:r,error:n,url:t,route:e}):await K(t)}function In(){let t;j.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(t),t=setTimeout(()=>{r(i,2)},20)});function e(o){o.defaultPrevented||r(o.composedPath()[0],1)}j.addEventListener("mousedown",e),j.addEventListener("touchstart",e,{passive:!0});const n=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(Pt(new URL(i.target.href)),n.unobserve(i.target))},{threshold:0});function r(o,i){const s=me(o,j);if(!s)return;const{url:c,external:l,download:h}=Ct(s,P,E.hash);if(l||h)return;const d=ht(s),y=c&&wt(_.url)===wt(c);if(!d.reload&&!y)if(i<=d.preload_data){const u=Wt(c,!1);u&&kn(u)}else i<=d.preload_code&&Pt(c)}function a(){n.disconnect();for(const o of j.querySelectorAll("a")){const{url:i,external:s,download:c}=Ct(o,P,E.hash);if(s||c)continue;const l=ht(o);l.reload||(l.preload_code===ut.viewport&&n.observe(o),l.preload_code===ut.eager&&Pt(i))}}G.push(a),a()}function M(t,e){if(t instanceof bt)return t.body;const n=dt(t),r=_n(t);return E.hooks.handleError({error:t,event:e,status:n,message:r})??{message:r}}function Un(t,e={}){return t=new URL(Ft(t)),t.origin!==ft?Promise.reject(new Error("goto: invalid URL")):Re(t,e,0)}function Vn(t,e){At(k);const n={[F]:k+=1,[H]:L,[pe]:w.url.href,[Dt]:e};history.pushState(n,"",Ft(t)),Gt=!0,w.state=e,kt.$set({page:w}),ve(k,L)}function Ln(){var e;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let r=!1;if(ae(),!Q){const a=Ne(_,void 0,null,"leave"),o={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation cancelled"))}};Se.forEach(i=>i(o))}r?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ae()}),(e=navigator.connection)!=null&&e.saveData||In(),j.addEventListener("click",async n=>{if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=me(n.composedPath()[0],j);if(!r)return;const{url:a,external:o,target:i,download:s}=Ct(r,P,E.hash);if(!a)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=ht(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||s)return;const[h,d]=(E.hash?a.hash.replace(/^#/,""):a.href).split("#"),y=h===Lt(location);if(o||c.reload&&(!y||!d)){Te({url:a,type:"link"})?Q=!0:n.preventDefault();return}if(d!==void 0&&y){const[,u]=_.url.href.split("#");if(u===d){if(n.preventDefault(),d===""||d==="top"&&r.ownerDocument.getElementById("top")===null)window.scrollTo({top:0});else{const g=r.ownerDocument.getElementById(decodeURIComponent(d));g&&(g.scrollIntoView(),g.focus())}return}if(W=!0,At(k),t(a),!c.replace_state)return;W=!1}n.preventDefault(),await new Promise(u=>{requestAnimationFrame(()=>{setTimeout(u,0)}),setTimeout(u,100)}),Y({type:"link",url:a,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??a.href===location.href})}),j.addEventListener("submit",n=>{if(n.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formTarget)||r.target)==="_blank"||((a==null?void 0:a.formMethod)||r.method)!=="get")return;const s=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(vt(s,P,!1))return;const c=n.target,l=ht(c);if(l.reload)return;n.preventDefault(),n.stopPropagation();const h=new FormData(c),d=a==null?void 0:a.getAttribute("name");d&&h.append(d,(a==null?void 0:a.getAttribute("value"))??""),s.search=new URLSearchParams(h).toString(),Y({type:"form",url:s,keepfocus:l.keepfocus,noscroll:l.noscroll,replace_state:l.replace_state??s.href===location.href})}),addEventListener("popstate",async n=>{var r;if((r=n.state)!=null&&r[F]){const a=n.state[F];if(yt={},a===k)return;const o=V[a],i=n.state[Dt]??{},s=new URL(n.state[pe]??location.href),c=n.state[H],l=Lt(location)===Lt(_.url);if(c===L&&(Gt||l)){t(s),V[k]=Vt(),o&&scrollTo(o.x,o.y),i!==w.state&&(w.state=i,kt.$set({page:w})),k=a;return}const d=a-k;await Y({type:"popstate",url:s,popped:{state:i,scroll:o,delta:d},accept:()=>{k=a,L=c},block:()=>{history.go(-d)},nav_token:yt})}else if(!W){const a=new URL(location.href);t(a)}}),addEventListener("hashchange",()=>{W?(W=!1,history.replaceState({...history.state,[F]:++k,[H]:L},"",location.href)):E.hash&&_.url.hash===location.hash&&Y({type:"goto",url:_.url})});for(const n of document.querySelectorAll("link"))bn.has(n.rel)&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&$.navigating.set(X.current=null)});function t(n){_.url=w.url=n,$.page.set({data:w.data,error:w.error,form:w.form,params:w.params,route:w.route,state:w.state,status:w.status,url:n}),$.page.notify()}}async function Tn(t,{status:e=200,error:n,node_ids:r,params:a,route:o,data:i,form:s}){qt=!0;const c=new URL(location.href);({params:a={},route:o={id:null}}=Wt(c,!1)||{});let l,h=!0;try{const d=r.map(async(g,f)=>{const p=i[f];return p!=null&&p.uses&&(p.uses=Ce(p.uses)),Ht({loader:E.nodes[g],url:c,params:a,route:o,parent:async()=>{const S={};for(let I=0;I<f;I+=1)Object.assign(S,(await d[I]).data);return S},server_data_node:Kt(p)})}),y=await Promise.all(d),u=St.find(({id:g})=>g===o.id);if(u){const g=u.layouts;for(let f=0;f<g.length;f++)g[f]||y.splice(f,0,void 0)}l=_t({url:c,params:a,branch:y,status:e,error:n,form:s,route:u??null})}catch(d){if(d instanceof we){await K(new URL(d.location,location.href));return}l=await Et({status:dt(d),error:await M(d,{url:c,params:a,route:o}),url:c,route:o}),t.textContent="",h=!1}l.props.page&&(l.props.page.state={}),Ie(l,t,h)}async function Pe(t,e){var a;const n=new URL(t);n.pathname=He(t.pathname),t.pathname.endsWith("/")&&n.searchParams.append(yn,"1"),n.searchParams.append(mn,e.map(o=>o?"1":"0").join(""));const r=await fe(n.href);if(!r.ok){let o;throw(a=r.headers.get("content-type"))!=null&&a.includes("application/json")?o=await r.json():r.status===404?o="Not Found":r.status===500&&(o="Internal Error"),new bt(r.status,o)}return new Promise(async o=>{var d;const i=new Map,s=r.body.getReader(),c=new TextDecoder;function l(y){return dn(y,{...E.decoders,Promise:u=>new Promise((g,f)=>{i.set(u,{fulfil:g,reject:f})})})}let h="";for(;;){const{done:y,value:u}=await s.read();if(y&&!h)break;for(h+=!u&&h?`
`:c.decode(u,{stream:!0});;){const g=h.indexOf(`
`);if(g===-1)break;const f=JSON.parse(h.slice(0,g));if(h=h.slice(g+1),f.type==="redirect")return o(f);if(f.type==="data")(d=f.nodes)==null||d.forEach(p=>{(p==null?void 0:p.type)==="data"&&(p.uses=Ce(p.uses),p.data=l(p.data))}),o(f);else if(f.type==="chunk"){const{id:p,data:S,error:I}=f,v=i.get(p);i.delete(p),I?v.reject(l(I)):v.fulfil(l(S))}}}})}function Ce(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url),search_params:new Set((t==null?void 0:t.search_params)??[])}}function xn(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0,focusVisible:!1}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let o=0;o<r.rangeCount;o+=1)a.push(r.getRangeAt(o));setTimeout(()=>{if(r.rangeCount===a.length){for(let o=0;o<r.rangeCount;o+=1){const i=a[o],s=r.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}r.removeAllRanges()}})}}}function Ne(t,e,n,r){var c,l;let a,o;const i=new Promise((h,d)=>{a=h,o=d});return i.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((c=t.route)==null?void 0:c.id)??null},url:t.url},to:n&&{params:(e==null?void 0:e.params)??null,route:{id:((l=e==null?void 0:e.route)==null?void 0:l.id)??null},url:n},willUnload:!e,type:r,complete:i},fulfil:a,reject:o}}export{Vn as a,Fn as b,Un as g,w as p,$ as s,xt as u,$t as w};