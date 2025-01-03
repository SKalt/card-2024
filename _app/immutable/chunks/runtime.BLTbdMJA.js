var Fn=Array.isArray,Ln=Array.from,Mn=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyDescriptors,Hn=Object.prototype,Yn=Array.prototype,Xt=Object.getPrototypeOf;const jn=()=>{};function Bn(t){return t()}function wt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,mt=4,Y=8,ut=16,T=32,J=64,nt=128,D=256,G=512,h=1024,x=2048,j=4096,b=8192,q=16384,Qt=32768,Tt=65536,Un=1<<17,tn=1<<19,At=1<<20,ht=Symbol("$state"),Vn=Symbol("legacy props"),Gn=Symbol("");function gt(t){return t===this.v}function nn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function xt(t){return!nn(t,this.v)}function rn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function en(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function sn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function ln(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Kn(){throw new Error("https://svelte.dev/e/hydration_failed")}function $n(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Zn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function zn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function an(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function un(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let W=!1;function Jn(){W=!0}const Wn=1,Xn=2,Qn=4,tr=8,nr=16,rr=1,er=2,sr=4,lr=8,ar=16,ur=1,or=2,on="[",fn="[!",_n="]",kt={},ir=Symbol();function ot(t,n){var r={f:0,v:t,reactions:null,equals:gt,version:0};return r}function fr(t){return cn(ot(t))}function _r(t,n=!1){var e;const r=ot(t);return n||(r.equals=xt),W&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function cn(t){return o!==null&&o.f&y&&(m===null?Rn([t]):m.push(t)),t}function cr(t,n){return o!==null&&_t()&&o.f&(y|ut)&&(m===null||!m.includes(t))&&un(),vn(t,n)}function vn(t,n){return t.equals(n)||(t.v=n,t.version=Gt(),It(t,x),_t()&&u!==null&&u.f&h&&!(u.f&T)&&(v!==null&&v.includes(t)?(A(u,x),tt(u)):g===null?Sn([t]):g.push(t))),n}function It(t,n){var r=t.reactions;if(r!==null)for(var e=_t(),s=r.length,l=0;l<s;l++){var a=r[l],f=a.f;f&x||!e&&a===u||(A(a,n),f&(h|D)&&(f&y?It(a,j):tt(a)))}}function Rt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let R=!1;function vr(t){R=t}let w;function F(t){if(t===null)throw Rt(),kt;return w=t}function pr(){return F(C(w))}function hr(t){if(R){if(C(w)!==null)throw Rt(),kt;w=t}}function dr(t=1){if(R){for(var n=t,r=w;n--;)r=C(r);w=r}}function Er(){for(var t=0,n=w;;){if(n.nodeType===8){var r=n.data;if(r===_n){if(t===0)return n;t-=1}else(r===on||r===fn)&&(t+=1)}var e=C(n);n.remove(),n=e}}var dt,pn,St,Dt;function yr(){if(dt===void 0){dt=window,pn=document;var t=Element.prototype,n=Node.prototype;St=pt(n,"firstChild").get,Dt=pt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function rt(t=""){return document.createTextNode(t)}function et(t){return St.call(t)}function C(t){return Dt.call(t)}function wr(t,n){if(!R)return et(t);var r=et(w);if(r===null)r=w.appendChild(rt());else if(n&&r.nodeType!==3){var e=rt();return r==null||r.before(e),F(e),e}return F(r),r}function mr(t,n){if(!R){var r=et(t);return r instanceof Comment&&r.data===""?C(r):r}return w}function Tr(t,n=1,r=!1){let e=R?w:t;for(var s;n--;)s=e,e=C(e);if(!R)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=rt();return e===null?s==null||s.after(a):e.before(a),F(a),a}return F(e),e}function Ar(t){t.textContent=""}function hn(t){var n=y|x;u===null?n|=D:u.f|=At;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:i,deps:null,equals:gt,f:n,fn:t,reactions:null,v:null,version:0,parent:r??u};return r!==null&&(r.children??(r.children=[])).push(e),e}function gr(t){const n=hn(t);return n.equals=xt,n}function Ct(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?it(e):S(e)}}}function dn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Ot(t){var n,r=u;z(dn(t));try{Ct(t),n=Kt(t)}finally{z(r)}return n}function Nt(t){var n=Ot(t),r=(I||t.f&D)&&t.deps!==null?j:h;A(t,r),t.equals(n)||(t.v=n,t.version=Gt())}function it(t){Ct(t),H(t,0),A(t,q),t.v=t.children=t.deps=t.ctx=t.reactions=null}function bt(t){u===null&&o===null&&sn(),o!==null&&o.f&D&&en(),ft&&rn()}function En(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function P(t,n,r,e=!0){var s=(t&J)!==0,l=u,a={ctx:i,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|x,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var f=O;try{Et(!0),Q(a),a.f|=Qt}catch(_){throw S(a),_}finally{Et(f)}}else n!==null&&tt(a);var p=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&At)===0;if(!p&&!s&&e&&(l!==null&&En(a,l),o!==null&&o.f&y)){var d=o;(d.children??(d.children=[])).push(a)}return a}function xr(t){const n=P(Y,null,!1);return A(n,h),n.teardown=t,n}function kr(t){bt();var n=u!==null&&(u.f&T)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=qt(t);return e}}function Ir(t){return bt(),yn(t)}function Rr(t){const n=P(J,t,!0);return(r={})=>new Promise(e=>{r.outro?Tn(n,()=>{S(n),e(void 0)}):(S(n),e(void 0))})}function qt(t){return P(mt,t,!1)}function yn(t){return P(Y,t,!0)}function Sr(t){return wn(t)}function wn(t,n=0){return P(Y|ut|n,t,!0)}function Dr(t,n=!0){return P(Y|T,t,!0,n)}function Pt(t){var n=t.teardown;if(n!==null){const r=ft,e=o;yt(!0),Z(null);try{n.call(null)}finally{yt(r),Z(e)}}}function Ft(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)it(n[r])}}function Lt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;S(r,n),r=e}}function mn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&T||S(n),n=r}}function S(t,n=!0){var r=!1;if((n||t.f&tn)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:C(e);e.remove(),e=l}r=!0}Lt(t,n&&!r),Ft(t),H(t,0),A(t,q);var a=t.transitions;if(a!==null)for(const p of a)p.stop();Pt(t);var f=t.parent;f!==null&&f.first!==null&&Mt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Mt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Tn(t,n){var r=[];Ht(t,r,!0),An(r,()=>{S(t),n&&n()})}function An(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Ht(t,n,r){if(!(t.f&b)){if(t.f^=b,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&Tt)!==0||(e.f&T)!==0;Ht(e,n,l?r:!1),e=s}}}function Cr(t){Yt(t,!0)}function Yt(t,n){if(t.f&b){B(t)&&Q(t),t.f^=b;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Tt)!==0||(r.f&T)!==0;Yt(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const gn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let K=!1,$=!1,st=[],lt=[];function jt(){K=!1;const t=st.slice();st=[],wt(t)}function Bt(){$=!1;const t=lt.slice();lt=[],wt(t)}function Or(t){K||(K=!0,queueMicrotask(jt)),st.push(t)}function Nr(t){$||($=!0,gn(Bt)),lt.push(t)}function xn(){K&&jt(),$&&Bt()}function kn(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const Ut=0,In=1;let U=!1,V=Ut,L=!1,M=null,O=!1,ft=!1;function Et(t){O=t}function yt(t){ft=t}let k=[],N=0;let o=null;function Z(t){o=t}let u=null;function z(t){u=t}let m=null;function Rn(t){m=t}let v=null,E=0,g=null;function Sn(t){g=t}let Vt=1,I=!1,i=null;function Gt(){return++Vt}function _t(){return!W||i!==null&&i.l===null}function B(t){var a,f;var n=t.f;if(n&x)return!0;if(n&j){var r=t.deps,e=(n&D)!==0;if(r!==null){var s;if(n&G){for(s=0;s<r.length;s++)((a=r[s]).reactions??(a.reactions=[])).push(t);t.f^=G}for(s=0;s<r.length;s++){var l=r[s];if(B(l)&&Nt(l),e&&u!==null&&!I&&!((f=l==null?void 0:l.reactions)!=null&&f.includes(t))&&(l.reactions??(l.reactions=[])).push(t),l.version>t.version)return!0}}(!e||u!==null&&!I)&&A(t,h)}return!1}function Dn(t,n){for(var r=n;r!==null;){if(r.f&nt)try{r.fn(t);return}catch{r.f^=nt}r=r.parent}throw U=!1,t}function Cn(t){return(t.f&q)===0&&(t.parent===null||(t.parent.f&nt)===0)}function X(t,n,r,e){if(U){if(r===null&&(U=!1),Cn(n))throw t;return}r!==null&&(U=!0);{Dn(t,n);return}}function Kt(t){var vt;var n=v,r=E,e=g,s=o,l=I,a=m,f=i,p=t.f;v=null,E=0,g=null,o=p&(T|J)?null:t,I=!O&&(p&D)!==0,m=null,i=t.ctx;try{var d=(0,t.fn)(),_=t.deps;if(v!==null){var c;if(H(t,E),_!==null&&E>0)for(_.length=E+v.length,c=0;c<v.length;c++)_[E+c]=v[c];else t.deps=_=v;if(!I)for(c=E;c<_.length;c++)((vt=_[c]).reactions??(vt.reactions=[])).push(t)}else _!==null&&E<_.length&&(H(t,E),_.length=E);return d}finally{v=n,E=r,g=e,o=s,I=l,m=a,i=f}}function On(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(v===null||!v.includes(n))&&(A(n,j),n.f&(D|G)||(n.f^=G),H(n,0))}function H(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)On(t,r[e])}function Q(t){var n=t.f;if(!(n&q)){A(t,h);var r=u,e=i;u=t;try{n&ut?mn(t):Lt(t),Ft(t),Pt(t);var s=Kt(t);t.teardown=typeof s=="function"?s:null,t.version=Vt}catch(l){X(l,t,r,e||t.ctx)}finally{u=r}}}function $t(){if(N>1e3){N=0;try{ln()}catch(t){if(M!==null)X(t,M,null);else throw t}}N++}function Zt(t){var n=t.length;if(n!==0){$t();var r=O;O=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&h||(s.f^=h);var l=[];zt(s,l),Nn(l)}}finally{O=r}}}function Nn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(q|b)))try{B(e)&&(Q(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Mt(e):e.fn=null))}catch(s){X(s,e,null,e.ctx)}}}function bn(){if(L=!1,N>1001)return;const t=k;k=[],Zt(t),L||(N=0,M=null)}function tt(t){V===Ut&&(L||(L=!0,queueMicrotask(bn))),M=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(J|T)){if(!(r&h))return;n.f^=h}}k.push(n)}function zt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&T)!==0,a=l&&(s&h)!==0,f=r.next;if(!a&&!(s&b))if(s&Y){if(l)r.f^=h;else try{B(r)&&Q(r)}catch(c){X(c,r,null,r.ctx)}var p=r.first;if(p!==null){r=p;continue}}else s&mt&&e.push(r);if(f===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var d=c.next;if(d!==null){r=d;continue t}c=c.parent}}r=f}for(var _=0;_<e.length;_++)p=e[_],n.push(p),zt(p,n)}function Jt(t){var n=V,r=k;try{$t();const s=[];V=In,k=s,L=!1,Zt(r);var e=t==null?void 0:t();return xn(),(k.length>0||s.length>0)&&Jt(),N=0,M=null,e}finally{V=n,k=r}}async function br(){await Promise.resolve(),Jt()}function qr(t){var _;var n=t.f,r=(n&y)!==0;if(r&&n&q){var e=Ot(t);return it(t),e}if(o!==null){m!==null&&m.includes(t)&&an();var s=o.deps;v===null&&s!==null&&s[E]===t?E++:v===null?v=[t]:v.push(t),g!==null&&u!==null&&u.f&h&&!(u.f&T)&&g.includes(t)&&(A(u,x),tt(u))}else if(r&&t.deps===null)for(var l=t,a=l.parent,f=l;a!==null;)if(a.f&y){var p=a;f=p,a=p.parent}else{var d=a;(_=d.deriveds)!=null&&_.includes(f)||(d.deriveds??(d.deriveds=[])).push(f);break}return r&&(l=t,B(l)&&Nt(l)),t.v}function Pr(t){const n=o;try{return o=null,t()}finally{o=n}}const qn=~(x|j|h);function A(t,n){t.f=t.f&qn|n}function Fr(t){return ct().get(t)}function Lr(t,n){return ct().set(t,n),n}function Mr(t){return ct().has(t)}function ct(t){return i===null&&kn(),i.c??(i.c=new Map(Pn(i)||void 0))}function Pn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function Hr(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},W&&!n&&(i.l={s:null,u:null,r1:[],r2:ot(!1)})}function Yr(t){const n=i;if(n!==null){const a=n.e;if(a!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];z(l.effect),Z(l.reaction),qt(l.fn)}}finally{z(r),Z(e)}}i=n.p,n.m=!0}return{}}function jr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ht in t)at(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ht in r&&at(r)}}}function at(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{at(t[e],n)}catch{}const r=Xt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Wt(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{pn as $,F as A,vr as B,Cr as C,Tn as D,Tt as E,Jn as F,cr as G,fn as H,fr as I,Hn as J,Yn as K,ot as L,Zn as M,pt as N,u as O,zn as P,Xt as Q,Fn as R,ht as S,qt as T,ir as U,yn as V,Or as W,$n as X,Un as Y,sr as Z,xt as _,Yr as a,T as a0,J as a1,z as a2,rr as a3,er as a4,lr as a5,Vn as a6,gr as a7,ar as a8,_r as a9,b as aA,Wn as aB,vn as aC,Xn as aD,Ht as aE,An as aF,Qn as aG,tr as aH,nr as aI,Nr as aJ,Gn as aK,Wt as aL,_t as aM,nn as aN,rt as aa,et as ab,ur as ac,or as ad,Z as ae,o as af,xr as ag,Mn as ah,tn as ai,on as aj,C as ak,yr as al,kt as am,_n as an,Rt as ao,Kn as ap,Ar as aq,Ln as ar,Rr as as,Jt as at,br as au,Lr as av,Mr as aw,Fr as ax,dt as ay,dr as az,kr as b,wr as c,i as d,Pr as e,mr as f,Bn as g,wt as h,qr as i,jr as j,hn as k,wn as l,Dr as m,jn as n,S as o,Hr as p,R as q,hr as r,Tr as s,Sr as t,Ir as u,w as v,kn as w,W as x,pr as y,Er as z};