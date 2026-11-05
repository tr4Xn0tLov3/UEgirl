(function(){
'use strict';
const TM=[900,1100,2000];
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const LS={g(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const NAME=(window.CFG&&window.CFG.name)||'UEgirl';
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const money=n=>Number(n).toLocaleString('ru-RU')+' ₽';
const pad=n=>(n<10?'0':'')+n;
const BAD=/@|https?:|t\.me|www\.|\d{6,}/i;
const LOAD=Date.now();

let bal=LS.g('sq_bal',3000),fav=LS.g('sq_fav',[]),ord=LS.g('sq_ord',[]),evs=LS.g('sq_ev',[]),promo=LS.g('sq_promo',''),my=LS.g('sq_my',null);
const T0=LS.g('sq_t0',0)||Date.now();LS.s('sq_t0',T0);
const sv=()=>{LS.s('sq_bal',bal);LS.s('sq_fav',fav);LS.s('sq_ord',ord);LS.s('sq_ev',evs);LS.s('sq_promo',promo);LS.s('sq_my',my)};
const ub=()=>{$('#bal').textContent=money(bal)};

/* ---------- данные ---------- */
const GM=[['CS2','🔫'],['Dota 2','🛡️'],['Valorant','🎯'],['Apex','🪂'],['Genshin','✨'],['Minecraft','⛏️'],['Fortnite','🏗️'],['Mobile Legends','📱']];
const FM=[['Дуо',1],['Обучение',1.3],['Чилл',0.8]];
const PROMOS={'89SQUAD':10,'BRATISHKIN':10,'UEGIRL':10};
const BIO={'CS2':['Играю на AWP и люблю клатчи. Без токсика, с шутками.','Разберём позиции и раскидки, подтяну тебя на Faceit.'],
'Dota 2':['Саппорт по душе: варды, стаки и тёплые слова в войсе.','Покажу, как не сливать линию. Терпеливо и по делу.'],
'Valorant':['Дуэлянт с хорошим аимом. Возьму тебя в ранкед.','Контроллер, смоки и командная игра. Поднимем ранг.'],
'Apex':['Лечу на драйве, беру топ-1 в паре.','Разберём ротации и бои, научу не умирать на дропе.'],
'Genshin':['Помогу с боссами, артефактами и абиссом.','Уютный сюжет и фарм в войсе, без спешки.'],
'Minecraft':['Строим базы, ходим в шахты, болтаем.','Редстоун и выживание: расскажу, с чего начать.'],
'Fortnite':['Строю быстро, снайплю метко. Погнали в дуо.','Покажу билды и редактирование, шаг за шагом.'],
'Mobile Legends':['Мейн-мидлейнер, играем в паре на ранг.','Подскажу героев и сборки, разберём ошибки.']};
const RV=[['Артём','Играли в Valorant, подняли ранг. Очень приятно в войсе.',5],['Дима','Объясняет понятно, без токсика. Взял ещё на час.',5],['Макс','Хорошее дуо, шутит к месту.',5],['Кирилл','Разобрали позиции в CS2. Пользы много.',4],['Саша','Вежливая, пришла вовремя.',5],['Ваня','Чилл в майнкрафте, отлично отдохнули.',5],['Егор','Научила нескольким фишкам в Dota.',4],['Лёша','Был скептиком, остался доволен.',5],['Никита','Играли в Apex до утра, огонь.',5],['Тимур','Спокойно и по делу.',4],['Рома','Отвечает быстро, играет сильно.',5],['Глеб','Рекомендую для новичков.',5]];
const EV=[{id:1,t:'Турнир 5×5',idea:'идея: матч-шоу в духе 89 squad',d:3,s:68,m:100,tx:'Пять на пять: команды собираются из напарниц и игроков. Комментаторы, призовой фонд, трансляция.'},
{id:2,t:'Катка с Братишкиным',idea:'идея: розыгрыш места в его катке',d:6,s:412,m:500,tx:'Идея: розыгрыш места в катке среди участников UEgirl. Условия обсуждаются.'},
{id:3,t:'Ночной дуо-марафон',idea:'формат сообщества',d:9,s:35,m:60,tx:'Шесть часов дуо с разными напарницами. Смена игры каждый час.'},
{id:4,t:'Мастер-класс по аиму',idea:'формат сообщества',d:12,s:51,m:80,tx:'Час теории и практики в войсе: разминка, чувствительность, контроль отдачи.'}];

function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const P=[];
function mk(id,n,a,h,gi,base,s,r,on,v,nw){const g=gi.map((x,i)=>[GM[x][0],Math.min(1000,base+i*50)]);P.push({id:id,n:n,a:a,h:h,g:g,s:s,r:r,on:!!on,v:!!v,nw:!!nw,bio:BIO[g[0][0]][id%2],rt:3+h%9,x:0})}
[['Mirai',21,330,[2,0],600,380,4.9,1,1],['Kitsune',23,20,[4,7],500,340,4.9,1,1],['Velvet',22,285,[1,3],700,310,4.8,0,1],['NoxAria',20,260,[0,2],850,290,4.9,1,1],['Pixie',19,170,[5,6],400,260,4.8,1,1],['Sakura',24,345,[4,5],450,230,4.7,0,1],['Ember',25,10,[3,2],750,200,4.8,1,1],['Frost',22,200,[0,1],650,185,4.7,1,1]].forEach((d,i)=>mk.apply(null,[i+1].concat(d)));
(function(){const r=mul(89);
'Luna,Aiko,Mia,Nika,Yuna,Alice,Zoe,Lina,Kira,Emi,Dina,Vika,Amy,Rina,Sofi,Lexa,Mika,Tana,Eva,Nana,Juno,Lola,Ivy,Reya,Toma,Sora,Wendy,Hana,Mari,Ruby,Cleo,Dasha,Stasya,Ola,Bella,Kaya'.split(',').forEach((n,i)=>{
const k=1+Math.floor(r()*3),gi=[Math.floor(r()*8)];
while(gi.length<k){const q=Math.floor(r()*8);if(gi.indexOf(q)<0)gi.push(q)}
const a=18+Math.floor(r()*10),h=Math.floor(r()*360),base=300+Math.floor(r()*14)*50,s=5+Math.floor(r()*r()*300),rt=Math.round((4.5+r()*.5)*10)/10,on=r()<.45,v=r()<.7;
mk(9+i,n,a,h,gi,base,s,rt,on,v,i>=30)})})();

const all=()=>my?P.concat([my]):P;
const byId=id=>all().find(p=>p.id==id);
const minp=p=>Math.min.apply(null,p.g.map(x=>x[1]));
const pr=(p,g)=>{const x=p.g.find(y=>y[0]===g);return x?x[1]:minp(p)};
const has=(p,g)=>p.g.some(x=>x[0]===g);
const uo=p=>ord.filter(o=>o.pid==p.id&&o.st!=='cancel').length;
const sales=(p,per)=>(per==='w'?Math.round(p.s*.12):per==='m'?Math.round(p.s*.4):p.s)+uo(p)+(p.x||0);
const rank=(per,g)=>all().filter(p=>!g||has(p,g)).sort((a,b)=>sales(b,per)-sales(a,per)||b.r-a.r);
const place=p=>rank('a','').findIndex(x=>x.id===p.id)+1;
const gi=g=>(GM.find(x=>x[0]===g)||['','🎮'])[1];

/* ---------- аватар ---------- */
function av(p,k){k=k||0;const h=(p.h+k*40)%360;
if(p.ph&&p.ph[k])return '<div class="av" style="--h:'+h+'"><img src="'+p.ph[k]+'" alt=""></div>';
const hair='hsl('+((h+200)%360)+' 60% '+(25+p.id%3*10)+'%)',sk='hsl('+(20+p.id%3*6)+' 60% '+(68+p.id%4*4)+'%)',cl='hsl('+h+' 70% 40%)';
return '<div class="av" style="--h:'+h+'"><svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMax slice"><path d="M10 160c0-34 22-48 50-48s50 14 50 48z" fill="'+cl+'"/><rect x="52" y="92" width="16" height="24" rx="6" fill="'+sk+'"/><path d="M28 70c0-30 14-44 32-44s32 14 32 44v22c0 4-8 10-12 10 4-20 0-30-20-30s-24 10-20 30c-4 0-12-6-12-10z" fill="'+hair+'"/><ellipse cx="60" cy="72" rx="20" ry="24" fill="'+sk+'"/><path d="M38 66c4-18 14-24 22-24s20 6 22 24c-8-8-16-10-22-10s-14 2-22 10z" fill="'+hair+'"/><path d="M30 76c-2-34 12-52 30-52s32 18 30 52" fill="none" stroke="#1a1a2e" stroke-width="5" stroke-linecap="round"/><rect x="24" y="70" width="10" height="20" rx="5" fill="#1a1a2e"/><rect x="86" y="70" width="10" height="20" rx="5" fill="#1a1a2e"/><circle cx="52" cy="74" r="2" fill="#222"/><circle cx="68" cy="74" r="2" fill="#222"/><path d="M54 84q6 4 12 0" stroke="#c0405a" stroke-width="2" fill="none" stroke-linecap="round"/></svg></div>'}

/* ---------- блоки ---------- */
function card(p,st){return '<div class="pc" '+(st||'')+' data-go="#/p/'+p.id+'">'+av(p)+'<div class="tg">'+(p.nw?'<span class="tag new">🆕 NEW</span>':'')+(p.s>=300?'<span class="tag hot">🔥 ТОП</span>':'')+'</div><button class="fv '+(fav.includes(p.id)?'on':'')+'" data-fv="'+p.id+'" aria-label="В избранное">♥</button><div class="in"><div class="nm"><span class="od '+(p.on?'':'off')+'"></span>'+esc(p.n)+', '+p.a+'</div><div class="mt">'+p.g.map(x=>x[0]).slice(0,2).join(' · ')+'</div><div class="pr">от '+minp(p)+' ₽/ч <span class="star">★'+p.r+'</span></div></div></div>'}
function best(p,g,pc,extra,why){return '<div class="best"><div data-go="#/p/'+p.id+'">'+av(p)+'</div><div class="bd"><span class="match">🔥 Совпадение '+pc+'%</span><h3>'+esc(p.n)+', '+p.a+' '+(p.on?'<span class="od"></span>':'')+'</h3><p>'+p.g.map(x=>x[0]).join(' · ')+'</p><div class="why">'+(why||'★ '+p.r+' · ответ ~'+p.rt+' мин')+'</div><div class="chips" style="margin-top:12px"><button class="btn sm" data-bk="'+p.id+'|'+(g||'')+'">Забронировать</button><a class="btn gh sm" href="#/p/'+p.id+'">Профиль</a>'+(extra||'')+'</div></div></div>'}
const endT=e=>{let t=T0+e.d*864e5;while(t<Date.now())t+=12096e5;return t};
const cdh=e=>{const d=Math.max(0,endT(e)-Date.now()),x=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];return['дн','ч','мин','с'].map((l,i)=>'<div>'+pad(x[i])+'<small>'+l+'</small></div>').join('')};
const evCard=e=>{const on=evs.includes(e.id),n=e.s+(on?1:0);return '<div class="ev" id="ev'+e.id+'"><div class="idea">'+e.idea+'</div><h3>'+e.t+'</h3><p>'+e.tx+'</p><div class="cd" data-cd="'+e.id+'">'+cdh(e)+'</div><div class="pb"><i style="width:'+Math.round(n/e.m*100)+'%"></i></div><div class="mu" style="font-size:12px">Записались: '+n+' из '+e.m+' (демо)</div><button class="btn '+(on?'gh':'')+' w" style="margin-top:12px" data-act="ev" data-v="'+e.id+'">'+(on?'Вы записаны ✓':'Записаться')+'</button></div>'};
const tickCd=()=>$$('[data-cd]').forEach(el=>{const e=EV.find(x=>x.id==el.dataset.cd);if(e)el.innerHTML=cdh(e)});
const stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);

/* ---------- утилиты ---------- */
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2400)}
function sheet(h){const s=$('#sheet');s.innerHTML='<div class="sh-in">'+h+'</div>';s.classList.add('open')}
function unsheet(){$('#sheet').classList.remove('open')}
function confetti(){const c=['#ff4fa3','#8b5cff','#3dffa2','#ffc857','#fff'];for(let i=0;i<46;i++){const e=document.createElement('i');e.className='cf';e.style.cssText='left:'+Math.random()*100+'vw;background:'+c[i%5]+';--dx:'+((Math.random()-.5)*200)+'px;animation-duration:'+(1.8+Math.random()*1.6)+'s;animation-delay:'+Math.random()*.4+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),4200)}}
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06}):null;
function onView(el,f){if(!('IntersectionObserver' in window)){f();return}const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();f()}});o.observe(el)}
let timers=[];
const clr=()=>{timers.forEach(t=>{clearInterval(t);clearTimeout(t)});timers=[]};
const ti=(f,ms)=>{const t=setInterval(f,ms);timers.push(t);return t};
const to=(f,ms)=>{const t=setTimeout(f,ms);timers.push(t);return t};

/* ---------- роутер и кинопереход ---------- */
const R={};
let busy=false,pend=null,scene=0,shown='';
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
const TT={'':'Главная',catalog:'Каталог',match:'Подбор',top:'Топ',p:'Профиль',book:'Бронь',o:'Заказ',events:'Ивенты',become:'Стать напарницей',safety:'Безопасность',me:'Кабинет'};
function put(h){location.hash=h;render()}
function go(h){
if(h.charAt(0)!=='#')h='#'+h;
if(h===shown)return;
if(busy){pend=h;return}
if(RM){put(h);return}
busy=true;unsheet();
const w=$('#wipe');
$('#wt').innerHTML='<small>Сцена '+pad(++scene)+'</small>'+(TT[h.slice(2).split('/')[0]]||'');
w.className='';void w.offsetWidth;w.className='on';
setTimeout(()=>{put(h);w.className='on fl'},TM[0]);
setTimeout(()=>{w.className='out'},TM[1]);
setTimeout(()=>{w.className='';busy=false;if(pend){const q=pend;pend=null;go(q)}},TM[2]);
}
function render(){
clr();shown=location.hash||'#/';
const m=shown.slice(2).split('/'),r=m[0],f=R[r]||R[''];
const o=f(m[1])||['<h1>Пусто</h1>'];
const app=$('#app');app.innerHTML='<div class="pg">'+o[0]+'</div>';
const pg=app.firstChild;
Array.from(pg.children).forEach((e,i)=>{if(e.matches('h1,.cta'))return;if(i<5){e.classList.add('ent');e.style.setProperty('--i',i)}else{e.classList.add('rv');if(io)io.observe(e);else e.classList.add('in')}});
const at={p:'catalog',book:'catalog',o:'me',events:'x',safety:'x'},rr=at[r]||r;
$$('#tb a').forEach(a=>a.classList.toggle('on',a.getAttribute('href').slice(2).split('/')[0]===rr));
scrollTo({top:0,left:0,behavior:'instant'});
if(o[1])o[1]();
}

/* ---------- ГЛАВНАЯ ---------- */
const HW={p:['Выбери игру и напарницу','Забронируй время и оплати внутри UEgirl','Играйте, затем отпусти оплату и оставь оценку'],q:['Создай анкету за 4 шага','Получай заказы и общайся в чате','Получи 85% стоимости после игры']};
function hw(k){const e=$('#hw');if(e)e.innerHTML=HW[k].map((t,i)=>'<div class="rule"><em>'+['1️⃣','2️⃣','3️⃣'][i]+'</em><div><b>'+t+'</b></div></div>').join('')}
let qi=0;
function qm(g){const b=$('#qm');if(!b)return;b.innerHTML='<div class="radar"></div><p class="c">Ищем напарницу…</p>';
const a=all().filter(p=>p.on&&has(p,g)).sort((x,y)=>y.r-x.r),l=a.length?a:all().filter(p=>has(p,g));
to(()=>{const p=l[qi++%l.length];b.innerHTML=best(p,g,Math.max(78,96-qi%5*4),'<button class="btn gh sm" data-act="qg" data-v="'+g+'">Другую</button>')},1400)}
R['']=()=>{
const hot=rank('w','').slice(0,5),on=all().filter(p=>p.on),nw=all().filter(p=>p.nw).slice(0,6);
const mq=[0,1].map(()=>GM.map(g=>'<span>'+g[0]+'</span>').join('')).join('');
const h='<div class="hero"><div class="rec" id="tc">REC 00:00:00</div><h1>Не хватает <span class="g">пятого</span> в сквад?</h1><p>Напарницы для дуо, обучения и чилла в войсе. Выбери игру, остальное подберём.</p><div class="chips"><a class="btn" href="#/match">🎯 Подобрать</a><a class="btn gh" href="#/catalog">Каталог</a></div><div class="fan">'+hot.map((p,k)=>card(p,'style="--k:'+k+'"')).join('')+'</div></div>'
+'<div class="mq"><div>'+mq+'</div></div>'
+'<div class="promo"><div><b>89SQUAD</b><p>−10% на первую катку. Работает и BRATISHKIN</p></div><button class="btn gh sm" data-act="promo" data-v="89SQUAD">Применить</button></div>'
+'<div class="sec"><div class="sh"><h2>Сейчас онлайн</h2><a href="#/catalog">Все →</a></div><div class="rail">'+on.slice(0,14).map(p=>'<a class="story" href="#/p/'+p.id+'"><div class="rg">'+av(p)+'</div>'+esc(p.n)+'</a>').join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Быстрый подбор</h2></div><div class="box"><p>Выбери игру, найдём напарницу онлайн.</p><div class="chips" style="margin:12px 0">'+GM.map(g=>'<button class="chip" data-act="qg" data-v="'+g[0]+'">'+g[1]+' '+g[0]+'</button>').join('')+'</div><div id="qm"></div><a class="lnk" href="#/match">Точный подбор по возрасту и цене →</a></div></div>'
+'<div class="sec"><div class="cnt"><div><b data-n="'+all().length+'">0</b><span>анкет</span></div><div><b data-n="'+on.length+'">0</b><span>онлайн</span></div><div><b data-n="8">0</b><span>игр</span></div></div><p class="c" style="font-size:11px;margin-top:8px">Цифры демонстрационные</p></div>'
+'<div class="sec"><div class="sh"><h2>Игры</h2></div><div class="rail">'+GM.map(g=>'<button class="chip" data-act="cg" data-v="'+g[0]+'">'+g[1]+' '+g[0]+'</button>').join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Хиты недели</h2><a href="#/top">Топ →</a></div><div class="rail">'+rank('w','').slice(0,8).map(p=>card(p)).join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Новенькие</h2></div><div class="grid">'+nw.map(p=>card(p)).join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Как это работает</h2></div><div class="tabs" id="hwt"><button class="on" data-act="hw" data-v="p">Я играю</button><button data-act="hw" data-v="q">Я напарница</button></div><div id="hw"></div></div>'
+'<div class="sec"><div class="sh"><h2>Ивенты</h2><a href="#/events">Все →</a></div><div class="gap">'+EV.slice(0,2).map(evCard).join('')+'</div></div>'
+'<div class="sec"><div class="box c"><h3>Безопасно по правилам</h3><p style="margin:8px 0 14px">Только игры, контакты скрыты, оплата внутри.</p><a class="btn gh" href="#/safety">Как мы защищаем →</a></div></div>';
return[h,()=>{
const tc=()=>{const s=Math.floor((Date.now()-LOAD)/1000),e=$('#tc');if(e)e.textContent='REC '+pad(Math.floor(s/3600))+':'+pad(Math.floor(s/60)%60)+':'+pad(s%60)};
tc();ti(tc,1000);ti(tickCd,1000);hw('p');
$$('[data-n]').forEach(el=>onView(el,()=>{const n=+el.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1200);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)}))
}]};

/* ---------- КАТАЛОГ ---------- */
let F={q:'',g:'',on:false,mp:1000,so:'pop',n:12};
function cat(){
let l=all().filter(p=>(!F.g||has(p,F.g))&&(!F.on||p.on)&&pr(p,F.g)<=F.mp&&(!F.q||p.n.toLowerCase().indexOf(F.q.toLowerCase())>=0));
const s={pop:(a,b)=>sales(b,'a')-sales(a,'a'),rate:(a,b)=>b.r-a.r||sales(b,'a')-sales(a,'a'),cheap:(a,b)=>pr(a,F.g)-pr(b,F.g),exp:(a,b)=>pr(b,F.g)-pr(a,F.g)}[F.so];
l.sort(s);
$('#cc').textContent='Найдено: '+l.length;
$('#cg').innerHTML=l.slice(0,F.n).map(p=>card(p)).join('')||'<p class="c" style="grid-column:1/-1">Никого не нашли. Смягчи фильтры.</p>';
$('#cm').innerHTML=l.length>F.n?'<button class="btn gh" data-act="fm">Показать ещё</button>':'';
}
R.catalog=()=>{
const h='<h1>Каталог</h1><div class="gap" style="margin-top:14px"><input id="q" placeholder="Поиск по нику" value="'+esc(F.q)+'"><div class="chips" id="fg"><button class="chip '+(F.g===''?'on':'')+'" data-act="fg" data-v="">Все</button>'+GM.map(g=>'<button class="chip '+(F.g===g[0]?'on':'')+'" data-act="fg" data-v="'+g[0]+'">'+g[1]+' '+g[0]+'</button>').join('')+'</div>'
+'<div class="row2"><select id="so">'+[['pop','Популярные'],['rate','По рейтингу'],['cheap','Дешёвые'],['exp','Дорогие']].map(x=>'<option value="'+x[0]+'" '+(F.so===x[0]?'selected':'')+'>'+x[1]+'</option>').join('')+'</select><select id="mp">'+[1000,900,800,700,600,500,400].map(x=>'<option value="'+x+'" '+(F.mp===x?'selected':'')+'>до '+x+' ₽</option>').join('')+'</select></div>'
+'<div class="chips"><button class="chip '+(F.on?'on':'')+'" data-act="fo">🟢 Только онлайн</button></div><div class="mu" id="cc"></div></div><div class="grid" id="cg" style="margin-top:12px"></div><div class="c" style="margin:18px 0" id="cm"></div>';
return[h,()=>{cat();$('#q').oninput=e=>{F.q=e.target.value;F.n=12;cat()};$('#so').onchange=e=>{F.so=e.target.value;cat()};$('#mp').onchange=e=>{F.mp=+e.target.value;F.n=12;cat()}}]};

/* ---------- ПОДБОР ---------- */
let M={g:'',a1:18,a2:30,p1:300,p2:1000,on:false,v:false,n:6};
function mres(){
const pm=(M.p1+M.p2)/2,rg=Math.max(1,M.p2-M.p1);
const l=all().map(p=>{const pp=pr(p,M.g),miss=[];
if(M.g&&!has(p,M.g))miss.push('игра '+M.g);
if(p.a<M.a1||p.a>M.a2)miss.push('возраст '+p.a);
if(pp<M.p1||pp>M.p2)miss.push('цена '+pp+' ₽');
if(M.on&&!p.on)miss.push('не онлайн');
if(M.v&&!p.v)miss.push('без войса');
const pct=Math.max(35,Math.min(99,Math.round(80+(p.r-4.5)*30-Math.abs(pp-pm)/rg*12+(p.on?4:0)-miss.length*18)));
return{p:p,miss:miss,pct:pct}});
const ok=l.filter(x=>!x.miss.length).sort((a,b)=>b.pct-a.pct),box=$('#mr');
if(ok.length){
const rest=ok.slice(1,1+M.n);
box.innerHTML='<div class="mu" style="margin-bottom:10px">Подходят: '+ok.length+'</div>'+best(ok[0].p,M.g,ok[0].pct)+(rest.length?'<div class="grid" style="margin-top:14px">'+rest.map(x=>card(x.p)).join('')+'</div>':'')+(ok.length>1+M.n?'<div class="c" style="margin-top:14px"><button class="btn gh" data-act="mm">Показать ещё</button></div>':'');
}else{
const near=l.sort((a,b)=>a.miss.length-b.miss.length||b.pct-a.pct).slice(0,3);
box.innerHTML='<div class="box c" style="margin-bottom:12px"><b>Точного совпадения нет</b><p>Вот ближайшие варианты:</p></div><div class="gap">'+near.map(x=>best(x.p,M.g,x.pct,'','Не совпало: '+x.miss.join(', '))).join('')+'</div>'}}
R.match=()=>{
const h='<h1>Подбор</h1><p>Расскажи, что нужно. Покажем лучшую.</p><div class="box" style="margin-top:14px"><div class="fld"><label>Игра</label><select id="mg"><option value="">Любая</option>'+GM.map(g=>'<option '+(M.g===g[0]?'selected':'')+'>'+g[0]+'</option>').join('')+'</select></div>'
+'<div class="fld"><label>Возраст</label><div class="rng"><input id="ma1" type="number" min="18" max="40" value="'+M.a1+'"><span>—</span><input id="ma2" type="number" min="18" max="40" value="'+M.a2+'"></div></div>'
+'<div class="fld"><label>Цена, ₽ за час</label><div class="rng"><input id="mp1" type="number" min="300" max="1000" step="50" value="'+M.p1+'"><span>—</span><input id="mp2" type="number" min="300" max="1000" step="50" value="'+M.p2+'"></div></div>'
+'<div class="sw"><span>Только онлайн</span><input type="checkbox" id="mo" '+(M.on?'checked':'')+'></div><div class="sw"><span>Только с войсом</span><input type="checkbox" id="mv" '+(M.v?'checked':'')+'></div></div><div id="mr" style="margin-top:16px"></div>';
return[h,()=>{const rd=()=>{M.g=$('#mg').value;M.a1=+$('#ma1').value||18;M.a2=+$('#ma2').value||40;M.p1=+$('#mp1').value||300;M.p2=+$('#mp2').value||1000;M.on=$('#mo').checked;M.v=$('#mv').checked;M.n=6;mres()};
['mg','ma1','ma2','mp1','mp2','mo','mv'].forEach(i=>{$('#'+i).oninput=rd;$('#'+i).onchange=rd});mres()}]};

/* ---------- ТОП ---------- */
let TP={per:'w',g:''};
function topv(){
const l=rank(TP.per,TP.g),t3=l.slice(0,3),mx=l.length?sales(l[0],TP.per)||1:1;
$('#tv').innerHTML='<div class="tabs">'+[['w','Неделя'],['m','Месяц'],['a','Всё время']].map(x=>'<button class="'+(TP.per===x[0]?'on':'')+'" data-act="tp" data-v="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>'
+'<div class="pod">'+[1,0,2].map(k=>{const p=t3[k];return p?'<div class="p'+(k+1)+'" style="--i:'+[3,1,2][k]+'" data-go="#/p/'+p.id+'">'+av(p)+'<div class="md">'+['🥇','🥈','🥉'][k]+'</div><b>'+esc(p.n)+'</b><span>'+sales(p,TP.per)+' заказов</span></div>':'<div></div>'}).join('')+'</div>'
+'<div>'+l.slice(3,15).map((p,i)=>'<div class="top-r" data-go="#/p/'+p.id+'"><span class="n">'+(i+4)+'</span>'+av(p)+'<div><b>'+esc(p.n)+'</b> <span class="mu" style="font-size:12px">'+p.g[0][0]+'</span><div class="bar"><i data-w="'+Math.round(sales(p,TP.per)/mx*100)+'"></i></div></div><div class="sl">'+sales(p,TP.per)+'<small>заказов</small></div></div>').join('')+'</div>';
setTimeout(()=>$$('.top-r .bar i').forEach(i=>{i.style.width=i.dataset.w+'%'}),80)}
R.top=()=>{
const l=rank('a','');
const mine=my?'<div class="mine">Твоя анкета «'+esc(my.n)+'»: место №'+(l.findIndex(x=>x.id===my.id)+1)+'. Подними её тестовым заказом в кабинете.</div>':'';
return['<h1>Топ напарниц</h1><p>Кого бронируют чаще всего. Цифры демонстрационные.</p>'+mine+'<div class="chips" style="margin:12px 0" id="tgc"><button class="chip on" data-act="tg" data-v="">Все игры</button>'+GM.map(g=>'<button class="chip" data-act="tg" data-v="'+g[0]+'">'+g[1]+' '+g[0]+'</button>').join('')+'</div><div id="tv"></div>',topv]};

/* ---------- ПРОФИЛЬ ---------- */
R.p=id=>{
const p=byId(id);if(!p)return['<h1>Анкета не найдена</h1><a class="btn" href="#/catalog">В каталог</a>'];
const sim=all().filter(x=>x.id!==p.id&&x.g.some(g=>has(p,g[0]))).sort((a,b)=>b.r-a.r).slice(0,6);
const h='<div class="cv" style="--h:'+p.h+'">'+av(p)+'</div>'
+'<div class="pf-h"><h1>'+esc(p.n)+', '+p.a+' <span class="od '+(p.on?'':'off')+'"></span></h1><p>★ '+p.r+' · '+(p.on?'онлайн':'не в сети')+(p.v?' · 🎙 войс':'')+'</p></div>'
+'<div class="stats"><div><b>№'+place(p)+'</b><span>в топе</span></div><div><b>'+sales(p,'a')+'</b><span>заказов</span></div><div><b>~'+p.rt+' мин</b><span>ответ</span></div></div>'
+'<p>'+esc(p.bio)+'</p>'
+'<div class="sec"><div class="sh"><h2>Игры</h2></div><div class="gap">'+p.g.map(x=>'<div class="gm"><div><b>'+gi(x[0])+' '+x[0]+'</b><div class="mu" style="font-size:12px">Дуо · Обучение · Чилл</div></div><span class="pr">'+x[1]+' ₽/ч</span><button class="btn sm" data-bk="'+p.id+'|'+x[0]+'">Выбрать</button></div>').join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Фото</h2></div><div class="gal">'+[0,1,2].map(k=>'<div data-act="lb">'+av(p,k)+'</div>').join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Отзывы</h2></div><div class="gap">'+[0,1,2].map(k=>{const r=RV[(p.id*3+k)%RV.length];return '<div class="rvw"><b>'+r[0]+'</b> <span class="star">'+stars(r[2])+'</span><p>'+r[1]+'</p></div>'}).join('')+'</div></div>'
+'<div class="sec"><div class="sh"><h2>Похожие напарницы</h2></div><div class="rail">'+sim.map(x=>card(x)).join('')+'</div></div>'
+'<div class="c" style="margin-bottom:10px"><button class="lnk" data-fv="'+p.id+'">♥ В избранное</button><button class="lnk" style="margin-left:18px" data-act="rep">Пожаловаться</button></div><div style="height:70px"></div>'
+'<div class="cta"><b>от '+minp(p)+' ₽</b><button class="btn" data-bk="'+p.id+'|">Забронировать</button></div>';
return[h]};

/* ---------- БРОНЬ ---------- */
let BK=null;
const SL=['Сейчас','Через 30 мин','Сегодня 20:00','Сегодня 22:00'];
function bcalc(p){const base=Math.round(pr(p,BK.g)*FM[BK.f][1]*BK.h/10)*10,pc=PROMOS[(BK.code||'').toUpperCase()]||0,d=Math.round(base*pc/100),fee=Math.round((base-d)*.1);return{base:base,d:d,fee:fee,tot:base-d+fee,pc:pc}}
function bv(){const p=byId(BK.pid),c=bcalc(p),ch=(a,arr,cur)=>arr.map((x,i)=>'<button class="chip '+(i===cur?'on':'')+'" data-act="'+a+'" data-v="'+i+'">'+x+'</button>').join('');
$('#bk').innerHTML='<div class="fld"><label>Игра</label><div class="chips">'+p.g.map(x=>'<button class="chip '+(x[0]===BK.g?'on':'')+'" data-act="bg" data-v="'+x[0]+'">'+x[0]+' · '+x[1]+' ₽</button>').join('')+'</div></div>'
+'<div class="fld"><label>Формат</label><div class="chips">'+ch('bf',FM.map(x=>x[0]),BK.f)+'</div></div>'
+'<div class="fld"><label>Часы</label><div class="chips">'+ch('bh',[1,2,3,4,5,6].map(x=>x+' ч'),BK.h-1)+'</div></div>'
+'<div class="fld"><label>Время</label><div class="chips">'+ch('bs',SL,BK.s)+'</div></div>'
+'<div class="fld"><label>Промокод</label><input id="bpc" placeholder="89SQUAD" value="'+esc(BK.code||'')+'"></div>'
+'<div class="tot"><div><span>'+BK.g+' · '+FM[BK.f][0]+' × '+BK.h+' ч</span><span>'+money(c.base)+'</span></div>'+(c.d?'<div><span>Промокод −'+c.pc+'%</span><span>−'+money(c.d)+'</span></div>':'')+'<div><span>Сервисный сбор 10%</span><span>'+money(c.fee)+'</span></div><div class="sum"><span>Итого</span><span>'+money(c.tot)+'</span></div></div>'
+'<p style="font-size:12px;margin:10px 0">Баланс: '+money(bal)+'. Деньги держатся внутри UEgirl и уходят напарнице после игры. Контакты не передаются.</p><button class="btn w" data-act="pay">Оплатить '+money(c.tot)+'</button>'}
R.book=id=>{
const p=byId(id);if(!p)return R.p(id);
if(!BK||BK.pid!=p.id)BK={pid:p.id,g:p.g[0][0],f:0,h:1,s:0,code:promo};
return['<h1>Бронь</h1><div class="box" style="display:flex;gap:12px;align-items:center"><div style="width:64px;border-radius:12px;overflow:hidden">'+av(p)+'</div><div><b>'+esc(p.n)+', '+p.a+'</b><div class="mu">★ '+p.r+' · ответ ~'+p.rt+' мин</div></div></div><div id="bk" style="margin-top:16px"></div>',bv]};

/* ---------- ЗАКАЗ ---------- */
const OS=['Ждёт','Подтверждён','Идёт','Завершён','Оплачен'],OI={wait:0,ok:1,play:2,done:3,paid:4};
const ST={wait:'Ждёт',ok:'Подтверждён',play:'Идёт',done:'Завершён',paid:'Оплачен',cancel:'Отменён'};
const CAN=['Окей 👌','Скину инвайт, как зайдёшь в лобби','Давай в войсе, так веселее','Звучит круто!','Ты больше на атаке или на защите?','Секунду, запущу игру'];
let curO=0;
const gO=id=>ord.find(o=>o.id==id);
const pf=o=>byId(o.pid)||{id:o.pid,h:o.hue,n:o.pn,g:[],rt:5,r:5};
function ovr(id){const o=gO(id),e=$('#ov');if(!o||!e)return;const p=pf(o),i=OI[o.st],c=o.st==='cancel';let b='';
if(c)b='<p>Заказ отменён, деньги вернулись на баланс.</p>';
if(o.st==='wait')b='<p>Ждём подтверждения от '+esc(p.n)+'…</p><button class="btn gh w" data-act="cancel">Отменить и вернуть деньги</button>';
if(o.st==='ok')b='<p>'+esc(p.n)+' подтвердила. Начинайте, когда будете готовы.</p><button class="btn w" data-act="start">▶ Начать игру</button><button class="btn gh w" style="margin-top:8px" data-act="cancel">Отменить заказ</button>';
if(o.st==='play')b='<div class="eq">'+[0,1,2,3,4,5,6,7].map(k=>'<i style="--i:'+k+'"></i>').join('')+'</div><p class="c">Идёт игра. <b id="ot"></b></p><p class="c" style="font-size:12px">В демо 1 час = 6 секунд</p>';
if(o.st==='done')b='<p class="c">Игра завершена. Оцени напарницу:</p><div class="stars">'+[1,2,3,4,5].map(n=>'<button data-act="star" data-v="'+n+'" class="'+(o.rate>=n?'on':'')+'">⭐</button>').join('')+'</div><button class="btn gr w" style="margin-top:14px" data-act="release">Отпустить оплату</button>';
if(o.st==='paid')b='<p class="c">Оплата отпущена. Спасибо за игру!</p><a class="btn w" href="#/p/'+p.id+'">К анкете</a>';
e.innerHTML='<div class="box" style="display:flex;gap:12px;align-items:center"><div style="width:64px;border-radius:12px;overflow:hidden">'+av(p)+'</div><div><b>'+esc(p.n)+'</b><div class="mu" style="font-size:13px">'+o.g+' · '+FM[o.f][0]+' · '+o.h+' ч · '+o.slot+'</div><b class="star">'+money(o.total)+'</b></div></div>'
+(c?'':'<div class="steps">'+OS.map((s,j)=>'<div class="'+(j<=i?'d':'')+'"><i>'+(j+1)+'</i>'+s+'</div>').join('')+'</div>')+'<div class="box" style="margin-top:12px">'+b+'</div>'}
function chv(){const o=gO(curO),e=$('#chat');if(!o||!e)return;e.innerHTML=o.chat.map(x=>'<div class="msg '+(x.m?'me':'')+'">'+esc(x.t)+'</div>').join('');e.scrollTop=e.scrollHeight}
function bot(o,t){o.chat.push({m:0,t:t});sv();if(curO===o.id)chv()}
R.o=id=>{
const o=gO(id);if(!o)return['<h1>Заказ не найден</h1><a class="btn" href="#/me">В кабинет</a>'];
curO=o.id;
return['<h1>Заказ №'+o.id+'</h1><div id="ov" style="margin-top:14px"></div><div class="sec"><div class="sh"><h2>Чат</h2></div><div class="box"><div class="chat" id="chat"></div><div class="cin"><input id="ci" placeholder="Сообщение" maxlength="200"><button class="btn sm" data-act="send">→</button></div><p style="font-size:11px;margin-top:8px">Контакты и ссылки блокируются. Общение только здесь.</p></div></div>',()=>{
ovr(o.id);chv();
ti(()=>{const x=gO(curO);if(!x)return;
if(x.st==='wait'&&Date.now()-x.t0>3500){x.st='ok';sv();ovr(x.id);bot(x,'Привет! Я готова, скажи, когда начнём 🎮')}
if(x.st==='play'){const left=x.h*6000-(Date.now()-x.ts);if(left<=0){x.st='done';sv();ovr(x.id)}else{const e=$('#ot');if(e)e.textContent='Осталось ~'+Math.ceil(left/6000*60)+' мин'}}},400)}]};

/* ---------- ИВЕНТЫ ---------- */
R.events=()=>{
const t3=rank('w','').slice(0,3);
return['<h1>Ивенты</h1><p>Турниры, розыгрыши и марафоны. Всё придумано для демо.</p><div class="gap" style="margin-top:14px">'+EV.map(evCard).join('')+'</div>'
+'<div class="sec"><div class="sh"><h2>Топ недели</h2><a href="#/top">Весь топ →</a></div><div class="gap">'+t3.map((p,i)=>'<div class="ord" data-go="#/p/'+p.id+'">'+av(p)+'<div><b>'+['🥇','🥈','🥉'][i]+' '+esc(p.n)+'</b><div class="mu" style="font-size:12px">'+sales(p,'w')+' заказов за неделю</div></div></div>').join('')+'</div></div>'
+'<div class="sec"><div class="box"><h3>Промокод</h3><p style="margin:6px 0 12px">Попробуй 89SQUAD, BRATISHKIN или UEGIRL.</p><div class="cin"><input id="pcin" placeholder="Введи код"><button class="btn sm" data-act="pcheck">OK</button></div></div></div>',()=>ti(tickCd,1000)]};

/* ---------- СТАТЬ ---------- */
let W={s:0,n:'',a:'',ph:[],gs:{},v:true,bio:'',err:''};
function mkMy(){return{id:1000,n:W.n,a:+W.a,h:Array.from(W.n).reduce((s,c)=>s+c.charCodeAt(0),0)*7%360,g:GM.filter(g=>W.gs[g[0]]).map(g=>[g[0],W.gs[g[0]]]),s:0,r:5,on:true,v:W.v,bio:W.bio||'Привет! Играю и общаюсь без токсика.',nw:true,ph:W.ph.filter(Boolean),rt:5,x:0}}
function rdw(){const g=id=>$('#'+id);
if(W.s===0){W.n=g('wn').value.trim();W.a=g('wa').value;if(W.n.length<3)return'Ник от 3 символов';if(BAD.test(W.n))return'В нике нельзя контакты';const a=+W.a;if(!(a>=18&&a<=45))return'Возраст от 18 до 45'}
if(W.s===2){const gs={};let bad='';GM.forEach(x=>{const c=$('[data-wg="'+x[0]+'"]');if(c&&c.checked){const p=+$('[data-wp="'+x[0]+'"]').value;if(!(p>=300&&p<=1000))bad='Цена от 300 до 1000 ₽';gs[x[0]]=Math.round(p/50)*50}});W.gs=gs;W.v=g('wv').checked;W.bio=g('wb').value.trim();if(bad)return bad;if(!Object.keys(gs).length)return'Выбери хотя бы одну игру';if(BAD.test(W.bio))return'В описании нельзя контакты'}
if(W.s===3&&!g('w18').checked)return'Подтверди, что тебе 18+';
return''}
function wz(){const w=W,e=$('#wz');if(!e)return;
let b='';
if(w.s===0)b='<div class="fld"><label>Ник</label><input id="wn" maxlength="16" value="'+esc(w.n)+'" placeholder="Например, Mirai"></div><div class="fld"><label>Возраст (18–45)</label><input id="wa" type="number" min="18" max="45" value="'+esc(w.a)+'"></div>';
if(w.s===1)b='<p style="margin-bottom:12px">До трёх фото. Первое станет главным. Можно пропустить: тогда будет силуэт.</p><div class="ph">'+[0,1,2].map(i=>'<label>'+(w.ph[i]?'<img src="'+w.ph[i]+'" alt="">':'＋')+'<input type="file" accept="image/*" data-ph="'+i+'"></label>').join('')+'</div>';
if(w.s===2)b='<p style="margin-bottom:10px">Отметь игры и поставь цену за час (300–1000 ₽).</p>'+GM.map(g=>'<div class="gsel"><label class="sw" style="border:0"><span>'+g[1]+' '+g[0]+'</span><input type="checkbox" data-wg="'+g[0]+'" '+(w.gs[g[0]]?'checked':'')+'></label><input type="number" data-wp="'+g[0]+'" min="300" max="1000" step="50" value="'+(w.gs[g[0]]||500)+'"></div>').join('')+'<div class="sw"><span>🎙 Есть голос</span><input type="checkbox" id="wv" '+(w.v?'checked':'')+'></div><div class="fld" style="margin-top:12px"><label>О себе (без контактов)</label><textarea id="wb" maxlength="200">'+esc(w.bio)+'</textarea></div>';
if(w.s===3){const p=mkMy();b='<p style="margin-bottom:12px">Так тебя увидят в каталоге:</p><div style="max-width:200px;margin:0 auto 14px">'+card(p).replace('data-go=','data-x=')+'</div><div class="sw"><span>Мне есть 18 лет</span><input type="checkbox" id="w18"></div>'}
e.innerHTML='<div class="dots">'+[0,1,2,3].map(i=>'<i class="'+(i<=w.s?'on':'')+'"></i>').join('')+'</div><h3 style="margin-bottom:12px">Шаг '+(w.s+1)+' из 4</h3>'+b+'<div class="err">'+esc(w.err)+'</div><div class="row2" style="margin-top:14px">'+(w.s?'<button class="btn gh" data-act="wb">Назад</button>':'<span></span>')+'<button class="btn" data-act="wn">'+(w.s<3?'Далее':'Опубликовать')+'</button></div>'}
function calc(){const h=+$('#ch').value,p=+$('#cpr').value;$('#chv').textContent=h+' ч';$('#cprv').textContent=p+' ₽';$('#ci2').textContent=money(Math.round(h*p*4.3*.85))}
R.become=()=>{
const h='<h1>Стать <span class="g">напарницей</span></h1><p>Играй, общайся и зарабатывай. Анкета появится в каталоге сразу.</p>'
+'<div class="calc" style="margin-top:14px"><p style="color:#fff">Доход в месяц</p><b id="ci2">0 ₽</b><div class="fld" style="margin-top:12px"><label style="color:#fff">Часов в неделю: <span id="chv"></span></label><input type="range" id="ch" min="1" max="40" value="10"></div><div class="fld"><label style="color:#fff">Цена за час: <span id="cprv"></span></label><input type="range" id="cpr" min="300" max="1000" step="50" value="500"></div><p style="font-size:11px;color:rgba(255,255,255,.8)">Часы × цена × 4,3 недели × 85%. Демо-цифры.</p></div>'
+'<div class="sec"><div class="box" id="wz"></div></div>';
return[h,()=>{calc();$('#ch').oninput=calc;$('#cpr').oninput=calc;
if(my){$('#wz').innerHTML='<h3>Твоя анкета уже в каталоге</h3><p style="margin:6px 0 14px">«'+esc(my.n)+'» видна в каталоге, подборе и топе.</p><div class="row2"><a class="btn" href="#/p/1000">Открыть</a><button class="btn gh" data-act="mydel">Удалить</button></div>'}else wz()}]};

/* ---------- КАБИНЕТ ---------- */
let MT='o';
function mev(){const e=$('#mv2');if(!e)return;let h='';
if(MT==='o')h=ord.length?'<div class="gap">'+ord.slice().reverse().map(o=>{const p=pf(o);return '<div class="ord" data-go="#/o/'+o.id+'">'+av(p)+'<div><b>'+esc(p.n)+'</b><div class="mu" style="font-size:12px">'+o.g+' · '+o.h+' ч</div></div><div class="st2">'+ST[o.st]+'<br>'+money(o.total)+'</div></div>'}).join('')+'</div>':'<div class="box c"><p>Заказов пока нет.</p><a class="btn sm" href="#/catalog" style="margin-top:10px">Найти напарницу</a></div>';
if(MT==='f'){const l=fav.map(i=>byId(i)).filter(Boolean);h=l.length?'<div class="grid">'+l.map(p=>card(p)).join('')+'</div>':'<div class="box c"><p>Избранное пусто. Жми ♥ на карточке.</p></div>'}
if(MT==='m')h=my?'<div style="max-width:200px;margin:0 auto 14px">'+card(my)+'</div><div class="stats"><div><b>№'+place(my)+'</b><span>в топе</span></div><div><b>'+sales(my,'a')+'</b><span>заказов</span></div><div><b>'+my.g.length+'</b><span>игр</span></div></div><div class="row2"><button class="btn" data-act="mytest">+ тестовый заказ</button><button class="btn gh" data-act="mydel">Удалить</button></div>':'<div class="box c"><p>Анкеты ещё нет.</p><a class="btn sm" href="#/become" style="margin-top:10px">Создать</a></div>';
e.innerHTML=h}
R.me=()=>['<h1>Кабинет</h1><div class="box c" style="margin-top:14px"><p>Баланс (виртуальный)</p><b id="mb" style="font:800 34px Sora;color:var(--gr)">'+money(bal)+'</b><div style="margin-top:10px"><button class="btn sm" data-act="topup">+ 1 000 ₽</button></div></div><div class="tabs" id="mtt" style="margin-top:14px"><button class="'+(MT==='o'?'on':'')+'" data-act="mt" data-v="o">Заказы</button><button class="'+(MT==='f'?'on':'')+'" data-act="mt" data-v="f">Избранное</button><button class="'+(MT==='m'?'on':'')+'" data-act="mt" data-v="m">Моя анкета</button></div><div id="mv2" style="margin-top:14px"></div><div class="c" style="margin:26px 0"><button class="lnk" data-act="reset">Сбросить демо</button></div>',mev];

/* ---------- БЕЗОПАСНОСТЬ ---------- */
R.safety=()=>['<h1>Безопасность</h1><p>Только игры, только по правилам. 18+.</p>'
+'<div class="coin"><i></i><span style="left:6%">Ты</span><span style="left:44%">UEgirl</span><span style="right:6%">Напарница</span></div><p class="c" style="font-size:13px">Деньги лежат внутри UEgirl и уходят напарнице только после игры.</p>'
+'<div class="sec"><div class="sh"><h2>5 правил</h2></div>'+[['🎮','Только игра: дуо, обучение, чилл в войсе'],['🔞','Только 18+, анкеты проверяются'],['🙈','Контакты скрыты, общение в чате платформы'],['💳','Оплата только внутри, наличные и переводы мимо запрещены'],['🚩','Жалоба на любой анкете или заказе в один тап']].map(x=>'<div class="rule"><em>'+x[0]+'</em><div>'+x[1]+'</div></div>').join('')+'</div>'
+'<div class="sec"><div class="sh"><h2 class="no">Нельзя</h2></div>'+['Знакомства и интим-услуги','Передача соцсетей и телефонов','Оплата вне платформы','Фото с чужими лицами'].map(x=>'<div class="rule"><em class="no">✕</em><div>'+x+'</div></div>').join('')+'</div>'
+'<div class="sec"><div class="sh"><h2>Вопросы</h2></div><details><summary>Это настоящие анкеты?</summary><p>Нет. Все анкеты, фото, отзывы и цифры вымышлены, это демо-прототип.</p></details><details><summary>Что с оплатой?</summary><p>Платежей нет, баланс виртуальный. В рабочей версии будет платёжный провайдер.</p></details><details><summary>Это одобрено 89 squad и Братишкиным?</summary><p>Нет. Их имена упомянуты как идея партнёрства. Они не участвуют, проект не согласовывали.</p></details><details><summary>Что получает напарница?</summary><p>85% стоимости заказа. 15% берёт платформа.</p></details></div>'];

/* ---------- действия ---------- */
function act(a,v,el){switch(a){
case 'promo':promo=v;sv();toast('Промокод '+v+' применён: −10%');break;
case 'qg':$$('.chip[data-act="qg"]').forEach(c=>c.classList.toggle('on',c.dataset.v===v));qm(v);break;
case 'cg':F.g=v;F.n=12;go('#/catalog');break;
case 'fg':F.g=v;F.n=12;$$('#fg .chip').forEach(c=>c.classList.toggle('on',c.dataset.v===F.g));cat();break;
case 'fo':F.on=!F.on;el.classList.toggle('on',F.on);F.n=12;cat();break;
case 'fm':F.n+=12;cat();break;
case 'mm':M.n+=6;mres();break;
case 'tp':TP.per=v;topv();break;
case 'tg':TP.g=v;$$('#tgc .chip').forEach(c=>c.classList.toggle('on',c.dataset.v===v));topv();break;
case 'hw':$$('#hwt button').forEach(b=>b.classList.toggle('on',b===el));hw(v);break;
case 'ev':{const id=+v,i=evs.indexOf(id);if(i<0){evs.push(id);toast('Вы записаны (демо)')}else evs.splice(i,1);sv();const e=EV.find(x=>x.id===id),n=$('#ev'+id);if(n)n.outerHTML=evCard(e);break}
case 'pcheck':{const c=($('#pcin').value||'').trim().toUpperCase();if(PROMOS[c]){promo=c;sv();toast('Промокод применён: −'+PROMOS[c]+'%')}else toast('Такого кода нет');break}
case 'lb':{const d=document.createElement('div');d.className='lb';d.innerHTML=el.innerHTML;d.onclick=()=>d.remove();document.body.appendChild(d);break}
case 'rep':sheet('<h3>Пожаловаться</h3>'+['Контакты в анкете','Чужие фото','Неприличное поведение','Другое'].map(x=>'<button class="btn gh w" data-act="rep2">'+x+'</button>').join('')+'<button class="btn gh w" data-act="close">Закрыть</button>');break;
case 'rep2':unsheet();toast('Жалоба отправлена (демо)');break;
case 'close':unsheet();break;
case 'bg':BK.g=v;bv();break;
case 'bf':BK.f=+v;bv();break;
case 'bh':BK.h=+v+1;bv();break;
case 'bs':BK.s=+v;bv();break;
case 'pay':{const p=byId(BK.pid),c=bcalc(p);if(bal<c.tot){toast('Не хватает денег. Пополни в кабинете');break}
const id=ord.length?Math.max.apply(null,ord.map(o=>o.id))+1:101;
ord.push({id:id,pid:p.id,pn:p.n,hue:p.h,g:BK.g,f:BK.f,h:BK.h,slot:SL[BK.s],total:c.tot,st:'wait',t0:Date.now(),rate:0,chat:[{m:0,t:'Привет! Увидела бронь 🎧'}]});
bal-=c.tot;ub();sv();go('#/o/'+id);break}
case 'send':{const i=$('#ci'),t=i.value.trim(),o=gO(curO);if(!t||!o)break;if(BAD.test(t)){toast('Контакты передавать нельзя. Общение только здесь');break}
o.chat.push({m:1,t:t});i.value='';sv();chv();to(()=>bot(o,CAN[Math.floor(Math.random()*CAN.length)]),1100+Math.random()*900);break}
case 'start':{const o=gO(curO);o.st='play';o.ts=Date.now();sv();ovr(o.id);break}
case 'cancel':{const o=gO(curO);if(o.st==='wait'||o.st==='ok'){bal+=o.total;o.st='cancel';ub();sv();ovr(o.id);toast('Деньги вернулись на баланс')}break}
case 'star':{const o=gO(curO);o.rate=+v;sv();ovr(o.id);break}
case 'release':{const o=gO(curO);if(!o.rate){toast('Сначала поставь оценку');break}o.st='paid';sv();ovr(o.id);confetti();toast('Оплата отпущена');break}
case 'wn':{const e=rdw();if(e){W.err=e;wz();break}W.err='';
if(W.s<3){W.s++;wz()}else{my=mkMy();W={s:0,n:'',a:'',ph:[],gs:{},v:true,bio:'',err:''};sv();confetti();toast('Анкета опубликована');go('#/p/1000')}break}
case 'wb':rdw();W.err='';W.s=Math.max(0,W.s-1);wz();break;
case 'mt':MT=v;$$('#mtt button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));mev();break;
case 'topup':bal+=1000;ub();sv();{const e=$('#mb');if(e)e.textContent=money(bal)}toast('+1 000 ₽ на баланс');break;
case 'mytest':my.x=(my.x||0)+1;sv();mev();toast('Тестовый заказ: ты выше в топе');break;
case 'mydel':my=null;sv();toast('Анкета удалена');render();break;
case 'reset':if(confirm('Сбросить демо?')){Object.keys(localStorage).filter(k=>k.indexOf('sq_')===0).forEach(k=>localStorage.removeItem(k));location.hash='#/';location.reload()}break;
}}

/* ---------- события ---------- */
document.addEventListener('click',e=>{const t=e.target;
const a=t.closest('a[href^="#/"]');if(a){e.preventDefault();go(a.getAttribute('href'));return}
const f=t.closest('[data-fv]');if(f){e.preventDefault();e.stopPropagation();const id=+f.dataset.fv,i=fav.indexOf(id);if(i<0){fav.push(id);toast('♥ В избранном')}else{fav.splice(i,1);toast('Убрано из избранного')}sv();$$('[data-fv="'+id+'"]').forEach(x=>x.classList.toggle('on',i<0));return}
const b=t.closest('[data-bk]');if(b){const x=b.dataset.bk.split('|'),p=byId(x[0]);if(p){BK={pid:p.id,g:x[1]&&has(p,x[1])?x[1]:p.g[0][0],f:0,h:1,s:0,code:promo};go('#/book/'+p.id)}return}
const g=t.closest('[data-go]');if(g){go(g.dataset.go);return}
const x=t.closest('[data-act]');if(x){act(x.dataset.act,x.dataset.v,x);return}
if(t.closest('#bal')){go('#/me');return}
if(t.closest('#live')){const i=$('#live').dataset.id;if(i)go('#/p/'+i);return}
if(t.id==='sheet')unsheet();
});
document.addEventListener('change',e=>{const t=e.target;
if(t.id==='bpc'&&BK){BK.code=t.value.trim();if(PROMOS[BK.code.toUpperCase()]){promo=BK.code.toUpperCase();sv();toast('Промокод применён')}else if(BK.code)toast('Такого кода нет');bv()}
if(t.dataset&&t.dataset.ph!==undefined&&t.files&&t.files[0]){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,480/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);W.ph[+t.dataset.ph]=c.toDataURL('image/jpeg',.8);wz()};im.src=r.result};r.readAsDataURL(t.files[0])}});
addEventListener('hashchange',()=>{if((location.hash||'#/')!==shown)render()});
let tk=0;
addEventListener('scroll',()=>{if(tk)return;tk=1;requestAnimationFrame(()=>{tk=0;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;$('#prog').style.width=(h>0?y/h*100:0)+'%';document.documentElement.style.setProperty('--sy',y)})},{passive:true});
addEventListener('pointermove',e=>{const h=$('.hero');if(!h)return;const r=h.getBoundingClientRect();h.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');h.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')},{passive:true});

/* ---------- плашка активности ---------- */
const LA=['взяли на 2 ч','получила 5★','принимает заказы','только что в сети'];
function live(){if(busy||!$('#spl').classList.contains('hide'))return;
const l=all().filter(p=>p.on);if(!l.length)return;
const p=l[Math.floor(Math.random()*l.length)],b=$('#live');
b.dataset.id=p.id;b.innerHTML=av(p)+'<div><b>'+esc(p.n)+'</b> '+LA[Math.floor(Math.random()*LA.length)]+'<br><span class="mu">'+p.g[0][0]+' · только что</span></div>';
b.classList.add('on');setTimeout(()=>b.classList.remove('on'),3800)}

/* ---------- старт ---------- */
function init(){
document.title=NAME;
$('#logo').innerHTML=esc(NAME).replace(/(girl|\+\d+)$/i,'<i>$1</i>');
const m=NAME.match(/(girl|\+\d+)$/i),cut=m?m.index:NAME.length;
$('#splLogo').innerHTML=Array.from(NAME).map((c,i)=>'<span class="'+(i>=cut?'p':'')+'" style="--i:'+i+'">'+esc(c)+'</span>').join('');
$('#tb').innerHTML=[['#/','🏠','Главная'],['#/match','🎯','Подбор'],['#/catalog','🔍','Каталог'],['#/top','🏆','Топ'],['#/become','✨','Стать'],['#/me','👤','Кабинет']].map(t=>'<a href="'+t[0]+'"><span>'+t[1]+'</span>'+t[2]+'</a>').join('');
ub();render();
let pc=0;const si=setInterval(()=>{pc=Math.min(100,pc+3+Math.random()*6);$('#splBar').style.width=pc+'%';$('#splPc').textContent=Math.floor(pc)+'%';
if(pc>=100){clearInterval(si);setTimeout(()=>{$('#spl').classList.add('out');setTimeout(()=>$('#spl').classList.add('hide'),1300)},350)}},120);
setTimeout(()=>$('#spl').classList.add('hide'),8000);
setTimeout(live,5500);setInterval(live,8000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
function av(p,k){
k=k||0;
const h=(p.h+k*40)%360;
if(p.ph&&p.ph[k])return '<div class="av" style="--h:'+h+'"><img src="'+p.ph[k]+'" alt=""></div>';
const u='https://api.dicebear.com/9.x/lorelei/svg?seed='+encodeURIComponent(p.n+(k?'-'+k:''));
return '<div class="av" style="--h:'+h+'"><img src="'+u+'" alt="" loading="lazy" onerror="this.style.display=\'none\'"></div>';
}
