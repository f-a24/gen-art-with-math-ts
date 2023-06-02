import{i as f,p as v,a as C}from"./common-9d5f0eb9.js";const B=()=>(f("ユークリッド互除法の計算を行う"),globalP5Instance=new v(t=>{t.setup=()=>{t.createCanvas(850,170),[[10,6],[6,9],[6,15],[21,17],[18,20]].forEach((h,a)=>{let l=h[0],r=h[1],c,e=r,i=0;for(t.textSize(20),t.text(`a = ${l}, b = ${r}`,a*170,30),t.textSize(16);e>0;)i++,c=l/r|0,e=l%r,t.text(`${i} : ${l} / ${r} = ${c}...${e}`,a*170,i*30+30),l=r,r=e;t.textSize(20),t.text(`GCD is ${l}`,a*170,(i+1)*30+30)})}}),""),d=()=>(f("長方形の分割によるユークリッド互除法の可視化"),globalP5Instance=new v(t=>{t.setup=()=>{t.createCanvas(500,500);const u=50,h=10*u,a=6*u;let l=a,r=0,c=0,e=0;for(;l>0;)if(e++,e%2===1){for(;r+l<=h;)t.rect(r,c,l,l),r+=l;l=h-r}else{for(;c+l<=a;)t.rect(r,c,l,l),c+=l;l=a-c}}}),""),E=()=>(f("Div Rectを着彩したもの"),globalP5Instance=new v(t=>{t.setup=()=>{t.createCanvas(500,500);const u=50,h=10*u,a=6*u;let l=a,r=0,c=0,e=0,i;for(t.colorMode("hsb",1);l>0;)if(e++,e%2===1){for(;r+l<=h;)i=t.color(t.random(1),1,1),t.fill(i),t.rect(r,c,l,l),r+=l;l=h-r}else{for(;c+l<=a;)i=t.color(t.random(1),1,1),t.fill(i),t.rect(r,c,l,l),c+=l;l=a-c}}}),""),I=()=>(f("長方形による正方形の分割"),globalP5Instance=new v(t=>{t.setup=()=>{t.createCanvas(500,500),t.colorMode("hsb",1);const a=7/16;let l=0,r=0,c=0,e=t.width;for(;e>0;)if(c++,c%2===1){for(;l+e*a<t.width+.1;)t.fill(t.color(t.random(1),1,1)),t.rect(l,r,e*a,e),l+=e*a;e=t.width-l}else{for(;r+e/a<t.width+.1;)t.fill(t.color(t.random(1),1,1)),t.rect(l,r,e,e/a),r+=e/a;e=t.width-r}}}),""),S=()=>(f("長方形の長方形による分割"),globalP5Instance=new v(t=>{const l=(r,c,e)=>{let i=0;const n=e+r,s=e+c;for(;e>.1;)if(i++,i%2==1){for(;r+e*.6<n+.1;)t.fill(t.color(t.random(1),1,1)),t.rect(r,c,e*.6,e),r+=e*.6;e=n-r}else{for(;c+e/.6<s+.1;)t.fill(t.color(t.random(1),1,1)),t.rect(r,c,e,e/.6),c+=e/.6;e=s-c}};t.setup=()=>{t.createCanvas(500,500),t.colorMode("hsb",1);let r=0,c=0,e=0,i=t.width*.6;for(;i>.1;)if(r++,r%2==1){for(;c+i<t.width+.1;)l(c,e,i),c+=i;i=t.width-c}else{for(;e+i<t.width*.6+.1;)l(c,e,i),e+=i;i=t.width*.6-e}}}),""),M=()=>(f("正方形の再帰的な分割"),globalP5Instance=new v(t=>{let u=10,h=6,a=h/u,l=160;const r=(e,i,n)=>{let s=0;const o=e+n,m=i+n/a;for(t.fill(t.color(t.random(1),1,1)),t.rect(e,i,n,n/a);n>l;)if(s++,s%2==0){for(;e+n<o+.1;)c(e,i,n),e+=n;n=o-e}else{for(;i+n<m+.1;)c(e,i,n),i+=n;n=m-i}},c=(e,i,n)=>{let s=0;const o=n+e,m=n+i;for(t.fill(t.color(t.random(1),1,1)),t.rect(e,i,n,n);n>l;)if(s++,s%2==1){for(;e+n*a<o+.1;)r(e,i,n*a),e+=n*a;n=o-e}else{for(;i+n/a<m+.1;)r(e,i,n),i+=n/a;n=m-i}};t.setup=()=>{t.createCanvas(500,500),t.colorMode("hsb",1),c(0,0,t.width)},t.mouseClicked=()=>{for(u=Math.trunc(t.random(1,20)),h=Math.trunc(t.random(1,20));u===h;)h=Math.trunc(t.random(1,20));l=Math.trunc(t.random(10,300)),console.log("numA =",u,"numB =",h,"thr =",l),a=u/h,t.background(0,0,1),t.fill(0,0,0),c(0,0,t.width)}}),""),$=()=>(f("Recur Div SquareのGUIプログラム"),globalP5Instance=new v(t=>{const u={numA:10,numB:6,thr:100,changeColor(){for(let n=0;n<a.length;n++)a[n]=t.random(1)}};let h=u.numA/u.numB,a=[0],l=0;const r=()=>{a.length<=l&&(a=t.append(a,t.random(1))),t.fill(t.color(a[l],1,1)),l++},c=(n,s,o)=>{let m=0;const g=n+o,b=s+o/h;for(r(),t.rect(n,s,o,o/h);o>u.thr;)if(m++,m%2==0){for(;n+o<g+.1;)e(n,s,o),n+=o;o=g-n}else{for(;s+o<b+.1;)e(n,s,o),s+=o;o=b-s}},e=(n,s,o)=>{let m=0;const g=o+n,b=o+s;for(r(),t.rect(n,s,o,o);o>u.thr;)if(m++,m%2==1){for(;n+o*h<g+.1;)c(n,s,o*h),n+=o*h;o=g-n}else{for(;s+o/h<b+.1;)c(n,s,o),s+=o/h;o=b-s}},i=()=>{gui=new C.GUI,gui.add(u,"numA",1,40,1),gui.add(u,"numB",1,40,1),gui.add(u,"thr",10,300,30),gui.add(u,"changeColor")};t.setup=()=>{t.createCanvas(500,500),t.colorMode("hsb",1),i()},t.draw=()=>{t.background(1,0,1),h=u.numB/u.numA,l=0,h!==1&&e(0,0,t.width)}}),"");export{E as a,I as b,M as c,d,$ as e,B as n,S as r};
//# sourceMappingURL=chapter01-06481f44.js.map
