(function(){
window.addEventListener('error',e=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;background:#400;color:#fff;font:12px monospace;padding:8px;border-radius:8px';d.textContent='Ошибка: '+e.message+' (строка '+e.lineno+')';if(document.body)document.body.appendChild(d)});
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ld=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){tt('Память заполнена')}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TM=[700,700,600];
const CSS=`
:root{--bg:#060807;--pk:#3dff8a;--vi:#1f9d5c;--gr:#3dff8a;--go:#c9f5d9;--xp:#3dff8a;--xv:#1f9d5c;--xg:#3dff8a;--xy:#c9f5d9;--xc:#0b0f0d;--xl:#1c231f}
html,body{background:#060807!important;color:#e8efe9}
#grain{display:none!important}
#hd{background:#060807ee!important;border-bottom:1px solid #1c231f!important;z-index:70}
#spl{background:#060807!important}
#splBar,#prog{background:#3dff8a!important}
#bal{color:#3dff8a!important}
#wipe,#toast,#live,#sheet,#tb{display:none!important}
#app{max-width:1100px;margin:0 auto;padding:18px 16px 120px;color:#e8efe9;font-family:Manrope,system-ui,sans-serif}
#app>*{animation:xin .6s both}
#app>*:nth-child(2){animation-delay:.07s}#app>*:nth-child(3){animation-delay:.14s}#app>*:nth-child(4){animation-delay:.21s}#app>*:nth-child(5){animation-delay:.28s}#app>*:nth-child(n+6){animation-delay:.35s}
@keyframes xin{from{opacity:0;transform:translateY(14px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
#app h1{font:700 clamp(30px,7vw,56px)/1.05 Sora,Manrope,sans-serif;letter-spacing:-.02em;margin:8px 0 12px}
#app h2{font:600 20px Sora,Manrope,sans-serif;margin:30px 0 12px}
#app p{color:#93a398;line-height:1.5;margin:6px 0}
#app small{color:#6d7d72}
.xg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.xc{display:block;background:var(--xc);border:1px solid var(--xl);border-radius:6px;padding:10px;color:inherit;text-decoration:none;transition:.25s}
.xc:hover{border-color:var(--xp)}
.xa{position:relative;aspect-ratio:1;border-radius:4px;overflow:hidden;background:#111815;margin-bottom:8px}
.xa img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(1) contrast(1.05);transition:filter .3s}
.xc:hover .xa img,.xpf .xa:hover img{filter:none}
.xo{position:absolute;top:8px;left:8px;width:8px;height:8px;border-radius:50%;background:var(--xg);box-shadow:0 0 8px var(--xg)}
.xv{position:absolute;right:6px;bottom:6px;font-size:11px;background:#000a;border-radius:4px;padding:2px 6px}
.xc h4{margin:0;font-size:15px;font-weight:600}.xc p{margin:2px 0;font-size:12px}.xc em{font-style:normal;color:var(--xy);font-weight:600;font-size:13px}
.xb{display:inline-block;background:var(--xp);color:#04120a;border:1px solid var(--xp);border-radius:6px;padding:12px 20px;font:700 14px Manrope,sans-serif;text-decoration:none;cursor:pointer;transition:.2s}
.xb:hover{background:#7dffb4}
.xb.g{background:transparent;color:var(--xp);border:1px solid var(--xl)}
.xb.g:hover{border-color:var(--xp);background:transparent}
.xr{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
.xk{background:var(--xc);border:1px solid var(--xl);border-radius:6px;padding:16px;margin:12px 0}
.xi{width:100%;box-sizing:border-box;background:#070a08;border:1px solid var(--xl);color:#e8efe9;border-radius:6px;padding:12px;font:inherit;margin:6px 0}
.xi:focus{outline:0;border-color:var(--xp)}
.xch{display:inline-block;padding:6px 12px;border:1px solid var(--xl);border-radius:4px;margin:3px;font:600 13px Manrope,sans-serif;cursor:pointer;color:#93a398;background:none}
.xch.on{background:var(--xp);border-color:var(--xp);color:#04120a}
.xpf{display:grid;grid-template-columns:1fr;gap:18px}
@media(min-width:760px){.xpf{grid-template-columns:340px 1fr}}
.xpd{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;align-items:end}
.xpd .xc:nth-child(2){transform:translateY(-14px)}
.xrw{display:flex;align-items:center;gap:12px;padding:8px 4px;border-bottom:1px solid var(--xl);color:inherit;text-decoration:none}
.xrw .xa{width:44px;margin:0;border-radius:50%;flex:none}
.vx{display:flex;align-items:center;gap:12px;background:var(--xc);border:1px solid var(--xl);border-radius:6px;padding:10px 14px;margin:14px 0}
.vx button{width:40px;height:40px;border-radius:50%;border:0;background:var(--xp);color:#04120a;font-size:15px;cursor:pointer;flex:none}
.vw{display:flex;gap:3px;align-items:center;height:30px;flex:1}
.vw i{width:2px;background:#2c3a32;border-radius:2px}
.vx.on .vw i{animation:xw .8s ease-in-out infinite;background:var(--xp)}
@keyframes xw{50%{height:100%}}
.sh{margin:16px 0;padding:14px;border:1px solid var(--xl);border-radius:6px;background:var(--xc)}
.shb{display:flex;gap:6px;align-items:flex-end;height:96px;margin-top:10px}
.shd{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px;height:100%}
.shd i{width:100%;display:block;border-radius:2px}
.shd i.l2{height:68px}.shd i.l1{height:36px}.shd i.l0{height:6px}
.shd span{font-size:11px;color:#6d7d72}
.shd.td span{color:var(--xp);font-weight:700}
.shd.bt{background:none;border:0;color:inherit;cursor:pointer;padding:0}
.l2{background:var(--xp)}.l1{background:#1d6b43}.l0{background:#2a2f2c}
.shl{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-size:11px;color:#6d7d72}
.shl b{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:5px}
.xs{display:flex;gap:6px}
.xs span{flex:1;text-align:center;font-size:11px;padding:8px 2px;border-radius:4px;background:#0b0f0d;border:1px solid var(--xl);color:#5d6d62}
.xs span.on{background:var(--xp);border-color:var(--xp);color:#04120a;font-weight:700}
.xm1{max-width:80%;padding:8px 12px;border-radius:6px;margin:6px 0;background:#111815;font-size:14px}
.xm1.me{margin-left:auto;background:#123524}
#xbar{position:fixed;left:12px;right:12px;bottom:14px;z-index:40;pointer-events:none}
.xbk{max-width:560px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;background:#0b0f0dee;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--xl);border-radius:8px;padding:10px 12px 10px 18px;pointer-events:auto;color:#fff}
#mn{background:none;border:1px solid var(--xl);color:#fff;border-radius:6px;width:38px;height:38px;font-size:18px;margin-left:10px;cursor:pointer}
#xm{position:fixed;right:0;top:64px;width:min(320px,100vw);background:#080b09;border:1px solid var(--xl);border-top:0;border-radius:0 0 0 10px;padding:10px;z-index:60;transform:translateY(-105%);visibility:hidden;transition:transform .35s cubic-bezier(.2,.8,.2,1),visibility 0s .35s;display:flex;flex-direction:column}
#xm.open{transform:none;visibility:visible;transition:transform .35s cubic-bezier(.2,.8,.2,1),visibility 0s}
#xm a{padding:13px 14px;border-radius:6px;color:#cfd9d2;text-decoration:none;font:600 15px Manrope,sans-serif}
#xm a.on,#xm a:hover{background:#101612;color:var(--xp)}
#xo{position:fixed;inset:0;background:#0008;z-index:55;opacity:0;pointer-events:none;transition:.3s}
#xo.open{opacity:1;pointer-events:auto}
#xw{position:fixed;inset:0;z-index:100;pointer-events:none;display:flex}
#xw .s{flex:1;background:#060807;transform:scaleY(0);transform-origin:top;transition:transform .45s cubic-bezier(.7,0,.3,1)}
#xw .s:nth-child(2){transition-delay:.05s}#xw .s:nth-child(3){transition-delay:.1s}#xw .s:nth-child(4){transition-delay:.15s}#xw .s:nth-child(5){transition-delay:.2s}
#xw.in .s,#xw.hold .s{transform:scaleY(1)}
#xw.out .s{transform:scaleY(0);transform-origin:bottom}
#xwt{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:600 clamp(18px,4vw,32px) Sora,Manrope,sans-serif;letter-spacing:.14em;color:var(--xp);opacity:0;transition:opacity .3s;text-align:center;padding:0 20px;text-transform:uppercase}
#xw.hold #xwt{opacity:1}
#xt{position:fixed;top:78px;left:50%;transform:translate(-50%,-20px);background:#0b0f0d;border:1px solid var(--xp);padding:10px 16px;border-radius:6px;color:#fff;font:600 13px Manrope,sans-serif;opacity:0;transition:.3s;z-index:90;pointer-events:none;max-width:90vw;text-align:center}
#xt.on{opacity:1;transform:translate(-50%,0)}
#xrec{position:fixed;top:76px;left:12px;font:600 11px monospace;color:#3dff8a;z-index:20;opacity:.6;pointer-events:none}
`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

/* DATA */
const G=['Valorant','CS2','Dota 2','Apex','Fortnite','Genshin','Minecraft','LoL'];
const DN=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const SL=['Сегодня отдыхает','Сегодня по договорённости','Сегодня свободна'];
const TD=()=>(new Date().getDay()+6)%7;
const NM='Sakura Mira Kira Luna Nika Vega Alice Yuki Reina Stella Mika Lola Ayla Zoya Dana Tilda Kami Nori Pixie Fox Raya Sia Emi Lana Neva Ilsa Vika Rin Sora Tori Zara Mavi Kesha Lumi Indi Cleo Bela Nyx Elfi Hana Juno Mono Opal Pearl'.split(' ');
const BIO=['Играю с детства, объясняю без токсичности','Люблю шутки в голосе и тактические катки','Помогу подняться по рангу и не потерять настроение','Чилл-катки по вечерам, без нервов','Хожу на турниры, возьму в команду','Спокойный саппорт, громкий смех'];
const RN=['Макс','Дима','Артём','Кирилл','Влад','Ярик'];
const RT=['Приятно играть, сыграли пару каток','Объяснила тактику, ранг вырос','Весёлая, без токсика','Пунктуальная, рекомендую','Классный голос и юмор'];
const FM={'Дуо':1,'Обучение':1.3,'Чилл':.8};
const PRM={'89SQUAD':.1,'BRATISHKIN':.1,'UEGIRL':.1};
const ST=['Ждёт','Подтверждён','Идёт','Завершён','Оплачен'];
const OM=['','Подтверждаю! Заходи в лобби, жду.','Играем! GL HF 🎮','Было круто, спасибо за игру!','Оплата получена ✅'];
const BAD=/(\+?\d[\d\s\-()]{8,}|@\w|t\.me|telegram|телеграм|тг(?![а-я])|whatsapp|ватсап|vk\.com|вк(?![а-я])|insta|инст|http)/i;
const EV=[
{id:1,t:'Турнир 5×5',d:'Сб, 20:00',x:'Командный турнир в духе 89 squad: сетка, призовой фонд, комментаторы.'},
{id:2,t:'Катка с Братишкиным',d:'Вс, 21:00',x:'Идея: розыгрыш места в лобби со стримером. Участие не подтверждено.'},
{id:3,t:'Ночной дуо-марафон',d:'Пт, 23:00',x:'Пять часов дуо-катк. Напарницы сменяются каждый час.'},
{id:4,t:'Мастер-класс по аиму',d:'Ср, 19:00',x:'Разбор прицела и чувствительности с лучшими напарницами недели.'}];
let s=89;const rn=()=>(s=(s*1664525+1013904223)%4294967296)/4294967296;
const P=NM.map((n,i)=>{const g=[G[i%8]];if(rn()>.4)g.push(G[(i+3)%8]);if(rn()>.7)g.push(G[(i+5)%8]);
const o={id:i+1,n,a:18+Math.floor(rn()*10),g,pr:Math.round((300+rn()*900)/50)*50,r:+(4.5+rn()*.5).toFixed(1),rv:12+Math.floor(rn()*400),on:rn()>.45,v:rn()>.35,h:Math.floor(rn()*1000),bio:BIO[i%6],w:100+Math.floor(rn()*900)};
o.d=Array.from({length:7},()=>{const x=rn();return x>.72?0:x>.38?1:2});return o});

/* STATE */
let bal=ld('sq_bal',3000),fav=ld('sq_fav',[]),ord=ld('sq_ord',[]),evj=ld('sq_ev',[]),my=ld('sq_my',null);
const allP=()=>my?[my,...P]:P;
const gp=id=>allP().find(p=>String(p.id)===String(id));
let F={q:'',g:'',s:'r',on:false,v:false,fr:false,n:12},T='w',B={f:'Дуо',h:1,c:''},BP=null,OID=null,otm=null,cur=null,au=null;
let W={s:0,n:'',a:'',g:[],pr:'',bio:'',ph:[],ok:false,d:[2,2,2,2,2,1,1]};

/* HELPERS */
const av=(p,k)=>{const u=p.ph&&p.ph[k];const src=u||`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(p.n+'-'+k)}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4`;return `<img src="${src}" alt="" loading="lazy" onerror="this.style.display='none'">`};
const card=p=>`<a class="xc" href="#/p/${p.id}"><div class="xa">${av(p,0)}${p.on?'<i class="xo"></i>':''}${p.v?'<b class="xv">🎙</b>':''}</div><h4>${p.n}, ${p.a}</h4><p>${p.g[0]} · ★${p.r}</p><em>${p.pr} ₽/ч</em></a>`;
const grid=a=>a.length?`<div class="xg">${a.map(card).join('')}</div>`:'<p>Никого не нашли. Измени фильтры.</p>';
const opt=(arr,sel)=>arr.map(([v,l])=>`<option value="${v}" ${v==sel?'selected':''}>${l}</option>`).join('');
const gopts=[['','Все игры'],...G.map(g=>[g,g])];
const nf=()=>`<h1>404</h1><p>Такой страницы нет.</p><a class="xb" href="#/">На главную</a>`;
const calc=(p,f,h,c)=>{const base=Math.round(p.pr*FM[f]*h),d=PRM[(c||'').trim().toUpperCase()]||0,disc=Math.round(base*d),fee=Math.round((base-disc)*.1);return{base,disc,fee,total:base-disc+fee}};
const setBal=()=>{sv('sq_bal',bal);const b=$('#bal');if(b)b.textContent=bal.toLocaleString('ru')+' ₽';const x=$('#xbl');if(x)x.textContent=bal.toLocaleString('ru')+' ₽'};
let ttm;function tt(m){const t=$('#xt');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(ttm);ttm=setTimeout(()=>t.classList.remove('on'),2600)}
const lvl=p=>(p.d||[2,2,2,2,2,2,2])[TD()];
const sched=p=>{const d=p.d||[2,2,2,2,2,2,2],td=TD();return `<div class="sh"><b>${SL[lvl(p)]}</b><br><small>Расписание недели. Она сама решает, когда играть.</small><div class="shb">${d.map((v,i)=>`<div class="shd ${i==td?'td':''}"><i class="l${v}"></i><span>${DN[i]}</span></div>`).join('')}</div><div class="shl"><span><b class="l2"></b>свободна</span><span><b class="l1"></b>по договорённости</span><span><b class="l0"></b>отдых</span></div></div>`};

/* VOICE */
function stopV(){try{speechSynthesis.cancel()}catch(e){}if(au){au.pause();au=null}$$('.vx.on').forEach(x=>x.classList.remove('on'));$$('.vx button').forEach(b=>b.textContent='▶');cur=null}
function vplay(id,el){if(cur===id){stopV();return}stopV();const p=gp(id);if(!p)return;cur=id;el.classList.add('on');el.querySelector('button').textContent='■';
if(p.vo){au=new Audio(p.vo);au.onended=stopV;au.play().catch(stopV);return}
if(!window.speechSynthesis){tt('Голос не поддерживается');stopV();return}
const u=new SpeechSynthesisUtterance(`Привет! Я ${p.n}. Люблю играть в ${p.g[0]}. Залетай в дуо, будет весело!`);
u.lang='ru-RU';u.pitch=1+(p.h%4)*.12;
const v=speechSynthesis.getVoices().find(x=>/^ru/i.test(x.lang));if(v)u.voice=v;else tt('Нужен русский голос: Настройки → Язык → Синтез речи');
u.onend=u.onerror=stopV;speechSynthesis.speak(u)}
const voice=p=>p.v?`<div class="vx" data-voice="${p.id}"><button data-a="vplay" data-v="${p.id}">▶</button><div class="vw">${Array.from({length:26},(_,i)=>`<i style="height:${20+(i*37)%60}%;animation-delay:${(i*.06).toFixed(2)}s"></i>`).join('')}</div><small>Послушать голос</small></div>`:'';

/* PAGES */
const R={};
R.home=()=>{const on=P.filter(p=>p.on);return `
<h1>Играй вдвоём.<br>Выигрывай вместе.</h1>
<p>UEgirl: игровые напарницы для дуо, обучения и чилла в голосе. Только игры, только 18+.</p>
<div class="xr"><a class="xb" href="#/match">Подобрать напарницу</a><a class="xb g" href="#/catalog">Каталог</a></div>
<div class="xg" style="grid-template-columns:repeat(3,1fr)">
<div class="xk" style="text-align:center"><h2 style="margin:0;color:var(--xp)">${on.length}</h2><p>онлайн</p></div>
<div class="xk" style="text-align:center"><h2 style="margin:0;color:var(--xp)">${P.length}</h2><p>напарниц</p></div>
<div class="xk" style="text-align:center"><h2 style="margin:0;color:var(--xp)">${G.length}</h2><p>игр</p></div></div>
<h2>Сейчас онлайн</h2>${grid(on.slice(0,8))}
<div class="xr"><a class="xb g" href="#/catalog">Смотреть всех</a></div>
<h2>Игры</h2><div>${G.map(g=>`<button class="xch" data-a="cg" data-v="${g}">${g}</button>`).join('')}</div>
<div class="xk"><h2 style="margin-top:0">89 squad × Братишкин</h2><p>Идея партнёрства: турниры, розыгрыши и совместные катки. Это концепт, без участия и одобрения.</p><a class="xb g" href="#/events">События</a></div>
<h2>Как это работает</h2>
<div class="xg">${['Выбери напарницу','Забронируй время','Играйте','Оцени и оплати'].map((t,i)=>`<div class="xk"><h2 style="margin:0;color:var(--xp)">0${i+1}</h2><p>${t}</p></div>`).join('')}</div>
<p>Промокоды −10%: 89SQUAD, BRATISHKIN, UEGIRL</p>`};

const catL=()=>{const td=TD();let a=allP().filter(p=>(!F.q||p.n.toLowerCase().includes(F.q.toLowerCase()))&&(!F.g||p.g.includes(F.g))&&(!F.on||p.on)&&(!F.v||p.v)&&(!F.fr||(p.d||[2,2,2,2,2,2,2])[td]==2));
a.sort((x,y)=>F.s=='pr'?x.pr-y.pr:F.s=='pd'?y.pr-x.pr:(y.r-x.r)||(y.rv-x.rv));
return `<p>Найдено: ${a.length}</p>${grid(a.slice(0,F.n))}${a.length>F.n?'<div class="xr"><button class="xb g" data-a="more">Показать ещё</button></div>':''}`};
R.catalog=()=>`<h1>Каталог</h1><div class="xk">
<input class="xi" data-f="q" placeholder="Поиск по нику" value="${esc(F.q)}">
<select class="xi" data-f="g">${opt(gopts,F.g)}</select>
<select class="xi" data-f="s">${opt([['r','По рейтингу'],['pr','Дешевле'],['pd','Дороже']],F.s)}</select>
<label><input type="checkbox" data-f="on" ${F.on?'checked':''}> Только онлайн</label><br>
<label><input type="checkbox" data-f="v" ${F.v?'checked':''}> С голосом</label><br>
<label><input type="checkbox" data-f="fr" ${F.fr?'checked':''}> Свободна сегодня</label></div>
<div id="cl">${catL()}</div>`;

R.match=()=>`<h1>Подбор</h1><p>Быстро одним нажатием или точно по параметрам.</p>
<div class="xk"><h2 style="margin-top:0">Быстрый подбор</h2>
<select class="xi" id="mg">${opt(gopts,'')}</select>
<select class="xi" id="mf">${Object.keys(FM).map(f=>`<option>${f}</option>`).join('')}</select>
<button class="xb" data-a="mq">Найти сейчас</button></div>
<div class="xk"><h2 style="margin-top:0">Точный подбор</h2>
<input class="xi" id="pa" type="number" placeholder="Возраст до">
<input class="xi" id="pp" type="number" placeholder="Цена до, ₽/ч">
<select class="xi" id="pg">${opt(gopts,'')}</select>
<label><input type="checkbox" id="po"> Онлайн</label><br><label><input type="checkbox" id="pv"> С голосом</label><br>
<div class="xr"><button class="xb" data-a="mfind">Показать</button></div></div>
<div id="mres"></div>`;

const sc=(p,k)=>p.r*10+((p.h*k)%40)/4+p.rv/60;
const tabs=()=>[['w','Неделя'],['m','Месяц'],['a','Всё время']].map(([k,l])=>`<button class="xch ${T==k?'on':''}" data-a="tab" data-v="${k}">${l}</button>`).join('');
const topB=()=>{const k={w:1,m:2,a:3}[T];const a=allP().slice().sort((x,y)=>sc(y,k)-sc(x,k)).slice(0,15);const m=['2','1','3'];
return `<div class="xpd">${[a[1],a[0],a[2]].map((p,i)=>`<a class="xc" href="#/p/${p.id}"><div class="xa">${av(p,0)}</div><h4>${m[i]}. ${p.n}</h4><p>★${p.r}</p></a>`).join('')}</div>
<div style="margin-top:16px">${a.slice(3).map((p,i)=>`<a class="xrw" href="#/p/${p.id}"><b style="width:26px;color:var(--xp)">${i+4}</b><div class="xa">${av(p,0)}</div><div><b>${p.n}</b><br><small>${p.g[0]} · ${p.pr} ₽/ч</small></div><span style="margin-left:auto">★${p.r}</span></a>`).join('')}</div>`};
R.top=()=>`<h1>Топ</h1><div id="tt">${tabs()}</div><div id="tp" style="margin-top:16px">${topB()}</div>`;

R.p=id=>{const p=gp(id);if(!p)return nf();const fv=fav.includes(String(p.id));
const sim=allP().filter(x=>String(x.id)!==String(p.id)&&x.g[0]==p.g[0]).concat(P).filter((x,i,r)=>String(x.id)!==String(p.id)&&r.indexOf(x)==i).slice(0,4);
const rv=p.rv?[0,1,2].map(i=>`<div class="xk"><b>${RN[(p.h+i)%6]}</b> · ★${i==2?4:5}<p>${RT[(p.h+i*2)%5]}</p></div>`).join(''):'<p>Отзывов пока нет.</p>';
return `<div class="xpf"><div><div class="xa">${av(p,0)}${p.on?'<i class="xo"></i>':''}</div>
<div class="xg" style="grid-template-columns:1fr 1fr"><div class="xa">${av(p,1)}</div><div class="xa">${av(p,2)}</div></div></div>
<div><h1>${p.n}, ${p.a}</h1>
<p>${p.on?'● Онлайн':'○ Не в сети'} · ★${p.r} (${p.rv}) · ${p.w||0} ч в играх</p><p>${p.bio}</p>
${voice(p)}${sched(p)}<div>${p.g.map(g=>`<span class="xch on">${g}</span>`).join('')}</div>
<div class="xg" style="grid-template-columns:repeat(3,1fr);margin-top:12px">${Object.entries(FM).map(([f,m])=>`<div class="xk" style="margin:0"><b>${f}</b><br>${Math.round(p.pr*m)} ₽/ч</div>`).join('')}</div>
<div class="xr"><button class="xb g" data-a="fav" data-v="${p.id}">${fv?'♥ В избранном':'♡ В избранное'}</button></div></div></div>
<h2>Отзывы</h2>${rv}<h2>Похожие</h2>${grid(sim)}`};

const bsum=()=>{const p=gp(BP),c=calc(p,B.f,+B.h,B.c);return `<p>Услуга: ${c.base} ₽</p>${c.disc?`<p>Промокод: −${c.disc} ₽</p>`:''}<p>Сервисный сбор 10%: ${c.fee} ₽</p><h2 style="margin:6px 0">Итого: ${c.total} ₽</h2><p>Баланс: ${bal} ₽ · оплата внутри сервиса, контакты скрыты</p>`};
R.book=id=>{const p=gp(id);if(!p)return nf();BP=p.id;B.h=1;B.c='';
return `<h1>Бронь: ${p.n}</h1><div class="xk">
<select class="xi" data-b="f">${opt(Object.keys(FM).map(f=>[f,f]),B.f)}</select>
<select class="xi" data-b="h">${[1,2,3,4,5].map(h=>`<option value="${h}">${h} ч</option>`).join('')}</select>
<input class="xi" data-b="c" placeholder="Промокод">
<div id="bs">${bsum()}</div>
<button class="xb" data-a="pay">Оплатить</button></div>`};

const ob=o=>`<div class="xs">${ST.map((x,i)=>`<span class="${i<=o.st?'on':''}">${x}</span>`).join('')}</div><div class="xk" style="max-height:320px;overflow:auto">${o.m.map(m=>`<div class="xm1 ${m.w}">${esc(m.t)}</div>`).join('')}</div>`;
function drawO(o){const b=$('#xob');if(!b){clearInterval(otm);return}b.innerHTML=ob(o)}
R.o=id=>{const o=ord.find(x=>x.id===id);if(!o)return nf();OID=id;const p=gp(o.pid)||{n:'?'};
otm=setInterval(()=>{if(o.st<4){o.st++;o.m.push({w:'she',t:OM[o.st]});sv('sq_ord',ord);drawO(o)}else clearInterval(otm)},4500);
return `<h1>Заказ · ${p.n}</h1><p>${o.f} · ${o.h} ч · ${o.sum} ₽</p><div id="xob">${ob(o)}</div>
<input class="xi" id="xin" placeholder="Сообщение (контакты передавать нельзя)"><button class="xb" data-a="send">Отправить</button>`};

R.events=()=>`<h1>События</h1>${EV.map(e=>`<div class="xk"><h2 style="margin:0">${e.t}</h2><p><b>${e.d}</b></p><p>${e.x}</p><button class="xb ${evj.includes(e.id)?'g':''}" data-a="join" data-v="${e.id}">${evj.includes(e.id)?'Иду ✓':'Участвовать'}</button></div>`).join('')}`;

const wiz=()=>{const k=W.s;let h=`<p>Шаг ${k+1} из 4</p>`;
if(k==0)h+=`<input class="xi" data-w="n" placeholder="Ник" value="${esc(W.n)}"><input class="xi" data-w="a" type="number" placeholder="Возраст (18+)" value="${W.a}">`;
if(k==1)h+=G.map(g=>`<button class="xch ${W.g.includes(g)?'on':''}" data-a="wg" data-v="${g}">${g}</button>`).join('')+`<input class="xi" data-w="pr" type="number" placeholder="Цена за час, ₽" value="${W.pr}"><p style="margin-top:14px">Когда ты свободна. Нажми на день, чтобы сменить: свободна, по договорённости, отдых.</p><div class="shb">${W.d.map((v,i)=>`<button class="shd bt" data-a="wd" data-v="${i}"><i class="l${v}"></i><span>${DN[i]}</span></button>`).join('')}</div>`;
if(k==2)h+=`<p>До 3 фото, сожмём до 480 px. Можно пропустить: будет иллюстрация.</p><input class="xi" id="wf" type="file" accept="image/*" multiple><div class="xg">${W.ph.map(u=>`<div class="xa"><img src="${u}"></div>`).join('')}</div>`;
if(k==3)h+=`<textarea class="xi" data-w="bio" rows="4" placeholder="О себе">${esc(W.bio)}</textarea><label><input type="checkbox" data-w="ok" ${W.ok?'checked':''}> Мне 18+, согласна с правилами</label>`;
return h+`<div class="xr">${k?'<button class="xb g" data-a="wp">Назад</button>':''}<button class="xb" data-a="wn">${k==3?'Опубликовать':'Далее'}</button></div>`};
R.become=()=>`<h1>Стать напарницей</h1><p>Анкета за четыре шага.</p><div class="xk" id="wz">${wiz()}</div>`;

R.safety=()=>`<h1>Безопасность</h1>${['Только игры: сервис не для знакомств','Только 18+','Контакты скрыты, общение внутри чата','Оплата проходит внутри сервиса','Расписание она задаёт сама, причины не спрашиваем','Любой заказ можно оспорить','Жалоба на пользователя в один клик'].map(t=>`<div class="xk">✔ ${t}</div>`).join('')}`;

R.me=()=>{const rows=ord.map(o=>{const p=gp(o.pid)||{n:'?'};return `<a class="xrw" href="#/o/${o.id}"><div class="xa">${av(p,0)}</div><div><b>${p.n}</b><br><small>${o.f} · ${o.h} ч · ${o.sum} ₽</small></div><span style="margin-left:auto">${ST[o.st]}</span></a>`}).join('');
const fl=fav.map(gp).filter(Boolean);
return `<h1>Кабинет</h1><div class="xk"><p>Баланс (демо)</p><h2 id="xbl" style="margin:4px 0;color:var(--xp)">${bal.toLocaleString('ru')} ₽</h2><div class="xr">${[500,1000,3000].map(v=>`<button class="xb g" data-a="topup" data-v="${v}">+${v}</button>`).join('')}</div></div>
<h2>Заказы</h2>${rows||'<p>Пока пусто.</p>'}<div class="xr"><button class="xb g" data-a="test">+ тестовый заказ</button></div>
<h2>Избранное</h2>${fl.length?grid(fl):'<p>Пока пусто.</p>'}
<h2>Моя анкета</h2>${my?grid([my]):'<a class="xb" href="#/become">Создать анкету</a>'}`};

/* ROUTER */
const TT={home:'Главная',catalog:'Каталог',match:'Подбор',top:'Топ',p:'Профиль',book:'Бронь',o:'Заказ',events:'События',become:'Стать напарницей',safety:'Безопасность',me:'Кабинет'};
const rt=()=>(location.hash.replace(/^#\/?/,'')||'home').split('/');
let app,xm,xo,mn,xw,xwt,xbar,scene=0,busy=false;
function nset(o){xm.classList.toggle('open',!!o);xo.classList.toggle('open',!!o);mn.textContent=o?'✕':'☰';if(o){const h=$('#hd');xm.style.top=(h?Math.round(h.getBoundingClientRect().bottom)-1:64)+'px'}}
function render(){stopV();clearInterval(otm);nset(0);const[r,a]=rt();app.innerHTML=(R[r]||nf)(a);
const p=r=='p'?gp(a):null;xbar.innerHTML=p?`<div class="xbk"><div><b>от ${p.pr} ₽/ч</b><br><small style="color:#93a398">${p.n}</small></div><a class="xb" href="#/book/${p.id}">Забронировать</a></div>`:'';
$$('#xm a').forEach(l=>l.classList.toggle('on',l.dataset.r==r));document.title='UEgirl · '+(TT[r]||'')}
function trans(){if(busy){render();return}busy=true;const[r]=rt();xwt.textContent='Сцена '+String(++scene).padStart(2,'0')+' · '+(TT[r]||'');xw.className='in';
setTimeout(()=>{render();scrollTo(0,0);xw.className='hold';setTimeout(()=>{xw.className='out';setTimeout(()=>{xw.className='';busy=false},TM[2])},TM[1])},TM[0])}

/* ACTIONS */
function act(a,v,t){
if(a=='go'){location.hash=v}
else if(a=='vplay')vplay(v,t.closest('.vx'));
else if(a=='fav'){v=String(v);const i=fav.indexOf(v);i<0?fav.push(v):fav.splice(i,1);sv('sq_fav',fav);t.textContent=fav.includes(v)?'♥ В избранном':'♡ В избранное'}
else if(a=='more'){F.n+=12;$('#cl').innerHTML=catL()}
else if(a=='cg'){F.g=v;F.q='';F.n=12;location.hash='#/catalog'}
else if(a=='tab'){T=v;$('#tt').innerHTML=tabs();$('#tp').innerHTML=topB()}
else if(a=='mq'){const g=$('#mg').value;B.f=$('#mf').value;const l=allP().filter(p=>p.on&&(!g||p.g.includes(g))).sort((x,y)=>y.r-x.r).slice(0,3);if(!l.length){tt('Сейчас никого нет онлайн');return}location.hash='#/p/'+l[Math.floor(Math.random()*l.length)].id}
else if(a=='mfind'){const ma=+$('#pa').value||99,mp=+$('#pp').value||99999,g=$('#pg').value,o=$('#po').checked,vv=$('#pv').checked;
$('#mres').innerHTML=grid(allP().filter(p=>p.a<=ma&&p.pr<=mp&&(!g||p.g.includes(g))&&(!o||p.on)&&(!vv||p.v)))}
else if(a=='pay'){const p=gp(BP),c=calc(p,B.f,+B.h,B.c);if(c.total>bal){tt('Не хватает средств. Пополни в кабинете');return}
bal-=c.total;setBal();const o={id:Date.now().toString(36),pid:p.id,f:B.f,h:+B.h,sum:c.total,st:0,m:[{w:'she',t:'Привет! Заявку получила, скоро подтвержу.'}]};ord.unshift(o);sv('sq_ord',ord);B.f='Дуо';location.hash='#/o/'+o.id}
else if(a=='send'){const o=ord.find(x=>x.id===OID),i=$('#xin');if(!o||!i||!i.value.trim())return;
if(BAD.test(i.value)){tt('Контакты в чате нельзя. Всё внутри сервиса');return}
o.m.push({w:'me',t:i.value.trim()});i.value='';sv('sq_ord',ord);drawO(o);
if(o.st>=1)setTimeout(()=>{o.m.push({w:'she',t:['Ага, поняла 😊','Давай!','Отлично, готова','Хорошо, жду'][Math.floor(Math.random()*4)]});sv('sq_ord',ord);drawO(o)},1500)}
else if(a=='join'){v=+v;const i=evj.indexOf(v);i<0?evj.push(v):evj.splice(i,1);sv('sq_ev',evj);const j=evj.includes(v);t.textContent=j?'Иду ✓':'Участвовать';t.classList.toggle('g',j)}
else if(a=='topup'){bal+=+v;setBal();tt('Баланс пополнен (демо)')}
else if(a=='test'){const l=P.filter(p=>p.on),p=l[Math.floor(Math.random()*l.length)];const o={id:Date.now().toString(36),pid:p.id,f:'Дуо',h:1,sum:p.pr,st:0,m:[{w:'she',t:'Привет! Тестовый заказ создан.'}]};ord.unshift(o);sv('sq_ord',ord);location.hash='#/o/'+o.id}
else if(a=='wg'){const i=W.g.indexOf(v);i<0?W.g.push(v):W.g.splice(i,1);$('#wz').innerHTML=wiz()}
else if(a=='wd'){W.d[+v]=(W.d[+v]+2)%3;$('#wz').innerHTML=wiz()}
else if(a=='wp'){W.s--;$('#wz').innerHTML=wiz()}
else if(a=='wn'){
if(W.s==0&&(!W.n.trim()||+W.a<18)){tt('Нужен ник и возраст от 18');return}
if(W.s==1&&(!W.g.length||!(+W.pr>0))){tt('Выбери игры и цену');return}
if(W.s==3){if(!W.ok||!W.bio.trim()){tt('Напиши о себе и подтверди 18+');return}
my={id:'my',n:esc(W.n.trim()),a:+W.a,g:W.g.slice(),pr:+W.pr,r:5,rv:0,on:true,v:false,h:7,bio:esc(W.bio.trim()),w:0,ph:W.ph.slice(),d:W.d.slice()};sv('sq_my',my);W={s:0,n:'',a:'',g:[],pr:'',bio:'',ph:[],ok:false,d:[2,2,2,2,2,1,1]};tt('Анкета опубликована');location.hash='#/p/my';return}
W.s++;$('#wz').innerHTML=wiz()}
}
const rs=f=>new Promise(res=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,480/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.8))};i.src=r.result};r.readAsDataURL(f)});

document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t)act(t.dataset.a,t.dataset.v,t)});
document.addEventListener('input',e=>{const t=e.target,d=t.dataset;
if(d.f){F[d.f]=t.type=='checkbox'?t.checked:t.value;F.n=12;$('#cl').innerHTML=catL()}
else if(d.b){B[d.b]=t.value;$('#bs').innerHTML=bsum()}
else if(d.w){W[d.w]=t.type=='checkbox'?t.checked:t.value}});
document.addEventListener('change',async e=>{if(e.target.id=='wf'){const fs=[...e.target.files].slice(0,3-W.ph.length);for(const f of fs)W.ph.push(await rs(f));$('#wz').innerHTML=wiz()}});
document.addEventListener('keydown',e=>{if(e.key=='Escape')nset(0);if(e.key=='Enter'&&e.target.id=='xin')act('send')});

/* INIT */
function init(){
app=$('#app');
const spl=$('#spl');
const hideSpl=()=>{if(spl&&spl.style.display!='none'){spl.style.transition='opacity .6s';spl.style.opacity=0;setTimeout(()=>{spl.style.display='none'},650)}};
setTimeout(hideSpl,5000);
/* ЛОГОТИП */
const nm=((window.CFG&&window.CFG.name)||'UEgirl').replace(/^UE/i,'');
const lh='UE<span style="color:#3dff8a">'+nm+'</span>';
const fill=(el,css)=>{if(el&&!el.textContent.trim()){el.innerHTML=lh;el.style.cssText+=css}};
const hd=$('#hd');
if(!$('#logo')&&hd){const l=document.createElement('a');l.id='logo';l.href='#/';hd.insertBefore(l,hd.firstChild)}
fill($('#logo'),';font:700 22px Sora,Manrope,sans-serif;color:#fff;text-decoration:none;letter-spacing:.02em');
fill($('#splLogo'),';font:700 clamp(36px,10vw,64px) Sora,Manrope,sans-serif;color:#fff;letter-spacing:.04em;text-align:center');
/* ЗАСТАВКА */
const bar=$('#splBar'),pc=$('#splPc');let n=0;
if(spl){const iv=setInterval(()=>{n=Math.min(100,n+Math.random()*14+6);if(bar)bar.style.width=n+'%';if(pc)pc.textContent=Math.floor(n)+'%';
if(n>=100){clearInterval(iv);setTimeout(hideSpl,200)}},120)}
/* ИНТЕРФЕЙС */
const mk=(tag,id,html)=>{const x=document.createElement(tag);x.id=id;if(html)x.innerHTML=html;document.body.appendChild(x);return x};
xw=mk('div','xw','<div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div><div id="xwt"></div>');xwt=$('#xwt');
mk('div','xt');xbar=mk('div','xbar');const rec=mk('div','xrec','● REC 00:00:00');
xo=mk('div','xo');xo.onclick=()=>nset(0);
const links=[['home','#/','Главная'],['match','#/match','Подбор'],['catalog','#/catalog','Каталог'],['top','#/top','Топ'],['events','#/events','События'],['become','#/become','Стать напарницей'],['safety','#/safety','Безопасность'],['me','#/me','Кабинет']];
xm=mk('nav','xm',links.map(l=>`<a href="${l[1]}" data-r="${l[0]}">${l[2]}</a>`).join(''));
xm.addEventListener('click',e=>{if(e.target.closest('a'))nset(0)});
mn=document.createElement('button');mn.id='mn';mn.setAttribute('aria-label','Меню');mn.textContent='☰';mn.onclick=()=>nset(!xm.classList.contains('open'));
const hr=$('.hd-r')||hd;if(hr)hr.appendChild(mn);
const lg=$('#logo');if(lg){lg.style.cursor='pointer';lg.addEventListener('click',()=>{location.hash='#/'})}
const bl=$('#bal');if(bl){bl.style.cursor='pointer';bl.addEventListener('click',()=>{location.hash='#/me'})}
setBal();render();
addEventListener('hashchange',trans);
addEventListener('scroll',()=>{const p=$('#prog');if(p){const h=document.documentElement;p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'}},{passive:true});
const t0=Date.now();setInterval(()=>{const q=Math.floor((Date.now()-t0)/1000);rec.textContent='● REC '+[q/3600,q/60%60,q%60].map(x=>String(Math.floor(x)).padStart(2,'0')).join(':')},1000);
setInterval(()=>{const l=P.filter(p=>p.on),p=l[Math.floor(Math.random()*l.length)];tt(`${p.n} онлайн · ищет дуо в ${p.g[0]}`)},24000);
}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
