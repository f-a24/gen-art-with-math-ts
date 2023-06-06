import{i as _,p as C}from"./common-59d4c3ce.js";import{G as y}from"./lil-gui.esm-fc0b5e43.js";import"./_commonjsHelpers-725317a4.js";const p=()=>(_("循環連分数への収束"),globalP5Instance=new C(e=>{e.setup=()=>{let n=1;const a=(1+Math.sqrt(1*1+4))/2;e.createCanvas(500,200);const g=e.map(a,1,1+1,0,e.height);e.stroke(255,0,0),e.line(0,g,e.width,g);const o=e.width/10;e.stroke(0);for(let t=0;t<10;t++){const v=1+1/n,l=e.map(n,1,1+1,0,e.height),s=e.map(v,1,1+1,0,e.height);e.line(t*o,l,(t+1)*o,s),n=v}}}),""),ee=()=>(_("フィボナッチ数列の可視化"),globalP5Instance=new C(e=>{let r=[0,1];const c=()=>{let n=0,a=0;const g=r[r.length-2]+r[r.length-1],o=e.width/g;e.background(0,0,1);for(let t=1;t<r.length;t++)e.fill(.1*t%1,1,1),e.rect(o*n,o*a,o*r[t],o*r[t]),t%2==1?(n+=r[t],a-=r[t-1]):(n-=r[t-1],a+=r[t])};e.setup=()=>{e.createCanvas(500,500),e.colorMode("hsb",1),c()},e.mouseClicked=()=>{const n=r[r.length-2]+r[r.length-1];r=e.append(r,n),c(),console.log(n)}}),""),re=()=>(_("正方形の敷き詰めによるフィボナッチ長方形"),globalP5Instance=new C(e=>{let r=[0,1,1];const c=()=>{const n=[-1,1,1,-1];let a=0,g=0;const o=e.width/(2*r[r.length-1]);e.background(0,0,1),e.translate(e.width/2,e.height/2);for(let t=1;t<r.length-1;t++)e.fill(.1*t%1,1,1),e.rect(o*a,o*g,o*n[(t+1)%4]*r[t],o*n[t%4]*r[t]),t%2==1?a+=n[t%4]*(r[t]+r[t+1]):g+=n[t%4]*(r[t]+r[t+1])};e.setup=()=>{e.createCanvas(500,500),e.colorMode("hsb",1),c()},e.draw=()=>{},e.mouseClicked=()=>{const n=r[r.length-2]+r[r.length-1];r=e.append(r,n),c(),console.log(n)}}),""),te=()=>(_("フィボナッチ長方形の敷き詰めによる正方形"),globalP5Instance=new C(e=>{let r=[0,1,1];const c=()=>{const n=[-1,1,1,-1];let a=0,g=0;const o=e.width/(2*r[r.length-1]);e.background(0,0,1),e.translate(e.width/2,e.height/2);for(let t=1;t<r.length-1;t++)e.fill(.1*t%1,1,1),e.rect(o*a,o*g,o*n[(t+1)%4]*r[t-1],o*n[t%4]*r[t]),t%2==1?a+=n[t%4]*(r[t-1]+r[t]):g+=n[t%4]*(r[t]+r[t+1])};e.setup=()=>{e.createCanvas(500,500),e.colorMode("hsb",1),c()},e.draw=()=>{},e.mouseClicked=()=>{const n=r[r.length-2]+r[r.length-1];r=e.append(r,n),c(),console.log(n)}}),""),ne=()=>(_("再帰的なフィボナッチ分割"),globalP5Instance=new C(e=>{let r=10,c=1,n;const a=[1,1,-1,-1],g=l=>{n=[0,1];for(let s=1;s<l;s++)n=e.append(n,n[s-1]+n[s]);n=e.reverse(n)},o=(l,s,i,h,S)=>{const m=e.width/n[0];e.fill(S*1/r%1,1,1),e.rect(m*l,m*s,m*i,m*h)},t=(l,s,i,h,S,m)=>{for(let d=0;d<r-i;d++){const b=n[d+i],u=S*a[(d+1)%4],w=m*a[d%4];o(l,s,u*b,w*b,i+d),l+=u*b,s+=w*b,h<c&&v(l,s,i+d,h+1,-u,-w)}},v=(l,s,i,h,S,m)=>{for(let d=0;d<r-i;d++){const b=n[d+i+1],u=n[d+i],w=S*a[d%4],f=m*a[(d+1)%4];o(l,s,w*b,f*u,i+d+1),l+=w*b,s+=f*u,h<c&&t(l,s,d+i+1,h+1,-w,-f)}};e.setup=()=>{e.createCanvas(500,500),e.colorMode("hsb",1),e.background(0,0,1),g(r),v(0,0,0,0,1,1)},e.mouseClicked=()=>{r=Math.trunc(e.random(2,10)),c=Math.trunc(e.random(0,9)),console.log("num =",r,"thr =",c),e.background(0,0,1),g(r),v(0,0,0,0,1,1)}}),""),oe=()=>(_("再帰的なフィボナッチ分割のGUIプログラム"),globalP5Instance=new C(e=>{let r;const c=[1,1,-1,-1],n={num:10,thr:0},a=()=>{gui=new y,gui.add(n,"num",1,20),gui.add(n,"thr",0,9)},g=l=>{r=[0,1];for(let s=1;s<l;s++)r=e.append(r,r[s-1]+r[s]);r=e.reverse(r)},o=(l,s,i,h,S)=>{const m=e.width/r[0];e.fill(S*1/n.num%1,1,1),e.rect(m*l,m*s,m*i,m*h)},t=(l,s,i,h,S,m)=>{const{num:d,thr:b}=n;for(let u=0;u<d-i;u++){const w=r[u+i],f=S*c[(u+1)%4],k=m*c[u%4];o(l,s,f*w,k*w,i+u),l+=f*w,s+=k*w,h<b&&v(l,s,i+u,h+1,-f,-k)}},v=(l,s,i,h,S,m)=>{const{num:d,thr:b}=n;for(let u=0;u<d-i;u++){const w=r[u+i+1],f=r[u+i],k=S*c[u%4],F=m*c[(u+1)%4];o(l,s,k*w,F*f,i+u+1),l+=k*w,s+=F*f,h<b&&t(l,s,i+u+1,h+1,-k,-F)}};e.setup=()=>{e.createCanvas(500,500),a()},e.draw=()=>{g(n.num),e.colorMode("hsb",1),e.background(0,0,1),v(0,0,0,0,1,1)}}),""),se=()=>(_("フィボナッチらせんを描く"),globalP5Instance=new C(e=>{let r=[0,1,1];const c=[-1,1,1,-1],n=()=>{let a=0,g=0;const o=e.width/(2*r[r.length-1]);e.background(0,0,1),e.translate(e.width/2,e.height/2);for(let t=1;t<r.length-1;t++)e.stroke(0,0,0),e.rect(o*a,o*g,o*c[(t+1)%4]*r[t],o*c[t%4]*r[t]),e.stroke(0,1,1),e.arc(o*(a+c[(t+1)%4]*r[t]),o*(g+c[t%4]*r[t]),o*2*r[t],o*2*r[t],(1+t)*e.PI/2,(2+t)*e.PI/2),t%2==1?a+=c[t%4]*(r[t]+r[t+1]):g+=c[t%4]*(r[t]+r[t+1])};e.setup=()=>{e.createCanvas(500,500),e.colorMode("hsb",1),n()},e.draw=()=>{},e.mouseClicked=()=>{const a=r[r.length-2]+r[r.length-1];r=e.append(r,a),n(),console.log(a)}}),""),ie={title:"Chapter03：フィボナッチ数列"},I={render:p},q={render:ee},G={render:re},R={render:te},M={render:ne},x={render:oe},D={render:se};var P,U,N;I.parameters={...I.parameters,docs:{...(P=I.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: convergent
}`,...(N=(U=I.parameters)==null?void 0:U.docs)==null?void 0:N.source}}};var X,Y,E;q.parameters={...q.parameters,docs:{...(X=q.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: square
}`,...(E=(Y=q.parameters)==null?void 0:Y.docs)==null?void 0:E.source}}};var O,j,z;G.parameters={...G.parameters,docs:{...(O=G.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: squareSpiral
}`,...(z=(j=G.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var A,B,H;R.parameters={...R.parameters,docs:{...(A=R.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: rect
}`,...(H=(B=R.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var J,K,L;M.parameters={...M.parameters,docs:{...(J=M.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: recurDiv
}`,...(L=(K=M.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var Q,T,V;x.parameters={...x.parameters,docs:{...(Q=x.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: recurDivGUI
}`,...(V=(T=x.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var W,Z,$;D.parameters={...D.parameters,docs:{...(W=D.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: spiral
}`,...($=(Z=D.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const ue=["Convergent","Square","SquareSpiral","Rect","RecurDiv","RecurDivGUI","Spiral"];export{I as Convergent,R as Rect,M as RecurDiv,x as RecurDivGUI,D as Spiral,q as Square,G as SquareSpiral,ue as __namedExportsOrder,ie as default};
//# sourceMappingURL=chapter03.stories-452087d6.js.map
