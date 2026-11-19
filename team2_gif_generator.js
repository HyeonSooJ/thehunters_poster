
const P=globalThis.__GIFP;
const logoSrc=await readImage('uploads/pasted-1786768762873-0.png');
const lc=createCanvas(logoSrc.width,logoSrc.height),lx=lc.getContext('2d');lx.drawImage(logoSrc,0,0);
const ld=lx.getImageData(0,0,lc.width,lc.height);for(let i=0;i<ld.data.length;i+=4){ld.data[i]=255-ld.data[i];ld.data[i+1]=255-ld.data[i+1];ld.data[i+2]=255-ld.data[i+2];}lx.putImageData(ld,0,0);
const F="'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif";
const RED='#e74c3c',CH='#e74c3c',BG='#000',GOLD='#F0B90B';
const vals=P.vals,dates=P.dates,dy=P.dy;
const NP=vals.length-1;
const D=22,CT=190,PX0=56,PX1=338;
const FINAL='더헌터스는 기여하면 반드시 혜택이 주어집니다';
const W1=370,H1=622+D;
const pal=[];const ramp=(r,g,b,n,tr,tg,tb)=>{for(let i=0;i<n;i++){const t=i/(n-1);pal.push([Math.round(r+(tr-r)*t),Math.round(g+(tg-g)*t),Math.round(b+(tb-b)*t)]);}};
ramp(255,255,255,100,0,0,0);ramp(0xe7,0x4c,0x3c,80,0,0,0);ramp(0xc0,0x39,0x2b,36,255,255,255);ramp(0xF0,0xB9,0x0B,40,0,0,0);
const lut=new Uint8Array(32768);
for(let r=0;r<32;r++)for(let g=0;g<32;g++)for(let b=0;b<32;b++){const R_=r*8+4,G_=g*8+4,B_=b*8+4;let best=0,bd=1e9;for(let i=0;i<256;i++){const p=pal[i];const dd=(p[0]-R_)*(p[0]-R_)+(p[1]-G_)*(p[1]-G_)+(p[2]-B_)*(p[2]-B_);if(dd<bd){bd=dd;best=i;}}lut[(r<<10)|(g<<5)|b]=best;}
const codes=new Int16Array(4096*256),stamp=new Int32Array(4096*256);let gen=1;const lb=new Uint8Array(2<<20);
function lzw(px_,len){let bn=0,cur=0,bits=0,codeSize=9,next=258,clearFlg=false;gen++;
  const write=cd=>{cur|=cd<<bits;bits+=codeSize;while(bits>=8){lb[bn++]=cur&255;cur>>>=8;bits-=8;}
    if(clearFlg){codeSize=9;clearFlg=false;}else if(next>(1<<codeSize)-1&&codeSize<12)codeSize++;};
  write(256);let prefix=px_[0];
  for(let i=1;i<len;i++){const kk=px_[i];const key=(prefix<<8)|kk;if(stamp[key]===gen){prefix=codes[key];continue;}
    write(prefix);if(next<4096){stamp[key]=gen;codes[key]=next++;}else{gen++;next=258;clearFlg=true;write(256);}prefix=kk;}
  write(prefix);write(257);if(bits>0)lb[bn++]=cur&255;return bn;}
const S=1.3;const W=Math.round(W1*S),H=Math.round(H1*S);
const c=createCanvas(W,H),x=c.getContext('2d');
function font(sz,b,w){x.font=(w||(b?'bold':'normal'))+' '+sz+'px '+F;}
function card(cx0,cy0,w,h,light,tag,tagCol,main,subt,scale){
  x.save();const mx=cx0+w/2,my=cy0+h/2;x.translate(mx,my);x.scale(scale,scale);x.translate(-mx,-my);
  if(light){x.fillStyle='#fff';x.fillRect(cx0,cy0,w,h);}else{x.fillStyle=BG;x.fillRect(cx0,cy0,w,h);x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(cx0+1,cy0+1,w-2,h-2);}
  x.textAlign='center';const m=cx0+w/2;
  font(9,true);x.fillStyle=tagCol;x.fillText(tag,m,cy0+17);
  font(15,true);x.fillStyle=light?'#000':'#fff';x.fillText(main,m,cy0+37);
  font(10.5,false);x.fillStyle=light?'#333':'#ccc';x.fillText(subt,m,cy0+54);
  x.restore();}
function borderDraw(bx,by,bw,bh,p){
  if(p<=0)return;const pts=[[bx,by],[bx+bw,by],[bx+bw,by+bh],[bx,by+bh],[bx,by]];const per=2*(bw+bh);let L=per*Math.min(1,p);
  x.strokeStyle=RED;x.lineWidth=3;x.lineCap='square';x.beginPath();x.moveTo(bx,by);let tip=[bx,by];
  for(let i=0;i<4;i++){const a=pts[i],b=pts[i+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(L>=len){x.lineTo(b[0],b[1]);L-=len;tip=b;}else{tip=[a[0]+(b[0]-a[0])*L/len,a[1]+(b[1]-a[1])*L/len];x.lineTo(tip[0],tip[1]);break;}}
  x.stroke();x.lineCap='butt';
  if(p<1){x.fillStyle='rgba(231,76,60,0.4)';x.beginPath();x.arc(tip[0],tip[1],5,0,7);x.fill();x.fillStyle=RED;x.beginPath();x.arc(tip[0],tip[1],2.4,0,7);x.fill();}}
const L1=P.L1,L2a=P.L2a,L2b=P.L2b;
let fs=9;
function draw(st){
  x.setTransform(1,0,0,1,0,0);x.fillStyle=BG;x.fillRect(0,0,W,H);x.setTransform(S,0,0,S,0,0);x.globalAlpha=1;
  x.strokeStyle='#fff';x.lineWidth=2.5;x.strokeRect(1.25,1.25,W1-2.5,H1-2.5);
  x.drawImage(lc,18,18,44,44);
  x.fillStyle='#fff';font(17,true);x.textAlign='left';try{x.letterSpacing='1px';}catch(e){}x.fillText('THEHUNTERS',70,46);try{x.letterSpacing='0px';}catch(e){}
  font(30,true);x.fillText('더헌터스 자산운용2팀',18,100);
  font(14,true);const l1=P.sub;const tw=x.measureText(l1).width;
  font(40,true);const nw=x.measureText(P.big).width;const sx=(W1-(tw+10+nw))/2;
  font(14,true);x.fillStyle='#eee';x.fillText(l1,sx,139);
  font(40,true);x.fillStyle=RED;x.fillText(P.big,sx+tw+10,152);
  font(10,false,'900');const bw=x.measureText('투자 방식').width+12;
  x.fillStyle='#fff';x.fillRect(18,160,bw,22);x.fillStyle='#000';x.textAlign='left';x.fillText('투자 방식',24,175);
  const tx=18+bw+6;font(fs,false,'900');x.fillStyle='#fff';x.fillText(L1,tx,169);
  x.fillText(L2a,tx,181);const wa=x.measureText(L2a).width;x.fillStyle=RED;x.fillText(L2b,tx+wa,181);
  const BB=st.bb,PY0=BB-40,PY1=CT+16,A=P.A,py=v=>PY0-v/A*(PY0-PY1),px=i=>PX0+i/NP*(PX1-PX0);
  x.strokeStyle='#666';x.lineWidth=1.5;x.strokeRect(18,CT,334,BB-CT);
  for(let v=0;v<=A;v+=P.step){const y=py(v);x.strokeStyle=v===0?'#555':'#262626';x.lineWidth=1;x.beginPath();x.moveTo(PX0,y);x.lineTo(PX1+4,y);x.stroke();font(7,true);x.fillStyle='#777';x.textAlign='right';x.fillText(v+'%',PX0-4,y+2.5);}
  x.strokeStyle='#555';x.beginPath();x.moveTo(PX0,BB-30);x.lineTo(PX1+4,BB-30);x.stroke();
  font(P.dfs||6.5,true);
  for(let i=0;i<=NP;i++){const X=px(i);x.fillStyle=(i<=1)?'#fff':i===NP?RED:'#888';x.textAlign=i===NP?'right':'center';x.fillText(dates[i],X+(i===NP?8:0),BB-14);}
  const seg=st.seg,sp=st.segP;
  x.strokeStyle=CH;x.lineWidth=2.5;x.lineJoin='round';x.beginPath();x.moveTo(px(0),py(0));
  for(let i=1;i<=seg;i++)x.lineTo(px(i),py(vals[i]));
  if(seg<NP&&sp>0){const a=seg,b=seg+1;x.lineTo(px(a)+(px(b)-px(a))*sp,py(vals[a]+(vals[b]-vals[a])*sp));}
  x.stroke();
  for(let i=0;i<=seg;i++){x.fillStyle=i===NP?CH:'#fff';x.beginPath();x.arc(px(i),py(vals[i]),i===NP||i<=1?3:2.4,0,7);x.fill();
    if(i===0)continue;const lbl='+'+(i===NP?vals[i].toFixed(2):vals[i].toFixed(1))+'%';
    if(i===NP){font(11,true);x.fillStyle=CH;x.textAlign='right';x.fillText(lbl,px(i)+6,py(vals[i])+dy[i]);}
    else if(i===1){font(7.5,true);x.fillStyle='#fff';x.textAlign='left';x.fillText(lbl,px(i)+5,py(vals[i])+10);}
    else{font(5.8,false);x.fillStyle='#bbb';x.textAlign='center';x.fillText(lbl,px(i),py(vals[i])+dy[i]);}}
  if(st.bottom<=0)return;
  x.globalAlpha=st.bottom;x.save();x.translate(0,D);
  x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(18,424);x.lineTo(352,424);x.stroke();
  font(13.5,true);x.textAlign='left';x.fillStyle='#fff';
  const cl=(t,y)=>{x.fillText(t,(W1-x.measureText(t).width)/2,y);};
  cl('회장님의 순수 이타심으로 만든 자산운용2팀,',446);
  const a='가이드에 따라 ',b='차원이 다른 수익률',cc='을 목표로';const wa2=x.measureText(a).width,wb=x.measureText(b).width,wc=x.measureText(cc).width;let s2=(W1-wa2-wb-wc)/2;
  x.fillStyle='#fff';x.fillText(a,s2,466);x.fillStyle=RED;x.fillText(b,s2+wa2,466);x.fillStyle='#fff';x.fillText(cc,s2+wa2+wb,466);
  cl('바이낸스 투자를 진행합니다.',486);
  font(10,true);x.fillStyle='#888';x.textAlign='center';x.fillText('― 지원 방법 ―',W1/2,508);
  const sc=st.scale;
  if(!st.swap){card(18,518,163,62,true,'A U T O','#9a7400','운영진','자동 선발',sc);card(189,518,163,62,false,'S E L E C T',RED,'기여도 우수 부원','회장님 선발',sc);}
  else{card(18,518,163,62,false,'A U T O',GOLD,'운영진','자동 선발',sc);card(189,518,163,62,true,'S E L E C T','#c0392b','기여도 우수 부원','회장님 선발',sc);borderDraw(189,518,163,62,st.border);}
  font(12.5,true);const fw=x.measureText(FINAL).width,fx=(W1-fw)/2;const txt=FINAL.slice(0,st.chars);x.textAlign='left';x.fillStyle='#fff';x.fillText(txt,fx,604);
  if(st.cursor){const cw=x.measureText(txt).width;x.fillStyle=RED;x.fillRect(fx+cw+1.5,592,1.6,15);}
  x.restore();x.globalAlpha=1;}
x.setTransform(1,0,0,1,0,0);font(10,false,'900');const bw0=x.measureText('투자 방식').width+12;const avail=352-(18+bw0+6);
for(fs=9.5;fs>6;fs-=0.1){font(fs,false,'900');if(x.measureText(L1).width<=avail&&x.measureText(L2a+L2b).width<=avail)break;}
let buf=new Uint8Array(4<<20),n=0;const pb=v=>{if(n>=buf.length){const nb=new Uint8Array(buf.length*2);nb.set(buf);buf=nb;}buf[n++]=v;};
const pw=v=>{pb(v&255);pb((v>>8)&255);};const ps=s=>{for(const ch of s)pb(ch.charCodeAt(0));};
ps('GIF89a');pw(W);pw(H);pb(0xF7);pb(0);pb(0);pal.forEach(p=>{pb(p[0]);pb(p[1]);pb(p[2]);});
pb(0x21);pb(0xFF);pb(11);ps('NETSCAPE2.0');pb(3);pb(1);pw(0);pb(0);
const prev=new Uint8Array(W*H);const sub=new Uint8Array(W*H);let first=true;
const FULL=[0,0,W,H];const r_=(a,b,cw,ch)=>{const X=Math.max(0,Math.floor(a*S)),Y=Math.max(0,Math.floor(b*S));return [X,Y,Math.min(W-X,Math.ceil(cw*S)),Math.min(H-Y,Math.ceil(ch*S))];};
const R={chart:r_(18,CT-2,334,460),lower:r_(0,CT-2,370,H1-CT-2),cards:r_(10,508+D,350,85),final:r_(0,588+D,370,25)};
function frame(delay,rect){
  const [rx,ry,rw,rh]=first?FULL:rect;const id=x.getImageData(rx,ry,rw,rh).data;let x0=W,y0=H,x1=-1,y1=-1;
  for(let yy=0;yy<rh;yy++){const o=(ry+yy)*W+rx;const io=yy*rw*4;for(let xx=0;xx<rw;xx++){const j=io+xx*4;const q=lut[((id[j]>>3)<<10)|((id[j+1]>>3)<<5)|(id[j+2]>>3)];
    if(first||q!==prev[o+xx]){prev[o+xx]=q;const X=rx+xx,Y=ry+yy;if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;y1=Y;}}}
  if(first){x0=0;y0=0;x1=W-1;y1=H-1;}if(x1<0){x0=0;y0=0;x1=0;y1=0;}
  const sw=x1-x0+1,sh=y1-y0+1;let k=0;for(let yy=y0;yy<=y1;yy++){const o=yy*W;for(let xx=x0;xx<=x1;xx++)sub[k++]=prev[o+xx];}
  pb(0x21);pb(0xF9);pb(4);pb(0x04);pw(delay);pb(0);pb(0);pb(0x2C);pw(x0);pw(y0);pw(sw);pw(sh);pb(0);pb(8);
  const bn=lzw(sub,k);for(let i=0;i<bn;i+=255){const m=Math.min(255,bn-i);pb(m);for(let j=0;j<m;j++)pb(lb[i+j]);}pb(0);first=false;}
const BIG=610+D,SMALL=408+D;const io2=t=>t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const chars=[...FINAL];
let st={bb:SMALL,seg:NP,segP:0,bottom:1,swap:true,scale:1,border:1,chars:chars.length,cursor:false};
draw(st);frame(2);
st={bb:BIG,seg:0,segP:0,bottom:0,swap:false,scale:1,border:0,chars:0,cursor:false};
draw(st);frame(50,FULL);
let tot=0;
for(let s=0;s<NP;s++){const t=s===0?P.t.first:s===NP-1?P.t.last:P.t.mid;
  for(let f=1;f<=t[0];f++){st.segP=io2(f/t[0]);draw(st);frame(t[1],R.chart);tot+=t[1];}
  st.seg=s+1;st.segP=0;draw(st);frame(t[2],R.chart);tot+=t[2];}
draw(st);frame(50,R.chart);
const NS=12;for(let f=1;f<=NS;f++){const t=io2(f/NS);st.bb=BIG+(SMALL-BIG)*t;st.bottom=Math.max(0,(f/NS-0.4)/0.6);draw(st);frame(4,R.lower);}
st.bb=SMALL;st.bottom=1;draw(st);frame(80,R.lower);
st.scale=0.94;draw(st);frame(6,R.cards);st.swap=true;st.scale=0.97;draw(st);frame(4,R.cards);st.scale=1;draw(st);frame(35,R.cards);
const NB=16;for(let f=1;f<=NB;f++){st.border=io2(f/NB);draw(st);frame(3,R.cards);}st.border=1;draw(st);frame(40,R.cards);
st.cursor=true;for(let i=1;i<=chars.length;i++){if(chars[i-1]===' ')continue;st.chars=i;draw(st);frame(11,R.final);}
st.chars=chars.length;for(let b=0;b<5;b++){st.cursor=false;draw(st);frame(70,R.final);st.cursor=true;draw(st);frame(70,R.final);}
st.cursor=false;draw(st);frame(2000,R.final);pb(0x3B);
await saveFile(P.out,new Blob([buf.slice(0,n)],{type:'image/gif'}));log(n,'chart cs',tot);
