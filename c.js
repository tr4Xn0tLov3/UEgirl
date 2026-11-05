/* c.js: оформление, действия, запуск */
var XCSS=['*{box-sizing:border-box}','a{color:inherit;text-decoration:none}','h1,h2,h3{margin:0;font-weight:800;letter-spacing:-.02em}','h1{font-size:clamp(28px,7vw,48px);line-height:1.08}','h2{font-size:22px;margin:28px 0 12px}','em{font-style:normal;color:#3dff8a}','p{margin:8px 0;color:#9fb0a5}','b{font-weight:700}',
'#spx{position:fixed;inset:0;z-index:200;background:#060807;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s}','#spx.off{opacity:0;pointer-events:none}','#spi{font-size:46px;font-weight:800}','#spi span,#xlogo span{color:#3dff8a}','#spp{margin:10px 0;color:#6b7d72;font-size:12px}','.pgw{width:160px;height:2px;background:#1c231f}','#xpg{height:100%;width:0;background:#3dff8a}',
'#xh{position:fixed;top:0;left:0;right:0;height:56px;z-index:50;display:flex;align-items:center;gap:10px;padding:0 14px;background:rgba(6,8,7,.94);border-bottom:1px solid #1c231f}','#xlogo{font-size:22px;font-weight:800;margin-right:auto}','.x18{border:1px solid #1f9d5c;color:#3dff8a;font-size:11px;padding:2px 6px;border-radius:5px}','#xbal{font-size:13px;color:#9fb0a5}','#mn{background:none;border:1px solid #1c231f;color:#e8efe9;width:38px;height:34px;border-radius:8px;font-size:18px}',
'#xm{position:fixed;top:56px;right:0;bottom:0;width:260px;max-width:82vw;z-index:49;background:#0b0f0d;border-left:1px solid #1c231f;transform:translateX(100%);transition:transform .3s;padding:10px;overflow:auto}','#xm.on{transform:none}','#xm a{display:block;padding:13px 12px;border-bottom:1px solid #1c231f}','#xm a.on{color:#3dff8a}','#xo{position:fixed;inset:56px 0 0 0;z-index:48;background:rgba(0,0,0,.5);display:none}','#xo.on{display:block}',
'#xa{padding:70px 16px 30px;max-width:1100px;margin:0 auto;min-height:80vh}','.xg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}',
'.xc{position:relative;display:block;background:#0b0f0d;border:1px solid #1c231f;border-radius:14px;overflow:hidden;transition:border-color .2s,transform .2s}','.xc:hover{border-color:#1f9d5c;transform:translateY(-2px)}','.xaw{position:relative;aspect-ratio:1;background:#15201a;overflow:hidden}','.xa{width:100%;height:100%;object-fit:cover;display:block}',
'.dot{position:absolute;top:8px;left:8px;width:10px;height:10px;border-radius:50%;background:#3dff8a;box-shadow:0 0 8px #3dff8a;animation:xp 2s infinite}','.bdg{position:absolute;bottom:6px;left:6px;background:#3dff8a;color:#03150a;font-size:10px;padding:2px 6px;border-radius:5px}','.xcb{padding:10px}','.xn{font-weight:700}','.xs{font-size:12px;color:#6b7d72;margin:2px 0 6px}','.xrw{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px}',
'.fv{position:absolute;top:6px;right:6px;width:32px;height:32px;border-radius:50%;border:0;background:rgba(6,8,7,.7);color:#6b7d72;font-size:16px}','.fv.on{color:#ff4d4d}',
'.xch{display:inline-block;border:1px solid #1c231f;border-radius:20px;padding:5px 11px;font-size:12px;margin:0 6px 6px 0;color:#9fb0a5;background:none;font-family:inherit}','.xch.on{border-color:#3dff8a;color:#3dff8a}','.xch.k0{color:#3dff8a;border-color:#1f9d5c}','.xch.k1{color:#c8ff3d;border-color:#7a9a1c}','.xch.k2{color:#ffb020;border-color:#9a6a10}','.xch.k3{color:#ff4d4d;border-color:#9a2a2a}',
'.xb{display:inline-block;border:1px solid #1c231f;background:#0b0f0d;color:#e8efe9;padding:12px 18px;border-radius:10px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;text-align:center}','.xb.g{background:#3dff8a;color:#03150a;border-color:#3dff8a}','.xb.s{padding:8px 12px;font-size:13px}','.xb.w{background:#ff4d4d;color:#fff;border-color:#ff4d4d}','.xb.blk{display:block;width:100%;margin-top:8px}',
'.xi{width:100%;background:#0b0f0d;border:1px solid #1c231f;color:#e8efe9;padding:12px;border-radius:10px;font-size:15px;font-family:inherit;margin:6px 0}','textarea.xi{min-height:80px}',
'.chk{display:flex;align-items:center;gap:10px;cursor:pointer;line-height:1.3;color:#e8efe9;font-size:14px;margin:8px 0}','.chk span{flex:1}','.chk input{-webkit-appearance:none;appearance:none;width:22px;height:22px;flex:none;margin:0;padding:0;border:1.5px solid #1f9d5c;border-radius:6px;background:#0b0f0d;display:grid;place-items:center;cursor:pointer}','.chk input:checked{background:#3dff8a;border-color:#3dff8a}','.chk input:checked::after{content:"";width:6px;height:11px;border:solid #03150a;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) translate(-1px,-1px)}',
'.pn{background:#0b0f0d;border:1px solid #1c231f;border-radius:14px;padding:14px;margin:12px 0}','.hero{padding:30px 0 10px}','.kick{color:#3dff8a;font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}','.btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}','.big{max-width:420px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid #1c231f}','.bkw{max-width:420px;margin:12px auto 0}','.thm{display:flex;gap:8px;margin-top:8px;justify-content:center}','.thm button{width:64px;height:64px;padding:0;border:1px solid #1c231f;border-radius:10px;overflow:hidden;background:none}','.thm img{width:100%;height:100%;object-fit:cover;display:block}',
'.vx{display:flex;align-items:center;gap:12px}','.vbt{width:44px;height:44px;border-radius:50%;border:0;background:#3dff8a;color:#03150a;font-size:16px;flex:none}','.vw{display:flex;gap:3px;align-items:center;height:30px;flex:1}','.vw i{width:3px;background:#1f9d5c;border-radius:2px;display:block}','.vx.pl .vw i{animation:xp .6s infinite}',
'.sh{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}','.shc{text-align:center;border:1px solid #1c231f;border-radius:10px;padding:8px 2px;font-size:11px;color:#6b7d72;background:none;font-family:inherit}','.shc b{display:block;font-size:13px;color:#e8efe9;margin-bottom:2px}','.shc.a{border-color:#1f9d5c;color:#3dff8a}','.shc.t{background:#10201a}',
'.kf{margin-top:10px;font:12px monospace}','.kl{background:rgba(0,0,0,.5);border-left:2px solid #3dff8a;padding:4px 8px;margin:3px 0}','.kl span{color:#3dff8a}',
'.os{display:flex;gap:4px;margin:10px 0}','.osd{flex:1;text-align:center;font-size:10px;color:#6b7d72;border-top:3px solid #1c231f;padding-top:6px}','.osd.on{border-color:#3dff8a;color:#3dff8a}',
'.cht{max-height:300px;overflow:auto;display:flex;flex-direction:column;gap:6px;margin:8px 0}','.xm1{max-width:80%;padding:8px 12px;border-radius:12px;background:#15201a;font-size:14px;align-self:flex-start}','.xm1.me{align-self:flex-end;background:#1f9d5c;color:#fff}',
'.mt{display:flex;align-items:center;gap:14px;flex-wrap:wrap}','.mtr{width:140px;flex:none}','.st{display:flex;gap:10px;margin:12px 0}','.st div{flex:1;background:#0b0f0d;border:1px solid #1c231f;border-radius:12px;padding:10px;text-align:center;font-size:12px;color:#6b7d72}','.st b{display:block;font-size:18px;color:#3dff8a}','.xr{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #1c231f}',
'#xf{border-top:1px solid #1c231f;padding:26px 16px 50px;color:#6b7d72;font-size:12px;max-width:1100px;margin:0 auto}',
'#xw{position:fixed;inset:0;z-index:90;display:flex;pointer-events:none}','#xw .s{flex:1;background:#0b0f0d;border-right:1px solid #1f9d5c;transform:scaleY(0);transform-origin:bottom;transition:transform .45s cubic-bezier(.7,0,.3,1)}','#xw.in .s{transform:scaleY(1);transform-origin:top}','#xw .s:nth-child(2){transition-delay:.05s}','#xw .s:nth-child(3){transition-delay:.1s}','#xw .s:nth-child(4){transition-delay:.15s}','#xw .s:nth-child(5){transition-delay:.2s}',
'#xwt{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-size:clamp(34px,10vw,80px);font-weight:800;color:#3dff8a;text-transform:uppercase;opacity:0;transition:opacity .25s}','#xw.in #xwt{opacity:1}',
'#xt{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(30px);background:#0b0f0d;border:1px solid #1f9d5c;color:#e8efe9;padding:10px 16px;border-radius:10px;z-index:120;opacity:0;transition:.3s;max-width:90vw;font-size:13px;pointer-events:none}','#xt.on{opacity:1;transform:translateX(-50%)}',
'#xmd{position:fixed;inset:0;z-index:110;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;padding:16px}','#xmd.on{display:flex}','.mdb{background:#0b0f0d;border:1px solid #1c231f;border-radius:16px;padding:18px;width:100%;max-width:400px;max-height:85vh;overflow:auto}',
'#xrec{position:fixed;left:12px;bottom:8px;font:10px monospace;color:#6b7d72;z-index:40;pointer-events:none}'].join('');
var CSS0='html,body{margin:0;background:#060807!important}#xr{min-height:100vh;background:#060807;color:#e8efe9;font:15px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;overflow-x:hidden}@keyframes xp{0%,100%{opacity:1}50%{opacity:.35}}';
function pre(c){return c.replace(/(^|\})\s*([^{}]+)\{/g,function(m,a,s){return a+s.split(',').map(function(x){return'#xr '+x.trim()}).join(',')+'{'})}

function toast(t){var e=$('#xt');if(!e)return;e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on')},2800)}
function modal(h){var m=$('#xmd');m.innerHTML='<div class="mdb">'+h+'</div>';m.classList.add('on')}
function closeMd(){$('#xmd').classList.remove('on')}
function closeM(){$('#xm').classList.remove('on');$('#xo').classList.remove('on')}
function updBal(){$('#xbal').textContent=R(bal())}
function route(){var a=location.hash.replace(/^#\/?/,'').split('/');return{r:a[0]||'home',id:a[1]}}
function ttl(rt){if(rt.r==='p'||rt.r==='book'){var p=getP(rt.id);if(p)return p.n}if(rt.r==='o'){var o=getO(rt.id);if(o)return o.n}return TT[rt.r]||NAME}
function draw(rt){
var f=PG[rt.r]||pgHome,h;try{h=f(rt.id)}catch(e){h='<h2>Ошибка страницы</h2><p>'+E(e.message)+'</p>'}
$('#xa').innerHTML=h;closeM();
$$('#xm a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-r')===rt.r)});
var c=$('.cht');if(c)c.scrollTop=1e5;chkAch();updBal()}
function rerender(){var y=window.scrollY;draw(route());window.scrollTo(0,y)}
var busy=false,TM=[500,150,500];
function go(first){
var rt=route();if(first||busy){draw(rt);return}
busy=true;var w=$('#xw');$('#xwt').textContent=ttl(rt);w.classList.add('in');
setTimeout(function(){draw(route());window.scrollTo(0,0);setTimeout(function(){w.classList.remove('in');setTimeout(function(){busy=false},TM[2])},TM[1])},TM[0])}

var A={},C={};
A.fav=function(t){var id=t.dataset.id,l=LS('fav',[]),i=l.indexOf(id);if(i>-1)l.splice(i,1);else l.push(id);SV('fav',l);t.classList.toggle('on');toast(i>-1?'Убрано из избранного':'В избранном');chkAch()};
A.ph=function(t){var im=t.querySelector('img'),m=$('.big img.xa');if(im&&m)m.src=im.src};
A.f=function(t){var k=t.dataset.k,v=t.dataset.v;if(k==='on'||k==='ch')F[k]=F[k]?0:1;else if(k==='dz'){F.dz=F.dz?0:1;F.tl=0}else if(k==='tl'){F.tl=F.tl?0:1;F.dz=0}else if(k==='s')F.s=F.s==='p'?'r':'p';else F[k]=+v;rerender()};
A.fq=function(t){F={g:-1,vb:-1,on:0,dz:0,tl:0,ch:0,s:'r'};F[t.dataset.k]=1;if(location.hash==='#/catalog')rerender();else location.hash='#/catalog'};
A.m=function(t){M[t.dataset.k]=+t.dataset.v;rerender()};
A.play=function(t){var box=t.parentNode.querySelector('.kf'),n=t.dataset.n,en=['Ghost','Rush','Nova','Bolt','Zed'],L=[n+' ✕ '+en[0]+' · headshot',n+' ✕ '+en[1]+' · через дым',n+' ✕ '+en[2],'Клатч: раунд за '+n];box.innerHTML='';L.forEach(function(s,i){setTimeout(function(){var d=document.createElement('div');d.className='kl';d.innerHTML=E(s).replace(E(n),'<span>'+E(n)+'</span>');box.appendChild(d)},i*600)})};
A.voice=function(t){var p=getP(t.dataset.id),box=t.closest('.vx');if(!p)return;
if(p.vo){try{var au=new Audio(p.vo);box.classList.add('pl');au.onended=function(){box.classList.remove('pl')};au.play()}catch(e){}return}
if(!window.speechSynthesis){toast('Голос недоступен на этом устройстве');return}
speechSynthesis.cancel();var u=new SpeechSynthesisUtterance('Привет! Я '+p.n+'. Давай сыграем в '+G[p.g[0]]+'. Буду рада напарнику!');u.lang='ru-RU';u.pitch=1+(p.h%4)*.12;
var vs=speechSynthesis.getVoices();if(vs.length&&!vs.some(function(v){return/^ru/i.test(v.lang)}))toast('Нет русского голоса: Настройки → Язык → Синтез речи');
u.onend=function(){box.classList.remove('pl')};box.classList.add('pl');speechSynthesis.speak(u)};
A.bk=function(t){var k=t.dataset.k,v=t.dataset.v;BK[k]=k==='mode'?v:+v;rerender()};
A.pay=function(t){var p=getP(BK.pid);if(!p)return;var s=bsum(p);if(bal()<s.tot){toast('Недостаточно средств: пополни в кабинете');return}
SV('bal',bal()-s.tot);var o={id:'o'+Date.now(),pid:p.id,n:p.n,hrs:BK.h,mode:BK.mode,day:DN[BK.day]+' · '+SLT[p.d[BK.day]],total:s.tot,st:0,msgs:[{m:0,t:'Привет! Я '+p.n+'. Заказ получила, скоро подтвержу.'}]};mkOrder(o);location.hash='#/o/'+o.id};
A.send=function(t){var i=$('#ci'),v=i.value.trim();if(!v)return;if(BAD.test(v)){toast('Контакты в чате запрещены: общение только на платформе');return}
var L=LS('ord',[]),id=t.dataset.id;L.forEach(function(o){if(o.id===id)o.msgs.push({m:1,t:v})});SV('ord',L);rerender();
setTimeout(function(){var R2=['Поняла, договорились!','Отлично, буду вовремя.','Хорошо, а какой ранг у тебя?','Супер, жду катку!'];var L2=LS('ord',[]);L2.forEach(function(o){if(o.id===id)o.msgs.push({m:0,t:R2[Math.floor(Math.random()*R2.length)]})});SV('ord',L2);var r=route();if(r.r==='o'&&r.id===id&&document.activeElement!==$('#ci'))rerender()},1400)};
A.rate=function(t){var o=getO(t.dataset.id),L=LS('ord',[]);L.forEach(function(x){if(x.id===o.id)x.rt=1});SV('ord',L);var r=LS('rt',{});(r[o.pid]=r[o.pid]||[]).push(+t.dataset.v);SV('rt',r);toast('Спасибо, оценка учтена');rerender()};
A.stop=function(t){var o=getO(t.dataset.id);STP={i:-1,id:o.id};stopModal()};
function stopModal(){var o=getO(STP.id),rf=o.st<=1?o.total:o.total/2;modal('<h3>Остановить заказ?</h3><p>Возврат: '+R(rf)+(o.st<=1?' (100%)':' (50%)')+'</p>'+SR.map(function(s,i){return ch(s,STP.i===i,'data-a="sr" data-i="'+i+'"')}).join('')+'<button class="xb w blk" data-a="stopok">Остановить</button><button class="xb blk" data-a="mc">Отмена</button>')}
A.sr=function(t){STP.i=+t.dataset.i;stopModal()};
A.stopok=function(){if(STP.i<0){toast('Выбери причину');return}var L=LS('ord',[]),rp=LS('rep',[]);L.forEach(function(o){if(o.id===STP.id){var rf=o.st<=1?o.total:o.total/2;o.rf=rf;SV('bal',bal()+rf);rp.push({pid:o.pid,r:SR[STP.i],o:o.id,t:Date.now()});o.st=-1}});SV('ord',L);SV('rep',rp);closeMd();toast('Заказ остановлен, деньги возвращены');rerender()};
A.mc=closeMd;
A.rep=function(t){var id=t.dataset.id;modal('<h3>Пожаловаться</h3>'+SR.map(function(s,i){return'<button class="xb blk" data-a="rpk" data-id="'+id+'" data-i="'+i+'">'+s+'</button>'}).join('')+'<button class="xb blk" data-a="mc">Отмена</button>')};
A.rpk=function(t){var r=LS('rep',[]);r.push({pid:t.dataset.id,r:SR[+t.dataset.i],t:Date.now()});SV('rep',r);closeMd();toast('Жалоба отправлена')};
A.ev=function(t){var l=LS('ev',[]),id=t.dataset.id,i=l.indexOf(id);if(i>-1)l.splice(i,1);else l.push(id);SV('ev',l);rerender()};
A.pts=function(t){var id=t.dataset.id,i=PT.sel.indexOf(id);if(i>-1)PT.sel.splice(i,1);else if(PT.sel.length<4)PT.sel.push(id);else toast('Максимум 4 напарницы');rerender()};
A.pk=function(t){PT.h=+t.dataset.v;rerender()};
A.party=function(){if(PT.sel.length<2||PT.sel.length>4){toast('Выбери от 2 до 4 напарниц');return}var sum=0,names=[];PT.sel.forEach(function(id){var p=getP(id);sum+=p.pr;names.push(p.n)});var tot=sum*PT.h*.9;if(bal()<tot){toast('Недостаточно средств');return}
SV('bal',bal()-tot);var o={id:'o'+Date.now(),pid:PT.sel[0],n:names.join(' + '),hrs:PT.h,mode:'Пати',day:'Сегодня вечером',total:tot,st:0,party:1,team:PT.sel.slice(),msgs:[{m:0,t:'Команда в сборе! Подтверждаем время.'}]};mkOrder(o);PT.sel=[];location.hash='#/o/'+o.id};
A.topup=function(){SV('bal',bal()+1000);updBal();rerender()};
A.test=function(){var p=P[Math.floor(Math.random()*P.length)];mkOrder({id:'o'+Date.now(),pid:p.id,n:p.n,hrs:1,mode:'Дуо',day:'Тест',total:0,st:0,msgs:[{m:0,t:'Тестовый заказ. Привет!'}]});rerender()};
A.pause=function(){var m=LS('my',null);if(!m)return;m.pz=m.pz||{};if(m.pz[TD()])delete m.pz[TD()];else m.pz[TD()]=1;SV('my',m);rerender()};
A.mytm=function(){var m=LS('my',null);m.tm=!m.tm;SV('my',m);rerender()};
A.delmy=function(){localStorage.removeItem('sq_my');rerender()};
A.rapply=function(){var c=RIN.trim().toUpperCase();if(LS('ref',0)){toast('Код уже использован');return}if(c===refc()||!/^UE-[A-Z0-9]{4}$/.test(c)){toast('Неверный код');return}SV('ref',1);SV('bal',bal()+300);toast('+300 ₽ на баланс');rerender()};
A.reset=function(){Object.keys(localStorage).forEach(function(k){if(k.indexOf('sq_')===0)localStorage.removeItem(k)});location.hash='#/';location.reload()};
A.wg=function(t){var v=+t.dataset.v,i=W.g.indexOf(v);if(i>-1)W.g.splice(i,1);else if(W.g.length<3)W.g.push(v);else toast('Максимум 3 игры');rerender()};
A.ws=function(t){W[t.dataset.k]=+t.dataset.v;rerender()};
A.wd=function(t){var i=+t.dataset.i;W.d[i]=(W.d[i]+1)%4;rerender()};
A.wt=function(t){var v=+t.dataset.v;if(v<0)W.tm=0;else{W.tm=1;W.tl=v}rerender()};
A.w=function(t){var v=t.dataset.v;
if(v==='back'){W.s--;rerender();return}
if(W.s===1&&(W.n.trim().length<2||+W.a<18)){toast('Введи ник и возраст от 18');return}
if(W.s===2&&!W.g.length){toast('Выбери хотя бы одну игру');return}
if(v==='next'){W.s++;window.scrollTo(0,0);rerender();return}
if(!W.ok){toast('Подтверди 18+ и что фото и голос твои');return}
var my={id:'my',n:W.n.trim(),a:+W.a,g:W.g.slice(),pr:W.pr,r:5,rv:0,on:true,v:true,h:7,bio:W.bio||'Люблю играть в команде.',d:W.d.slice(),vb:W.vb,pz:{},tl:W.tl,tm:!!W.tm,rk:W.rk,cl:0,ch:0,ph:W.ph.slice()};
SV('my',my);toast('Анкета опубликована');location.hash='#/p/my'};
C.wn=function(t){W.n=t.value};C.wa=function(t){W.a=t.value};C.wb=function(t){W.bio=t.value};C.wok=function(t){W.ok=t.checked?1:0};
C.rin=function(t){RIN=t.value};
C.promo=function(t){BK.promo=t.value;var p=getP(BK.pid);if(p)$('#bsum').innerHTML=sumHtml(p)};
C.abo=function(t){BK.abo=t.checked?1:0;if(BK.abo)BK.h=5;else if(BK.h===5)BK.h=2;rerender()};
C.wph=function(t){var f=t.files&&t.files[0];if(!f)return;if(W.ph.length>=3){toast('Максимум 3 фото');t.value='';return}
var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,480/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);W.ph.push(c.toDataURL('image/jpeg',.7));rerender()};im.src=rd.result};rd.readAsDataURL(f);t.value=''};

function init(){
var st=document.createElement('style');st.textContent=CSS0+pre(XCSS);document.head.appendChild(st);
var root=document.createElement('div');root.id='xr';
root.innerHTML='<div id="spx"><div id="spi">'+lg()+'</div><div id="spp">0%</div><div class="pgw"><div id="xpg"></div></div></div>'
+'<div id="xh"><a id="xlogo" href="#/">'+lg()+'</a><span class="x18">18+</span><span id="xbal"></span><button id="mn" aria-label="Меню">☰</button></div>'
+'<div id="xm">'+MENU.map(function(m){return'<a data-r="'+m[0]+'" href="#/'+(m[0]==='home'?'':m[0])+'">'+m[1]+'</a>'}).join('')+'</div><div id="xo"></div>'
+'<div id="xa"></div>'
+'<div id="xf"><b>'+lg()+'</b> — концепт-прототип. Все анкеты, отзывы, рейтинги вымышлены, аватарки нарисованы, платежей нет.<br><br>89 squad — сквад Владимира Братишкина, и он в нём главный. Упоминается как идея партнёрства: участие и одобрение не получены, значок «Выбор сквада» — макет. Публичный показ с их именами только после согласия.<br><br>18+. Только игровое общение.</div>'
+'<div id="xw"><div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div><div id="xwt"></div></div>'
+'<div id="xt"></div><div id="xmd"></div><div id="xrec"></div>';
document.body.appendChild(root);
$$('body>*').forEach(function(n){if(n!==root&&n.tagName!=='SCRIPT')n.style.display='none'});
root.addEventListener('click',function(e){
if(e.target.id==='xmd'){closeMd();return}
if(e.target.closest('#xm a')){closeM()}
var t=e.target.closest('[data-a]');if(!t)return;var f=A[t.getAttribute('data-a')];if(f){e.preventDefault();f(t,e)}});
function onIn(e){var t=e.target.closest?e.target.closest('[data-c]'):null;if(!t)return;var f=C[t.getAttribute('data-c')];if(f)f(t)}
root.addEventListener('input',onIn);root.addEventListener('change',onIn);
root.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='ci'){var b=$('[data-a="send"]');if(b)A.send(b)}});
$('#mn').addEventListener('click',function(){$('#xm').classList.toggle('on');$('#xo').classList.toggle('on')});
$('#xo').addEventListener('click',closeM);
window.addEventListener('hashchange',function(){go(false)});
go(true);
var pr=0,iv=setInterval(function(){pr=Math.min(100,pr+2+Math.random()*5);$('#spp').textContent=Math.floor(pr)+'%';$('#xpg').style.width=pr+'%';if(pr>=100){clearInterval(iv);$('#spx').classList.add('off')}},50);
setTimeout(function(){$('#spx').classList.add('off')},5000);
setInterval(function(){var L=LS('ord',[]),c=0;L.forEach(function(o){if(o.st>=0&&o.st<4){o.st++;c=1}});
if(c){SV('ord',L);var r=route();if(r.r==='o'&&document.activeElement!==$('#ci'))rerender();else chkAch()}},4500);
setInterval(function(){var l=P.filter(function(p){return p.on&&!paused(p)});if(!l.length)return;var p=l[Math.floor(Math.random()*l.length)];toast(p.n+' онлайн · ищет дуо в '+G[p.g[0]])},24000);
var t0=Date.now();setInterval(function(){var s=Math.floor((Date.now()-t0)/1000),m=Math.floor(s/60);$('#xrec').textContent='● REC '+(m<10?'0':'')+m+':'+(s%60<10?'0':'')+(s%60)},1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
